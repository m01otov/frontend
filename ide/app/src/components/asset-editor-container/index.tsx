import { type PropsWithChildren, forwardRef } from 'react';
import cn from 'classnames';

import { Logo } from '../logo';

import styles from './styles.module.scss';

type TAssetEditorContainerProps = PropsWithChildren<unknown>;

export const AssetEditorContainer = forwardRef<HTMLDivElement, TAssetEditorContainerProps>(({
  children
}, ref) => (
  <div
    ref={ref}
    className={cn(
      styles.asset_editor_container,
      {
        [styles['asset_editor_container--empty']]: !children
      }
    )}>
    {children || <Logo size={240} />}
  </div>
))

AssetEditorContainer.displayName = 'AssetEditorContainer';
