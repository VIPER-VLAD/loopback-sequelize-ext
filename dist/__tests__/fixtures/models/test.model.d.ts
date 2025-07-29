import { Entity } from '@loopback/repository';
export declare const eventTableName = "tbl_event";
export declare class Event extends Entity {
    constructor(data?: Partial<Event>);
}
export declare class Box extends Entity {
    constructor(data?: Partial<Box>);
}
