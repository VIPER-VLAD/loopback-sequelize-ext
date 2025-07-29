import { Entity } from '@loopback/repository';
export declare class Task extends Entity {
    id?: number;
    title: string;
    uuidv1: string;
    uuidv4: string;
    shortId: string;
    nanoId: string;
    customAlias: number;
    createdAt: Date;
    constructor(data?: Partial<Task>);
}
export interface TaskRelations {
}
export type TaskWithRelations = Task & TaskRelations;
