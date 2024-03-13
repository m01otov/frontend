import { PropsWithChildren, type FC, type ReactNode } from 'react';
import cn from 'classnames';

import { EFileExtension } from '../../../enums';

import styles from './styles.module.scss';

type TFileExplorerItemFileContentProps = PropsWithChildren<{
  extension: EFileExtension;
  icon: ReactNode;
}>

export const FileExplorerItemFileContent: FC<TFileExplorerItemFileContentProps> = ({
  icon,
  extension,
  children
}) => (
  <div
    className={styles.file_explorer__item_content}>
    <div 
      className={cn(
        styles.file_explorer__item_content_icon,
        styles[`file_explorer__item_content_icon--${extension}`]
      )}>
      {icon}
    </div>
    {children}
  </div>
)

FileExplorerItemFileContent.displayName = 'FileExplorerItemFileContent';
