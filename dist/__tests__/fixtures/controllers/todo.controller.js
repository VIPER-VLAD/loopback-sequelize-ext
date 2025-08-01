"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const test_controller_base_1 = require("./test.controller.base");
let TodoController = class TodoController extends test_controller_base_1.TestControllerBase {
    constructor(todoRepository) {
        super(todoRepository);
        this.todoRepository = todoRepository;
    }
    async create(todo) {
        return this.todoRepository.create(todo);
    }
    async count(where) {
        return this.todoRepository.count(where);
    }
    async find(filter) {
        return this.todoRepository.find(filter);
    }
    async updateAll(todo, where) {
        return this.todoRepository.updateAll(todo, where);
    }
    async findById(id, filter) {
        return this.todoRepository.findById(id, filter);
    }
    async updateById(id, todo) {
        await this.todoRepository.updateById(id, todo);
    }
    async replaceById(id, todo) {
        await this.todoRepository.replaceById(id, todo);
    }
    async deleteById(id) {
        await this.todoRepository.deleteById(id);
    }
    async syncSequelizeModel() {
        await this.beforeEach();
    }
};
exports.TodoController = TodoController;
tslib_1.__decorate([
    (0, rest_1.post)('/todos'),
    (0, rest_1.response)(200, {
        description: 'Todo model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Todo) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Todo, {
                    title: 'NewTodo',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TodoController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/todos/count'),
    (0, rest_1.response)(200, {
        description: 'Todo model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Todo)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TodoController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/todos'),
    (0, rest_1.response)(200, {
        description: 'Array of Todo model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Todo, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Todo)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TodoController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/todos'),
    (0, rest_1.response)(200, {
        description: 'Todo PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Todo, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Todo)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Todo, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TodoController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/todos/{id}'),
    (0, rest_1.response)(200, {
        description: 'Todo model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Todo, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Todo, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TodoController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/todos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Todo PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Todo, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Todo]),
    tslib_1.__metadata("design:returntype", Promise)
], TodoController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/todos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Todo PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Todo]),
    tslib_1.__metadata("design:returntype", Promise)
], TodoController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/todos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Todo DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], TodoController.prototype, "deleteById", null);
tslib_1.__decorate([
    (0, rest_1.get)('/todos/sync-sequelize-model'),
    (0, rest_1.response)(200),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TodoController.prototype, "syncSequelizeModel", null);
exports.TodoController = TodoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.TodoRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TodoRepository])
], TodoController);
//# sourceMappingURL=todo.controller.js.map