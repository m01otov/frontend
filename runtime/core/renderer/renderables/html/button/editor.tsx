import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';

import type { TRenderableProps } from '../../common.types';
import { useForwardedRef } from '../../../../hooks/forwarded-ref.hook';
import { type IEditorDataComponent, EDITOR_DATA_COMPONENT } from '../../../../entities/components';
import { getComponentFrom } from '../../../../entities/component';
import { HTMLButtonRender } from './render';

export const HTMLEditorButtonRendarable = observer(forwardRef<HTMLButtonElement, TRenderableProps>(({
  entity,
}, ref) => {

  const forwardedRef = useForwardedRef(ref);
  const editorData = getComponentFrom<IEditorDataComponent>(entity, EDITOR_DATA_COMPONENT);

  return (editorData?.isVisible &&
    <HTMLButtonRender
      ref={forwardedRef}
      entity={entity}
      isLocked={editorData?.isLocked} />
  );

}))

HTMLEditorButtonRendarable.displayName = 'HTMLEditorButtonRendarable';
