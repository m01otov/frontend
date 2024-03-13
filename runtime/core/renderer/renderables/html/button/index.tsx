import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';

import { TRenderableProps } from '../../common.types';
import { HTMLEditorButtonRendarable } from './editor';
import { HTMLRuntimeButtonRendarable } from './runtime';

type THTMLButtonRendarableProps = TRenderableProps & {
  isEditor: boolean;
};

export const HTMLButtonRendarable = observer(forwardRef<HTMLButtonElement, THTMLButtonRendarableProps>(({
  entity,
  isEditor
}, ref) => {

  return (isEditor 
    ? <HTMLEditorButtonRendarable
        ref={ref}
        entity={entity} />
    : <HTMLRuntimeButtonRendarable
        ref={ref}
        entity={entity} />
  );
}))

HTMLButtonRendarable.displayName = 'HTMLButtonRendarable';
