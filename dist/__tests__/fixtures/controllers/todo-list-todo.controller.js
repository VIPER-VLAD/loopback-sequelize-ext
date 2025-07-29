"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListTodoController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let TodoListTodoController = class TodoListTodoController {
    constructor(todoListRepository) {
        this.todoListRepository = todoListRepository;
    }
    async find(id, filter) {
        return this.todoListRepository.todos(id).find(filter);
    }
    async create(id, todo) {
        return this.todoListRepository.todos(id).create(todo);
    }
    async patch(id, todo, where) {
        return this.todoListRepository.todos(id).patch(todo, where);
    }
    async delete(id, where) {
        return this.todoListRepository.todos(id).delete(where);
    }
};
exports.TodoListTodoController = TodoListTodoController;
tslib_1.__decorate([
    (0, rest_1.get)('/todo-lists/{id}/todos', {
        responses: {
            '200': {
                description: 'Array of TodoList has many Todo',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Todo) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TodoListTodoController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/todo-lists/{id}/todos', {
        responses: {
            '200': {
                description: 'TodoList model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Todo) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Todo, {
                    title: 'NewTodoInTodoList',
                    exclude: ['id'],
                    optional: ['todoListId'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TodoListTodoController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/todo-lists/{id}/todos', {
        responses: {
            '200': {
                description: 'TodoList.Todo PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Todo, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Todo))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TodoListTodoController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/todo-lists/{id}/todos', {
        responses: {
            '200': {
                description: 'TodoList.Todo DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Todo))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TodoListTodoController.prototype, "delete", null);
exports.TodoListTodoController = TodoListTodoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.TodoListRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TodoListRepository])
], TodoListTodoController);
//# sourceMappingURL=todo-list-todo.controller.js.map