import { Entity } from '@loopback/repository';
import { Patient } from './patient.model';
export declare class Doctor extends Entity {
    id?: number;
    name: string;
    patients: Patient[];
    constructor(data?: Partial<Doctor>);
}
export interface DoctorRelations {
}
export type DoctorWithRelations = Doctor & DoctorRelations;
