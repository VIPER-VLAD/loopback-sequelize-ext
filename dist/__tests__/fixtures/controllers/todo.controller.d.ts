import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Todo } from '../models';
import { TodoRepository } from '../repositories';
import { TestControllerBase } from './test.controller.base';
export declare class TodoController extends TestControllerBase {
    todoRepository: TodoRepository;
    constructor(todoRepository: TodoRepository);
    create(todo: Omit<Todo, 'id'>): Promise<Todo>;
    count(where?: Where<Todo>): Promise<Count>;
    find(filter?: Filter<Todo>): Promise<Todo[]>;
    updateAll(todo: Todo, where?: Where<Todo>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Todo>): Promise<Todo>;
    updateById(id: number, todo: Todo): Promise<void>;
    replaceById(id: number, todo: Todo): Promise<void>;
    deleteById(id: number): Promise<void>;
    syncSequelizeModel(): Promise<void>;
}
