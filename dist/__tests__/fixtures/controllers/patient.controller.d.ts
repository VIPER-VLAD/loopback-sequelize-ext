import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Patient } from '../models';
import { PatientRepository } from '../repositories';
export declare class PatientController {
    patientRepository: PatientRepository;
    constructor(patientRepository: PatientRepository);
    create(patient: Omit<Patient, 'id'>): Promise<Patient>;
    count(where?: Where<Patient>): Promise<Count>;
    find(filter?: Filter<Patient>): Promise<Patient[]>;
    updateAll(patient: Patient, where?: Where<Patient>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Patient>): Promise<Patient>;
    updateById(id: number, patient: Patient): Promise<void>;
    replaceById(id: number, patient: Patient): Promise<void>;
    deleteById(id: number): Promise<void>;
}
