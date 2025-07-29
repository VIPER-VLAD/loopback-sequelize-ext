import { Getter } from '@loopback/core';
import { HasOneRepositoryFactory } from '@loopback/repository';
import { SequelizeCrudRepository } from '../../../sequelize';
import { PrimaryDataSource } from '../datasources/primary.datasource';
import { TodoList, User, UserRelations } from '../models/index';
import { TodoListRepository } from './todo-list.repository';
export declare class UserRepository extends SequelizeCrudRepository<User, typeof User.prototype.id, UserRelations> {
    protected todoListRepositoryGetter: Getter<TodoListRepository>;
    readonly todoList: HasOneRepositoryFactory<TodoList, typeof User.prototype.id>;
    constructor(dataSource: PrimaryDataSource, todoListRepositoryGetter: Getter<TodoListRepository>);
}
