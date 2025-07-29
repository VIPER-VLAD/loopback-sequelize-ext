import { Todo, TodoList } from '../models';
import { TodoRepository } from '../repositories';
export declare class TodoTodoListController {
    todoRepository: TodoRepository;
    constructor(todoRepository: TodoRepository);
    getTodoList(id: typeof Todo.prototype.id): Promise<TodoList>;
}
