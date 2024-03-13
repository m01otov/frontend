import { forwardRef, useCallback, type FocusEvent, useRef  } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import cn from 'classnames';

import { useKeyInteraction, Error } from '@lukoil/scad-ide-ui-core';
import type { IFileExplorerItemDto } from '../../interfaces';

import styles from './styles.module.scss';

type TRenameFormProps = {
  name?: string;
  onSubmit: (value: string) => void;
  onCancel?: () => void;
}

interface IRenameForm extends Pick<IFileExplorerItemDto, 'name'> {}

export const RenameForm = forwardRef<HTMLDivElement, TRenameFormProps>(({
  name = '',
  onSubmit,
  onCancel
}, ref) => {
  const { control, handleSubmit: handleHookFormSubmit, formState } = useForm<IRenameForm>({
    resolver: yupResolver(object({
      name: string().required()
    })),
    values: {
      name,
    },
    reValidateMode: 'onChange'
  });
  
  const inputRef = useRef<HTMLInputElement>();

  const handleKeyPressed = useKeyInteraction({
    Enter: handleHookFormSubmit((data: IRenameForm) => {
      onSubmit(data.name)
    }),
    Escape: () => onCancel && onCancel()
  }, [onSubmit, onCancel]);
  
  const handleBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
    if (formState.isSubmitted) return;
    
    onSubmit(event.target.value)
  }, [onSubmit, formState.isSubmitted]);

  return (
    <div
      ref={ref}
      className={styles.rename_form}>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input
              ref={(element: HTMLInputElement) => {
                field.ref(element);
                inputRef.current = element;
              }}
              className={cn(
                styles.rename_form__input,
                {
                  [styles['rename_form__input--error']]: fieldState.error
                }
              )}
              value={field.value}
              autoFocus
              onChange={field.onChange} 
              onKeyDown={handleKeyPressed}
              onBlur={handleBlur} />

            <Error
              parentRef={inputRef}
              show={!!fieldState.error}>
              {fieldState.error?.message}
            </Error>
          </>
        )} 
      />
    </div>
  )
})

RenameForm.displayName = 'RenameForm';
