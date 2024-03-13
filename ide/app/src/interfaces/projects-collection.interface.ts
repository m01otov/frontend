import type { WithOptional } from '@lukoil/scad-runtime-core';

import type { IProject, IProjectDto } from './project.interface';

export interface IProjectsCollection {

  entries: Map<string, IProject>;

  isLoading: boolean;

  load: () => void;

  create: (value: WithOptional<IProjectDto, 'description'>) => void;

  update: (id: string, value: Partial<IProjectDto>) => void;

  remove: (id: string) => void;

  readonly asArray: [string, IProject][];

}
