import { action, makeObservable, observable } from 'mobx';

import type { IProject, IProjectDto } from '@root/interfaces';

export const createProject = (props: IProjectDto) => makeObservable<IProject>({
  
  ...props,

  update(value) {
    Object.entries(value).forEach(([key, value]) => {
      this[key as keyof IProjectDto] = value
    })
  },

}, {
  name: observable,
  description: observable,
  update: action.bound,
})
