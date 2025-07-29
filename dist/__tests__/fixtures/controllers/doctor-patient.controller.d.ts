import { Count, Filter, Where } from '@loopback/repository';
import { Doctor, Patient } from '../models';
import { DoctorRepository } from '../repositories';
export declare class DoctorPatientController {
    protected doctorRepository: DoctorRepository;
    constructor(doctorRepository: DoctorRepository);
    find(id: number, filter?: Filter<Patient>): Promise<Patient[]>;
    create(id: typeof Doctor.prototype.id, patient: Omit<Patient, 'id'>): Promise<Patient>;
    patch(id: number, patient: Partial<Patient>, where?: Where<Patient>): Promise<Count>;
    delete(id: number, where?: Where<Patient>): Promise<Count>;
}
