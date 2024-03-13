import { type CSSProperties, type PropsWithChildren, type FC, useRef, useLayoutEffect, useState } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import { Icon } from '../icon';

type TContextSubmenuProps = {
  title: string
}

export const ContextSubmenu: FC<PropsWithChildren<TContextSubmenuProps>> = ({
  title,
  children,
}) => {
  const [isVisibleGroup, setIsVisibleGroup] = useState(false);
  const [side, setSide] = useState<'right' | 'left'>('right');
  const [offsetTop, setOffsetTop] = useState(0);
  const groupRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const { current: groupContainer } = groupRef;

    if (!groupContainer || !isVisibleGroup) return;

    const { y, x, width } = groupContainer.getBoundingClientRect();
    const isOutside  = x + width > window.innerWidth;

    if (y + groupContainer.offsetHeight > window.innerHeight) {
      setOffsetTop(window.innerHeight - (y + groupContainer.offsetHeight));
    }

    setSide(isOutside ? 'left' : 'right');

    return () => {
      setOffsetTop(0);
      setSide('right');
    }
  }, [isVisibleGroup]);

  const handleMouseOver = () => setIsVisibleGroup(true);
  const handleMouseOut = () => setIsVisibleGroup(false);
  const handleClick = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={styles.context_menu__submenu}>
      <div
        className={styles.context_menu__item}
        onClick={handleClick}>
        {title}
        <Icon.ArrowFill
          size={8}
          rotate={-90} />
      </div>
      {isVisibleGroup ? (
        <div
          ref={groupRef}
          style={{
            '--position-y': `${offsetTop}px`
          } as CSSProperties}
          className={cn(
            styles.context_menu__submenu_items,
            styles[`context_menu__submenu_items-${side}`]
          )}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

ContextSubmenu.displayName = 'ContextMenuItem';
