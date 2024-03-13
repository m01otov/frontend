import { type FC, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';


import styles from './styles.module.scss';

type TSizeIndicatorProps = PropsWithChildren<{
  target: React.RefObject<HTMLElement>;
  shouldRender?: boolean;
  width: number;
  height: number;
}>

export const SizeIndicator: FC<TSizeIndicatorProps> = ({
  target,
  shouldRender,
  width,
  height
}) => shouldRender && createPortal(
  <div
    className={styles.size_indicator}>
    {width}<span>&times;</span>{height}
  </div>
  , target.current || document.body
)

SizeIndicator.displayName = 'SizeIndicator';
