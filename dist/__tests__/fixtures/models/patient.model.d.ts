import { Entity } from '@loopback/repository';
export declare class Patient extends Entity {
    id?: number;
    name: string;
    password?: string;
    constructor(data?: Partial<Patient>);
}
export interface PatientRelations {
}
export type PatientWithRelations = Patient & PatientRelations;
