import { FC, PropsWithChildren, useMemo } from 'react';
import { useDragLayer } from 'react-dnd';

import styles from './styles.module.scss';

export const DraggablePreview: FC<PropsWithChildren> = ({ children }) => {
  const { currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const style = useMemo(() => {
    if (!currentOffset) {
      return {
        display: "none",
      };
    }
  
    let { x, y } = currentOffset;
  
    const transform = `translate(${x}px, ${y}px)`;
    return {
      transform,
      WebkitTransform: transform,
    };
  }, [currentOffset])

  return (
    <div className={styles.draggable_preview} style={style}>
        {children}
      </div>
  );
}

DraggablePreview.displayName = 'DraggablePreview';
