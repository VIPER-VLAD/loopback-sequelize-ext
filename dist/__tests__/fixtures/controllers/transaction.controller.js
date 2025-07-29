"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const types_1 = require("./../../../types");
const test_controller_base_1 = require("./test.controller.base");
let TransactionController = class TransactionController extends test_controller_base_1.TestControllerBase {
    constructor(todoListRepository, productRepository) {
        super(todoListRepository, productRepository);
        this.todoListRepository = todoListRepository;
        this.productRepository = productRepository;
    }
    // create todo-list entry using transaction
    async ensureTransactionCommit(todoList) {
        const tx = await this.todoListRepository.beginTransaction({
            isolationLevel: types_1.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        });
        try {
            const created = await this.todoListRepository.create(todoList, {
                transaction: tx,
            });
            await tx.commit();
            return created;
        }
        catch (err) {
            await tx.rollback();
            throw err;
        }
    }
    // create todo-list entry using transaction but rollback
    async ensureRollback(todoList) {
        const tx = await this.todoListRepository.beginTransaction({
            isolationLevel: types_1.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        const created = await this.todoListRepository.create(todoList, {
            transaction: tx,
        });
        await tx.rollback();
        // In real applications if you're rolling back. Don't return created entities to user
        // For test cases it's required here. (to get the id)
        return created;
    }
    // create todo-list entry using transaction but don't commit or rollback
    async ensureIsolatedTransaction(todoList) {
        const tx = await this.todoListRepository.beginTransaction({
            isolationLevel: types_1.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        });
        const created = await this.todoListRepository.create(todoList, {
            transaction: tx,
        });
        let err = {};
        // reading before commit in READ_COMMITED level should not find the entity
        const findBeforeCommit = await this.todoListRepository
            .findById(created.id)
            .catch(e => (err = e));
        await tx.commit();
        // throwing it after commit to avoid deadlocks
        if (err) {
            throw err;
        }
        return findBeforeCommit;
    }
    async ensureLocalTransactions() {
        // "Todo List" model is from Primary Datasource
        // and "AnyObject" model is from Secondary Datasource
        // this test case is to ensure transaction created on
        // one datasource can't be used in another
        const tx = await this.todoListRepository.beginTransaction({
            isolationLevel: types_1.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        });
        let err = null;
        try {
            await this.productRepository.create({
                name: 'phone',
                price: 5000,
            }, {
                transaction: tx,
            });
        }
        catch (e) {
            err = e;
        }
        await tx.commit();
        if (err) {
            throw new rest_1.HttpErrors[406](err.message);
        }
        // Won't reach till here if test passes
        throw new rest_1.HttpErrors[406]('Product created with non-local transaction.');
    }
};
exports.TransactionController = TransactionController;
tslib_1.__decorate([
    (0, rest_1.post)('/transactions/todo-lists/commit'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.TodoList, {
                    title: 'NewTodoList',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "ensureTransactionCommit", null);
tslib_1.__decorate([
    (0, rest_1.post)('/transactions/todo-lists/rollback'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.TodoList, {
                    title: 'NewTodoList',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "ensureRollback", null);
tslib_1.__decorate([
    (0, rest_1.post)('/transactions/todo-lists/isolation/read_commited'),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.TodoList, {
                    title: 'NewTodoList',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "ensureIsolatedTransaction", null);
tslib_1.__decorate([
    (0, rest_1.get)('/transactions/ensure-local'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "ensureLocalTransactions", null);
exports.TransactionController = TransactionController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.TodoListRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.ProductRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TodoListRepository,
        repositories_1.ProductRepository])
], TransactionController);
//# sourceMappingURL=transaction.controller.js.map