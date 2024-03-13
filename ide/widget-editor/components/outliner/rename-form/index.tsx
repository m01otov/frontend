import { forwardRef, useRef, type FocusEvent, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import cn from 'classnames';

import { TEditorDataComponentProps } from '@lukoil/scad-runtime-core';
import { useKeyInteraction, Error } from '@lukoil/scad-ide-ui-core';

import styles from './styles.module.scss';

type TOutlinerRenameFormProps = {
  name?: string;
  onSubmit: (value: string) => void;
  onCancel?: () => void;
}

interface IOutlinerRenameForm extends Pick<TEditorDataComponentProps, 'name'> {}

export const OutlinerRenameForm = forwardRef<HTMLDivElement, TOutlinerRenameFormProps>(({
  name = '',
  onSubmit,
  onCancel
}, ref) => {
  const { control, handleSubmit: handleHookFormSubmit, formState } = useForm<IOutlinerRenameForm>({
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
    Enter: handleHookFormSubmit((data: IOutlinerRenameForm) => {
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
      className={styles.outliner_rename_form}>
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
                styles.outliner_rename_form__input,
                {
                  [styles['outliner_rename_form__input--error']]: fieldState.error
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

OutlinerRenameForm.displayName = 'OutlinerRenameForm';
