import { IFile } from '@lukoil/scad-file-explorer';
import { Signal } from 'typed-signals';

export type TCodeEditorContextProps = {

  file: IFile;

}

export interface ICodeEditorContext {
  language: 'javascript' | 'css' | 'json' | 'text';

  value: string;

  isLoading: boolean;

  onClose: Signal<() => void>;

  setValue: (value: string) => void;

  load: () => void;

  save: () => void;

  closeEditor: () => void;

  readonly fileId: string;

}
