"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoTodoListController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let TodoTodoListController = class TodoTodoListController {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    async getTodoList(id) {
        return this.todoRepository.todoList(id);
    }
};
exports.TodoTodoListController = TodoTodoListController;
tslib_1.__decorate([
    (0, rest_1.get)('/todos/{id}/todo-list', {
        responses: {
            '200': {
                description: 'TodoList belonging to Todo',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.TodoList) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TodoTodoListController.prototype, "getTodoList", null);
exports.TodoTodoListController = TodoTodoListController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.TodoRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TodoRepository])
], TodoTodoListController);
//# sourceMappingURL=todo-todo-list.controller.js.map