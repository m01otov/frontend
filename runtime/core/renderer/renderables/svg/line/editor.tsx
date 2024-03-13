import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';

import type { TRenderableProps } from '../../common.types';
import { useForwardedRef } from '../../../../hooks/forwarded-ref.hook';
import { type IEditorDataComponent, EDITOR_DATA_COMPONENT } from '../../../../entities/components';
import { getComponentFrom } from '../../../../entities/component';
import { SVGLineRender } from './render';

export const SVGEditorLineRendarable = observer(forwardRef<SVGSVGElement, TRenderableProps>(({
  entity,
}, ref) => {

  const forwardedRef = useForwardedRef(ref);
  const editorData = getComponentFrom<IEditorDataComponent>(entity, EDITOR_DATA_COMPONENT);

  return (editorData?.isVisible &&
    <SVGLineRender
      ref={forwardedRef}
      entity={entity}
      isLocked={editorData?.isLocked} />
  );

}))

SVGEditorLineRendarable.displayName = 'SVGEditorLineRendarable';
