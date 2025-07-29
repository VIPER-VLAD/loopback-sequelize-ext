import { AnyObject } from '@loopback/repository';
import { TodoList } from '../models';
import { ProductRepository, TodoListRepository } from '../repositories';
import { TestControllerBase } from './test.controller.base';
export declare class TransactionController extends TestControllerBase {
    todoListRepository: TodoListRepository;
    productRepository: ProductRepository;
    constructor(todoListRepository: TodoListRepository, productRepository: ProductRepository);
    ensureTransactionCommit(todoList: Omit<TodoList, 'id'>): Promise<TodoList>;
    ensureRollback(todoList: Omit<TodoList, 'id'>): Promise<TodoList>;
    ensureIsolatedTransaction(todoList: Omit<TodoList, 'id'>): Promise<TodoList>;
    ensureLocalTransactions(): Promise<AnyObject>;
}
