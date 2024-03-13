import { stringToJsModule } from '@lukoil/scad-runtime-core';
import { Children, FC, PropsWithChildren, cloneElement, useEffect, useRef } from 'react';
import { useAsync, useUpdateEffect } from 'react-use';

type TScriptedWidgetProps = PropsWithChildren<{
  scriptId: string;
}>;

const mockCodeData = `
export const createWidget = (element) => ({
  //@param {int} [a=0] - Числовой параметр
  a: 0,

  handleClick() {
    alert(1)
  },

  init() {
    element.addEventListener('click', this.handleClick)
    console.log('inited')
  },

  update() {
    console.log('updated')
  },

  dispose() {
    element.removeEventListener('click', this.handleClick)
    console.log('disposed')
  }
})
`

export const ScriptedWidget: FC<TScriptedWidgetProps> = ({
  scriptId,
  children,
}) => {
  const ref = useRef(null)

  const { loading, value } = useAsync(async () => {
    // TODO: get script content by id
    const module = await stringToJsModule(mockCodeData);

    return module.createWidget(ref.current)
  }, [])

  useEffect(() => {
    if (loading) return;

    value.init()

    return () => value?.dispose()
  }, [loading, value])

  useUpdateEffect(() => {
    if (loading) return;

    value.update()
  })

  return Children.map(children, child => cloneElement(child as JSX.Element, { ref }))
}

ScriptedWidget.displayName = 'ScriptedWidget';
