import { Entity } from '@loopback/repository';
export declare class Category extends Entity {
    id?: number;
    name: string;
    constructor(data?: Partial<Category>);
}
export interface CategoryRelations {
}
export type CategoryWithRelations = Category & CategoryRelations;
