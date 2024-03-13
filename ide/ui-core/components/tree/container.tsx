import { forwardRef, type PropsWithChildren, type HTMLAttributes } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { useTreeContext } from './provider';
import { useForwardedRef } from '../..';

import styles from './styles.module.scss';

type TTreeContainerProps = PropsWithChildren<unknown> & Pick<HTMLAttributes<HTMLDivElement>, 'className'>;;

export const TreeContainer = observer(forwardRef<HTMLDivElement, TTreeContainerProps>(({
  className,
  children,
}, ref) => {
  const { options, /*setActive*/ } = useTreeContext();
  const forwardedRef = useForwardedRef(ref);

  // TODO: refactor without setTimeout
  // useClickAway(forwardedRef, () => {
  //   setTimeout(() => {
  //     setActive(null)
  //   }, 100)
  // })

  return (
    <div 
      ref={forwardedRef}
      className={cn(
        className,
        styles.tree_container,
        {
          [styles['tree_container--with-indent-lines']]: options.withIndentLines
        }
      )}>
      {children}
    </div>
  );
}))

TreeContainer.displayName = 'TreeContainer';
