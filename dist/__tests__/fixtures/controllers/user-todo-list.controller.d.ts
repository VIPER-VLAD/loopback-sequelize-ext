import { Count, Filter, Where } from '@loopback/repository';
import { User, TodoList } from '../models';
import { UserRepository } from '../repositories';
export declare class UserTodoListController {
    protected userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    get(id: number, filter?: Filter<TodoList>): Promise<TodoList>;
    create(id: typeof User.prototype.id, todoList: Omit<TodoList, 'id'>): Promise<TodoList>;
    patch(id: number, todoList: Partial<TodoList>, where?: Where<TodoList>): Promise<Count>;
    delete(id: number, where?: Where<TodoList>): Promise<Count>;
}
