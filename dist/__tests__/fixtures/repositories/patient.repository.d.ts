import { SequelizeCrudRepository } from '../../../sequelize';
import { PrimaryDataSource } from '../datasources/primary.datasource';
import { Patient, PatientRelations } from '../models/index';
export declare class PatientRepository extends SequelizeCrudRepository<Patient, typeof Patient.prototype.id, PatientRelations> {
    constructor(dataSource: PrimaryDataSource);
}
