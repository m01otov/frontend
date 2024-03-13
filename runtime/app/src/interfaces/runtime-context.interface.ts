import { IEntitiesCollection } from '@lukoil/scad-runtime-core';

export type TRuntimeContextProps = {

}

export interface IRuntimeContext {

  mainScreen: IEntitiesCollection;

  isLoading: boolean;

  loadProject: (id: string) => void;

  loadScreenContent: (id: string) => void;

}
