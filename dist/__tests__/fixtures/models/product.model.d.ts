import { Entity } from '@loopback/repository';
export declare const TableInSecondaryDB = "products";
export declare class Product extends Entity {
    id?: number;
    name: string;
    price: number;
    constructor(data?: Partial<Product>);
}
export interface ProductRelations {
}
export type ProductWithRelations = Product & ProductRelations;
