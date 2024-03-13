import { type FC, useLayoutEffect, useState, useCallback, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import { Button, Icon, Input, Popup, useKeyInteraction } from '@lukoil/scad-ide-ui-core';
import { ProjectCard } from '@root/components/project-card';
import { useIDEContext } from '@root/context';

import styles from './styles.module.scss';
import { IProjectDto } from '@root/interfaces';

export const ProjectsScreen: FC<unknown> = observer(() => {
  const { projects } = useIDEContext()
  const inputRef = useRef<HTMLInputElement>();

  const { control, handleSubmit: handleHookFormSubmit } = useForm<Partial<IProjectDto>>({
    // @ts-expect-error: will be fixed in future
    resolver: yupResolver(object({
      name: string().required()
    })),
    defaultValues: {
      name: '',
      description: '',
    },
    reValidateMode: 'onChange'
  });

  const [isShowCreateForm, setIsShowCreateForm] = useState(false)

  const handleOpenCreateForm = useCallback(() => {
    setIsShowCreateForm(true)
  }, [])

  const handleCloseCreateForm = useCallback(() => {
    setIsShowCreateForm(false)
  }, [])

  const handleSubmit = handleHookFormSubmit((data: any) => {
    projects.create(data)
    handleCloseCreateForm()
  })

  const handleKeyPressed = useKeyInteraction({
    Enter: handleHookFormSubmit((data: any) => {
      projects.create(data)
      handleCloseCreateForm()
    }),
    Escape: () => handleCloseCreateForm()
  }, [handleCloseCreateForm]);

  useLayoutEffect(() => {
    projects.load()
  }, [projects])

  if (projects.isLoading) {
    return 'Загрузка...'
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header__title}>Проекты</div>
        <div className={styles.header__toolbar}>
          <Button onClick={handleOpenCreateForm}>
            <Icon.Files size={12} /> Новый проект
          </Button>
        </div>
      </div>
      <div className={styles.controls}>
        <div></div>
      </div>
      <div className={styles.content}>
        {/*@ts-expect-error: will be fixed in future*/}
        {projects.asArray.map(([id, item]) => (
          <ProjectCard
            key={item.id}
            id={item.id}
            discription={item.description}
            title={item.name}
          />  
        ))}
      </div>

      <Popup
        show={isShowCreateForm}
        onClose={handleCloseCreateForm}>
        {{
          header: 'Новый проект',
          content: (
            <form
              className={styles.create_form}
              onKeyDown={handleKeyPressed}>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => 
                  <>
                    <Input
                      ref={(element: HTMLInputElement) => {
                        field.ref(element);
                        inputRef.current = element;
                      }}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {fieldState.error && (
                      <span>{fieldState.error?.message}</span>
                    )}
                  </>
                }
              />
            </form>
          ),
          footer: (
            <div className={styles.create_form__buttons}>
              <Button weight="secondary" onClick={handleCloseCreateForm}>Отмена</Button>
              <Button onClick={handleSubmit}>Создать</Button>
            </div>
          )
        }}
      </Popup>
    </div>
  )
});

ProjectsScreen.displayName = 'ProjectsScreen';
