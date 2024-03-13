export interface IProjectDto {
  id: string

  name: string;

  description: string;

}

export interface IProject extends IProjectDto {
  
  update: (value: Partial<IProjectDto>) => void

}
