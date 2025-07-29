import { Getter } from '@loopback/core';
import { HasManyThroughRepositoryFactory } from '@loopback/repository';
import { SequelizeCrudRepository } from '../../../sequelize';
import { PrimaryDataSource } from '../datasources/primary.datasource';
import { Appointment, Doctor, DoctorRelations, Patient } from '../models/index';
import { AppointmentRepository } from './appointment.repository';
import { PatientRepository } from './patient.repository';
export declare class DoctorRepository extends SequelizeCrudRepository<Doctor, typeof Doctor.prototype.id, DoctorRelations> {
    protected appointmentRepositoryGetter: Getter<AppointmentRepository>;
    protected patientRepositoryGetter: Getter<PatientRepository>;
    readonly patients: HasManyThroughRepositoryFactory<Patient, typeof Patient.prototype.id, Appointment, typeof Doctor.prototype.id>;
    constructor(dataSource: PrimaryDataSource, appointmentRepositoryGetter: Getter<AppointmentRepository>, patientRepositoryGetter: Getter<PatientRepository>);
}
