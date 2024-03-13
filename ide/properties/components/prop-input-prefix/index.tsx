import { type FC, type PropsWithChildren } from 'react';

import styles from './styles.module.scss';

export const PropInputPrefix: FC<PropsWithChildren> = ({
  children
}) => (
  <div className={styles.property_input_prefix}>
    {children}
  </div>
)

PropInputPrefix.displayName = 'PropInputPrefix';
