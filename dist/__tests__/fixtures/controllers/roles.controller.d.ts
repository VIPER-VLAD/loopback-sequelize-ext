import { Filter } from '@loopback/repository';
import { Roles } from '../models';
import { RolesRepository } from '../repositories';
import { TestControllerBase } from './test.controller.base';
export declare class RolesController extends TestControllerBase {
    roleRepository: RolesRepository;
    constructor(roleRepository: RolesRepository);
    create(role: Omit<Roles, 'id'>): Promise<Roles>;
    getRoles(filter?: Filter<Roles>): Promise<Roles[]>;
    syncSequelizeModel(): Promise<void>;
}
