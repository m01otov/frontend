import { forwardRef, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { PROPERTY_EDITORS } from '@lukoil/scad-ide-properties';
import { Icon } from '@lukoil/scad-ide-ui-core';
import { useWidgetEditorContext } from '../../provider';

import styles from './styles.module.scss';

type TWidgetEditorDetailsProps = {}

export const WidgetEditorDetails = observer(forwardRef<HTMLDivElement, TWidgetEditorDetailsProps>((_, ref) => {
  const [activeTab, setActiveTab] = useState(0);
  const { selectedEntities } = useWidgetEditorContext();

  const renderPropEditors = useMemo(() => {
    if (selectedEntities.length !== 1) return null;

    const firstEntityComponents = selectedEntities[0][1];

    return Object.getOwnPropertySymbols(firstEntityComponents).map(key => {
      // @ts-ignore
      const Component = PROPERTY_EDITORS[key];

      const value = firstEntityComponents[key];

      return Component && <Component key={key.description!} {...value} />
    })

  }, [selectedEntities, activeTab]);

  return (
    <div
      ref={ref}
      className={styles.widget_editor_details}>
      <div className={styles.widget_editor_details_navigation}>
        <button
          onClick={() => setActiveTab(0)}
          className={cn(
            styles.widget_editor_details_navigation__item,
            {
              [styles['widget_editor_details_navigation__item--active']]: activeTab === 0
            }
          )}>
          <Icon.Brush size={16} />
        </button>
        <button
          onClick={() => setActiveTab(10)}
          className={cn(
            styles.widget_editor_details_navigation__item,
            {
              [styles['widget_editor_details_navigation__item--active']]: activeTab === 10
            }
          )}>
          <Icon.Properties size={16} />
        </button>
      </div>

      <div className={styles.widget_editor_details_content}>
        {activeTab === 0 && renderPropEditors}

        {activeTab === 10 && null}
      </div>
    </div>
  );

}))

WidgetEditorDetails.displayName = 'WidgetEditorDetails';
