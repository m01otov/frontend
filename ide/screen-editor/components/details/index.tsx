import { forwardRef, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { Icon } from '@lukoil/scad-ide-ui-core';
import { PROPERTY_EDITORS } from '@lukoil/scad-ide-properties';
import { useScreenEditorContext } from '../../provider';

import styles from './styles.module.scss';

type TScreenEditorDetailsProps = {}

export const ScreenEditorDetails = observer(forwardRef<HTMLDivElement, TScreenEditorDetailsProps>((_, ref) => {
  const { selectedEntities } = useScreenEditorContext();
  
  const renderPropEditors = useMemo(() => {
    if (selectedEntities.length !== 1) return null;

    const firstEntityComponents = selectedEntities[0][1];

    return Object.getOwnPropertySymbols(firstEntityComponents).map(key => {
      // @ts-ignore
      const Component = PROPERTY_EDITORS[key];

      const value = firstEntityComponents[key];

      return Component && <Component key={key.description!} {...value} />
    })

  }, [selectedEntities]);

  return (
    <div
      ref={ref}
      className={styles.screen_editor_details}>
      <div className={styles.screen_editor_details_navigation}>
        <button
          className={cn(
            styles.screen_editor_details_navigation__item,
            {
              [styles['screen_editor_details_navigation__item--active']]: true
            }
          )}>
          <Icon.Properties size={16} />
        </button>
      </div>

      <div className={styles.screen_editor_details_content}>
        {renderPropEditors}
      </div>
    </div>
  )
}));

ScreenEditorDetails.displayName = 'ScreenEditorDetails';
