import { Entity } from '@loopback/repository';
import { Todo } from './todo.model';
export declare class TodoList extends Entity {
    id?: number;
    title: string;
    todos: Todo[];
    userId?: number;
    constructor(data?: Partial<TodoList>);
}
export interface TodoListRelations {
}
export type TodoListWithRelations = TodoList & TodoListRelations;
