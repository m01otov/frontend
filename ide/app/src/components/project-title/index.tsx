import { type FC, type PropsWithChildren } from 'react';

import styles from './styles.module.scss';

type TProjectTitleProps = PropsWithChildren<unknown>

export const ProjectTitle: FC<TProjectTitleProps> = ({
  children
}) => {
  return (
    <div className={styles.project_title}>
      {children}
    </div>
  )
}

ProjectTitle.displayName = 'ProjectTitle';
