import { Entity } from '@loopback/repository';
export declare class Appointment extends Entity {
    id?: number;
    doctorId?: number;
    patientId?: number;
    constructor(data?: Partial<Appointment>);
}
export interface AppointmentRelations {
}
export type AppointmentWithRelations = Appointment & AppointmentRelations;
