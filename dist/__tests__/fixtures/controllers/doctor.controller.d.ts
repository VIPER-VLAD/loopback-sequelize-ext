import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Doctor } from '../models';
import { DoctorRepository } from '../repositories';
import { TestControllerBase } from './test.controller.base';
export declare class DoctorController extends TestControllerBase {
    doctorRepository: DoctorRepository;
    constructor(doctorRepository: DoctorRepository);
    create(doctor: Omit<Doctor, 'id'>): Promise<Doctor>;
    count(where?: Where<Doctor>): Promise<Count>;
    find(filter?: Filter<Doctor>): Promise<Doctor[]>;
    updateAll(doctor: Doctor, where?: Where<Doctor>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Doctor>): Promise<Doctor>;
    updateById(id: number, doctor: Doctor): Promise<void>;
    replaceById(id: number, doctor: Doctor): Promise<void>;
    deleteById(id: number): Promise<void>;
    syncSequelizeModel(): Promise<void>;
}
