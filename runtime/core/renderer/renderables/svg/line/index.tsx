import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';

import { TRenderableProps } from '../../common.types';
import { SVGEditorLineRendarable } from './editor';
import { SVGRuntimeLineRendarable } from './runtime';

type TSVGLineRendarableProps = TRenderableProps & {
  isEditor: boolean;
};

export const SVGLineRendarable = observer(forwardRef<SVGSVGElement, TSVGLineRendarableProps>(({
  entity,
  isEditor
}, ref) => {

  return (isEditor 
    ? <SVGEditorLineRendarable
        ref={ref}
        entity={entity} />
    : <SVGRuntimeLineRendarable
        ref={ref}
        entity={entity} />
  );
}))

SVGLineRendarable.displayName = 'SVGLineRendarable';
