import { Entity } from '@loopback/repository';
export declare class Roles extends Entity {
    id?: string;
    permissions: string[];
    description?: string;
    constructor(data?: Partial<Roles>);
}
export interface RolesRelations {
}
export type RoleWithRelations = Roles & RolesRelations;
