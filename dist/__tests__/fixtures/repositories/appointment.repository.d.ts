import { SequelizeCrudRepository } from '../../../sequelize';
import { PrimaryDataSource } from '../datasources/primary.datasource';
import { Appointment, AppointmentRelations } from '../models/index';
export declare class AppointmentRepository extends SequelizeCrudRepository<Appointment, typeof Appointment.prototype.id, AppointmentRelations> {
    constructor(dataSource: PrimaryDataSource);
}
