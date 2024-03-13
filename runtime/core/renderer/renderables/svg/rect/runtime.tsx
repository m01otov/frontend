import { observer } from 'mobx-react-lite';
import { forwardRef, useEffect } from 'react';
import { useAsync, useUpdateEffect } from 'react-use';
import { useInjection } from 'inversify-react';

import { HTTP_SERVICE_TOKEN, type IHttpService } from '@lukoil/scad-runtime-request';
import type { TRenderableProps } from '../../common.types';
import { stringToJsModule } from '../../../../utils';
import { useForwardedRef } from '../../../../hooks/forwarded-ref.hook';
import { type IScriptComponent, SCRIPT_COMPONENT } from '../../../../entities/components';
import { getComponentFrom } from '../../../../entities/component';
import { SVGRectRender } from './render';

export const SVGRuntimeRectRendarable = observer(forwardRef<SVGSVGElement, TRenderableProps>(({
  entity,
}, ref) => {
  const httpService = useInjection<IHttpService>(HTTP_SERVICE_TOKEN);
  
  const forwardedRef = useForwardedRef(ref);
  const script = getComponentFrom<IScriptComponent>(entity, SCRIPT_COMPONENT);
  
  const { loading, value } = useAsync(async () => {
    const response: any = await httpService.get(`/file-explorer/${script!.id.value}/content`);
    const module = await stringToJsModule(response.data);

    return module.createWidget(forwardedRef.current)
  }, [])
  
  useEffect(() => {
    if (loading) return;

    value?.init()

    return () => value?.dispose()
  }, [loading, value])

  useUpdateEffect(() => {
    if (loading) return;

    value?.update()
  })

  return (
    <SVGRectRender
      ref={forwardedRef}
      entity={entity} />
  );

}))

SVGRuntimeRectRendarable.displayName = 'SVGRuntimeRectRendarable';
