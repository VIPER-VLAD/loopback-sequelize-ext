"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTodoListController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let UserTodoListController = class UserTodoListController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async get(id, filter) {
        return this.userRepository.todoList(id).get(filter);
    }
    async create(id, todoList) {
        return this.userRepository.todoList(id).create(todoList);
    }
    async patch(id, todoList, where) {
        return this.userRepository.todoList(id).patch(todoList, where);
    }
    async delete(id, where) {
        return this.userRepository.todoList(id).delete(where);
    }
};
exports.UserTodoListController = UserTodoListController;
tslib_1.__decorate([
    (0, rest_1.get)('/users/{id}/todo-list', {
        responses: {
            '200': {
                description: 'User has one TodoList',
                content: {
                    'application/json': {
                        schema: (0, rest_1.getModelSchemaRef)(models_1.TodoList),
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
], UserTodoListController.prototype, "get", null);
tslib_1.__decorate([
    (0, rest_1.post)('/users/{id}/todo-list', {
        responses: {
            '200': {
                description: 'User model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.TodoList) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.TodoList, {
                    title: 'NewTodoListInUser',
                    exclude: ['id'],
                    optional: ['userId'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserTodoListController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/users/{id}/todo-list', {
        responses: {
            '200': {
                description: 'User.TodoList PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.TodoList, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.TodoList))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserTodoListController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/users/{id}/todo-list', {
        responses: {
            '200': {
                description: 'User.TodoList DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.TodoList))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserTodoListController.prototype, "delete", null);
exports.UserTodoListController = UserTodoListController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository])
], UserTodoListController);
//# sourceMappingURL=user-todo-list.controller.js.map