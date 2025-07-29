import { Entity } from '@loopback/repository';
export declare class Book extends Entity {
    id?: number;
    title: string;
    rating?: number;
    categoryId: number;
    constructor(data?: Partial<Book>);
}
export interface BookRelations {
}
export type BookWithRelations = Book & BookRelations;
