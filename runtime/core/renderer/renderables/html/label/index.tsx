import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';

import { TRenderableProps } from '../../common.types';
import { HTMLEditorLableRendarable } from './editor';
import { HTMLRuntimeLableRendarable } from './runtime';

type THTMLLabelRendarableProps = TRenderableProps & {
  isEditor: boolean;
};

export const HTMLLabelRendarable = observer(forwardRef<HTMLLabelElement, THTMLLabelRendarableProps>(({
  entity,
  isEditor
}, ref) => {

  return (isEditor 
    ? <HTMLEditorLableRendarable
        ref={ref}
        entity={entity} />
    : <HTMLRuntimeLableRendarable
        ref={ref}
        entity={entity} />
  );
}))

HTMLLabelRendarable.displayName = 'HTMLLabelRendarable';
