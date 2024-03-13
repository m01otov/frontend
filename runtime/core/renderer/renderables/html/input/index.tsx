import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';

import { TRenderableProps } from '../../common.types';
import { HTMLEditorInputRendarable } from './editor';
import { HTMLRuntimeInputRendarable } from './runtime';

type THTMLInputRendarableProps = TRenderableProps & {
  isEditor: boolean;
};

export const HTMLInputRendarable = observer(forwardRef<HTMLInputElement, THTMLInputRendarableProps>(({
  entity,
  isEditor
}, ref) => {

  return (isEditor 
    ? <HTMLEditorInputRendarable
        ref={ref}
        entity={entity} />
    : <HTMLRuntimeInputRendarable
        ref={ref}
        entity={entity} />
  );
}))

HTMLInputRendarable.displayName = 'HTMLInputRendarable';
