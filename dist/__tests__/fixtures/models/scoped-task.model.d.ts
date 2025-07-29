import { Entity } from '@loopback/repository';
/**
 * Simplified Entity used for testing settings "scope" functionality
 */
export declare class ScopedTask extends Entity {
    id?: number;
    title: string;
    completed: boolean;
    constructor(data?: Partial<ScopedTask>);
}
export interface ScopedTaskRelations {
}
export type ScopedTaskWithRelations = ScopedTask & ScopedTaskRelations;
