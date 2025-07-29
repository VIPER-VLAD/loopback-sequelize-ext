import { Getter } from '@loopback/core';
import { HasManyRepositoryFactory, type BelongsToAccessor } from '@loopback/repository';
import { SequelizeCrudRepository } from '../../../sequelize';
import { PrimaryDataSource } from '../datasources/primary.datasource';
import { Todo, TodoList, TodoListRelations, User } from '../models/index';
import { TodoRepository } from './todo.repository';
import { UserRepository } from './user.repository';
export declare class TodoListRepository extends SequelizeCrudRepository<TodoList, typeof TodoList.prototype.id, TodoListRelations> {
    protected todoRepositoryGetter: Getter<TodoRepository>;
    protected userRepositoryGetter: Getter<UserRepository>;
    readonly todos: HasManyRepositoryFactory<Todo, typeof TodoList.prototype.id>;
    readonly user: BelongsToAccessor<User, typeof TodoList.prototype.id>;
    constructor(dataSource: PrimaryDataSource, todoRepositoryGetter: Getter<TodoRepository>, userRepositoryGetter: Getter<UserRepository>);
}
