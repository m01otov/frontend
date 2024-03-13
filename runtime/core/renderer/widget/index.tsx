import { FC, PropsWithChildren } from 'react';

import { ScriptedWidget } from './scripted';
import { PureWidget } from './pure';
import type { Nullable } from '../../types';

export type TWidgetProps = PropsWithChildren<{
  scriptId: Nullable<string>;
  alwaysPure?: boolean;
}>;

export const Widget: FC<TWidgetProps> = ({
  scriptId,
  alwaysPure = false,
  ...rest
}) => {
  if (alwaysPure) {
    return <PureWidget {...rest} />
  }

  return scriptId 
    ? <ScriptedWidget scriptId={scriptId} {...rest} />
    : <PureWidget {...rest} />
}

Widget.displayName = 'Widget';
