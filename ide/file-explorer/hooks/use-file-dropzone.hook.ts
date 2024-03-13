import { useDrop, type DropTargetMonitor, type ConnectDropTarget } from 'react-dnd';

import { EFileExplorerItemType, EFileExtension } from '../enums';
import type { IFile, IDirectory } from '../interfaces';

type TCollectedResult = {
  isOver: boolean;
  isOverTarget: boolean;
  canDrop: boolean;
}

type TuseFileDropzone<T> = Partial<{
  dropCallback?: (data: T) => void,
  canDrop?: (item: T, monitor: DropTargetMonitor<T, TCollectedResult>) => boolean
}>

export const useFileDropzone = (arg: TuseFileDropzone<IFile | IDirectory>) => {
  const { dropCallback, canDrop } = arg

  const [collect, drop] = useDrop<IFile | IDirectory, unknown, TCollectedResult>(() => ({
    accept: [
      EFileExplorerItemType.DIR,
      EFileExtension.JS,
      EFileExtension.WGT,
      EFileExtension.CSS,
      EFileExtension.UNKNOWN,
    ],
    canDrop,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop()

      if (didDrop) return;

      dropCallback && dropCallback(item)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverTarget: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
      asd: (() => {
        if (!monitor.canDrop()) return;
      })()
    })
  }), [canDrop, dropCallback])

  return [collect, drop] as [TCollectedResult, ConnectDropTarget]
}
