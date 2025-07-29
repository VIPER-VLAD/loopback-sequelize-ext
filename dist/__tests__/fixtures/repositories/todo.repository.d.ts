import { Getter } from '@loopback/core';
import { BelongsToAccessor } from '@loopback/repository';
import { SequelizeCrudRepository } from '../../../sequelize';
import { PrimaryDataSource } from '../datasources/primary.datasource';
import { Todo, TodoList, TodoRelations } from '../models/index';
import { TodoListRepository } from './todo-list.repository';
export declare class TodoRepository extends SequelizeCrudRepository<Todo, typeof Todo.prototype.id, TodoRelations> {
    protected todoListRepositoryGetter: Getter<TodoListRepository>;
    readonly todoList: BelongsToAccessor<TodoList, typeof Todo.prototype.id>;
    constructor(dataSource: PrimaryDataSource, todoListRepositoryGetter: Getter<TodoListRepository>);
}
