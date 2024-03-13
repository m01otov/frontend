import type { FC } from 'react';
import { EEditorTool, EEditorToolCategory } from '../enums';

export type TToolBaseProps = {
  target: React.RefObject<HTMLElement>;
  onComplete: (data: any) => void;
}

export type TToolsList = Record<EEditorTool, {
  category?: EEditorToolCategory;

  displayName: string;
  
  component: FC<TToolBaseProps>;
}>
