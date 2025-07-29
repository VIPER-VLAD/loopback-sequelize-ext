import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Developer } from '../models';
import { DeveloperRepository } from '../repositories';
import { TestControllerBase } from './test.controller.base';
export declare class DeveloperController extends TestControllerBase {
    developerRepository: DeveloperRepository;
    constructor(developerRepository: DeveloperRepository);
    create(developer: Omit<Developer, 'id'>): Promise<Developer>;
    count(where?: Where<Developer>): Promise<Count>;
    find(filter?: Filter<Developer>): Promise<Developer[]>;
    updateAll(developer: Developer, where?: Where<Developer>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Developer>): Promise<Developer>;
    updateById(id: number, developer: Developer): Promise<void>;
    replaceById(id: number, developer: Developer): Promise<void>;
    deleteById(id: number): Promise<void>;
    syncSequelizeModel(): Promise<void>;
}
