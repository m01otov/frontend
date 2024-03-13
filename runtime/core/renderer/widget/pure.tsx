import { Children, FC, PropsWithChildren, cloneElement, useRef } from 'react';

type TPureWidgetProps = PropsWithChildren;

export const PureWidget: FC<TPureWidgetProps> = ({
  children
}) => {
  const ref = useRef(null)

  return Children.map(children, child => cloneElement(child as JSX.Element, { ref }))
}

PureWidget.displayName = 'PureWidget';
