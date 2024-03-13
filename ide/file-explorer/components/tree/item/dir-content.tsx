import { PropsWithChildren, type FC, type ReactNode } from 'react';

import styles from './styles.module.scss';

type TFileExplorerItemDirContentProps = PropsWithChildren<{
  icon: ReactNode;
}>

export const FileExplorerItemDirContent: FC<TFileExplorerItemDirContentProps> = ({
  icon,
  children
}) => {
  return (
    <div
      className={styles.file_explorer__item_content}>
      <div
        className={styles.file_explorer__item_content_icon}>
        {icon}
      </div>
      {children}
    </div>
  )
}

FileExplorerItemDirContent.displayName = 'FileExplorerItemDirContent';