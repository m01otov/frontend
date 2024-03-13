import { IEntitiesCollection, TRectangle } from '@lukoil/scad-runtime-core';

export interface IWidgetModel {

  entities: IEntitiesCollection;

  readonly boundingBox: TRectangle;

}
