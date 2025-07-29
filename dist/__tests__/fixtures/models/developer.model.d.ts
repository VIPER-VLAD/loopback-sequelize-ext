import { Entity } from '@loopback/repository';
export declare class Developer extends Entity {
    id?: number;
    name: string;
    programmingLanguageIds: number[];
    apiSecret: string;
    constructor(data?: Partial<Developer>);
}
export interface DeveloperRelations {
}
export type DeveloperWithRelations = Developer & DeveloperRelations;
