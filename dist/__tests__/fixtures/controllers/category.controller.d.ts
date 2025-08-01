import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Category } from '../models';
import { CategoryRepository } from '../repositories';
export declare class CategoryController {
    categoryRepository: CategoryRepository;
    constructor(categoryRepository: CategoryRepository);
    create(category: Omit<Category, 'id'>): Promise<Category>;
    createAll(categories: Array<Omit<Category, 'id'>>): Promise<Category[]>;
    count(where?: Where<Category>): Promise<Count>;
    find(filter?: Filter<Category>): Promise<Category[]>;
    updateAll(category: Category, where?: Where<Category>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Category>): Promise<Category>;
    updateById(id: number, category: Category): Promise<void>;
    replaceById(id: number, category: Category): Promise<void>;
    deleteById(id: number): Promise<void>;
}
