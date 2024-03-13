import { forwardRef, type HTMLAttributes } from 'react';

import { type TTreeContextProviderProps, TreeContextProvider } from './provider';
import { TreeContainer } from './container';

type TTreeProps = TTreeContextProviderProps & Pick<HTMLAttributes<HTMLDivElement>, 'className'>;

export const Tree = forwardRef<HTMLDivElement, TTreeProps>(({
  children,
  className,
  ...rest
}, ref) => (
  <TreeContextProvider {...rest}>
    <TreeContainer ref={ref} className={className}>
      {children}
    </TreeContainer>
  </TreeContextProvider>
))

Tree.displayName = 'Tree';
