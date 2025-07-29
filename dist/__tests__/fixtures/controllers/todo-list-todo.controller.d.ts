import { Count, Filter, Where } from '@loopback/repository';
import { TodoList, Todo } from '../models';
import { TodoListRepository } from '../repositories';
export declare class TodoListTodoController {
    protected todoListRepository: TodoListRepository;
    constructor(todoListRepository: TodoListRepository);
    find(id: number, filter?: Filter<Todo>): Promise<Todo[]>;
    create(id: typeof TodoList.prototype.id, todo: Omit<Todo, 'id'>): Promise<Todo>;
    patch(id: number, todo: Partial<Todo>, where?: Where<Todo>): Promise<Count>;
    delete(id: number, where?: Where<Todo>): Promise<Count>;
}
