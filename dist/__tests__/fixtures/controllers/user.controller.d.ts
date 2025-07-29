import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { User } from '../models';
import { UserRepository } from '../repositories';
import { TestControllerBase } from './test.controller.base';
export declare class UserController extends TestControllerBase {
    userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    create(user: Omit<User, 'id'>): Promise<User>;
    createAll(users: Array<Omit<User, 'id'>>): Promise<User[]>;
    count(where?: Where<User>): Promise<Count>;
    find(filter?: Filter<User>): Promise<User[]>;
    updateAll(user: User, where?: Where<User>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<User>): Promise<User>;
    updateById(id: number, user: User): Promise<void>;
    replaceById(id: number, user: User): Promise<void>;
    deleteById(id: number): Promise<void>;
    syncSequelizeModel(): Promise<void>;
}
