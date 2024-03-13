import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';

import { TRenderableProps } from '../../common.types';
import { HTMLEditoContainerRendarable } from './editor';
import { HTMLRuntimeContainerRendarable } from './runtime';

type THTMLInputRendarableProps = TRenderableProps & {
  isEditor: boolean;
};

export const HTMLContainerRendarable = observer(forwardRef<HTMLDivElement, THTMLInputRendarableProps>(({
  entity,
  isEditor
}, ref) => {

  return (isEditor 
    ? <HTMLEditoContainerRendarable
        ref={ref}
        entity={entity} />
    : <HTMLRuntimeContainerRendarable
        ref={ref}
        entity={entity} />
  );
}))

HTMLContainerRendarable.displayName = 'HTMLContainerRendarable';
