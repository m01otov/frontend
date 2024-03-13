import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';

import { TRenderableProps } from '../../common.types';
import { SVGEditorRectRendarable } from './editor';
import { SVGRuntimeRectRendarable } from './runtime';

type TSVGRectRendarableProps = TRenderableProps & {
  isEditor: boolean;
};

export const SVGRectRendarable = observer(forwardRef<SVGSVGElement, TSVGRectRendarableProps>(({
  entity,
  isEditor
}, ref) => {

  return (isEditor 
    ? <SVGEditorRectRendarable
        ref={ref}
        entity={entity} />
    : <SVGRuntimeRectRendarable
        ref={ref}
        entity={entity} />
  );
}))

SVGRectRendarable.displayName = 'SVGRectRendarable';
