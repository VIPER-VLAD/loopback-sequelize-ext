import { Entity } from '@loopback/repository';
import { TodoList } from './todo-list.model';
export declare class Address extends Entity {
    city: string;
    zipCode: number;
}
export declare class User extends Entity {
    id?: number;
    name: string;
    email: string;
    phoneNumbers: string[];
    active?: boolean;
    address: Address;
    password?: string;
    dob?: Date;
    todoList: TodoList;
    constructor(data?: Partial<User>);
}
export interface UserRelations {
}
export type UserWithRelations = User & UserRelations;
