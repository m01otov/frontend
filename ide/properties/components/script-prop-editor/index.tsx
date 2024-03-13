import { FC, Fragment, forwardRef, useLayoutEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useDrop } from 'react-dnd';
import cn from 'classnames';

import { EFileExtension } from '@lukoil/scad-file-explorer/enums';
import { EJsVariableTypes, IScriptComponent, TUUID, inject } from '@lukoil/scad-runtime-core';
import { HTTP_SERVICE_TOKEN, IHttpService } from '@lukoil/scad-runtime-request';
import { INotificationsContext, NOTIFICATION_CONTEXT_TOKEN } from '@lukoil/scad-ide-notifications';
import { Icon } from '@lukoil/scad-ide-ui-core';

import { PropEditorContainer, PropEditorRow } from '../prop-editor-container';
import { ColorEditor } from './components/color';
import { IntegerNumberEditor } from './components/integer';
import { FloatNumberEditor }  from './components/float'
import { StringEditor } from './components/string'
import { UIntegerEditor } from './components/uint'

import styles from './styles.module.scss';

const controls: Record<string, FC<any>> = {
  [EJsVariableTypes.COLOR]: ColorEditor,

  [EJsVariableTypes.INT]: IntegerNumberEditor,

  [EJsVariableTypes.FLOAT]: FloatNumberEditor,

  // [EJsVariableTypes.ARRAY]: ({ value }) => {
  //   return (
  //     <Input
  //       defaultValue={value} />
  //   )
  // },

  [EJsVariableTypes.STRING]: StringEditor,
  
  [EJsVariableTypes.UINT]: UIntegerEditor,
}

export const ScriptPropEditor = observer(forwardRef<HTMLDivElement, IScriptComponent>(({
  id,
  properties,
  name,
}, ref) => {
  const loadFileContent = useMemo(() => {
    const instance = inject(
      async (http: IHttpService, notifications: INotificationsContext, fileId: TUUID) => {
        try {
          const { data } = await http.get<any>(`/file-explorer/${fileId}/content`);

          properties.set(data);
        } catch (error) {
          notifications.error('Ошибка');
        }
      }, [
        HTTP_SERVICE_TOKEN,
        NOTIFICATION_CONTEXT_TOKEN,
      ])

    return instance
  }, [properties.set])

  useLayoutEffect(() => {
    if (!id.value) return;

    loadFileContent(id.value)
  }, [id.value, loadFileContent])

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: EFileExtension.JS,
    drop(item: any) {
      id?.set(item.id);
      name.set(item.name)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }), [id?.set, name.set])

  return (
    <PropEditorContainer
      ref={ref}
      title="Скрипт">
      <PropEditorRow>
        <div
          ref={drop}
          className={cn(
            styles.property,
            {
              [styles['property--outline']]: canDrop,
              [styles['property--over']]: isOver,
            }
          )}>
          <div className={styles.property_icon}>
            <Icon.JsFile size={16}/>
          </div>
          {canDrop ? 'Переместите файл' : (name.value || 'Название файла')}
        </div>
      </PropEditorRow>

      {properties.value.length ? (
        <div className={styles.property_grid}>
          {properties.value.map(({ type, variable, discription, defaultValue }) => {
            const Control = controls[type[0]]

            return (
              Control ? (
                <Fragment key={variable}>
                  <div>
                    <div className={styles.property_grid__title}>{variable}</div>
                    {discription ? <div className={styles.property_grid__discription}>{discription}</div> : null }
                  </div>
                  <Control defaultValue={defaultValue} />
                </Fragment>
              ) : null
            )
          })}
        </div>
      ) : null}
    </PropEditorContainer>
  )
}))

ScriptPropEditor.displayName = 'ScriptPropEditor';
