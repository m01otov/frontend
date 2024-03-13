import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';

import { TRenderableProps } from '../../common.types';
import { SVGEditorEllipseRendarable } from './editor';
import { SVGRuntimeEllipseRendarable } from './runtime';

type TSVGEllipseRendarableProps = TRenderableProps & {
  isEditor: boolean;
};

export const SVGEllipseRendarable = observer(forwardRef<SVGSVGElement, TSVGEllipseRendarableProps>(({
  entity,
  isEditor
}, ref) => {

  return (isEditor 
    ? <SVGEditorEllipseRendarable
        ref={ref}
        entity={entity} />
    : <SVGRuntimeEllipseRendarable
        ref={ref}
        entity={entity} />
  );
}))

SVGEllipseRendarable.displayName = 'SVGEllipseRendarable';
