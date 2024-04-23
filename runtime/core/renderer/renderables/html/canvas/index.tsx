import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';

import { TRenderableProps } from '../../common.types';
import { HTMLEditoCanvasRendarable } from './editor';
import { HTMLRuntimeCanvasRendarable } from './runtime';

type THTMLInputRendarableProps = TRenderableProps & {
  isEditor: boolean;
};

export const HTMLCanvasRendarable = observer(forwardRef<HTMLDivElement, THTMLInputRendarableProps>(({
  entity,
  isEditor
}, ref) => {

  return (isEditor 
    ? <HTMLEditoCanvasRendarable
        ref={ref}
        entity={entity} />
    : <HTMLRuntimeCanvasRendarable
        ref={ref}
        entity={entity} />
  );
}))

HTMLCanvasRendarable.displayName = 'HTMLCanvasRendarable';