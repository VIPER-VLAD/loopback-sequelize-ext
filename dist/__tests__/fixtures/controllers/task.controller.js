"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const test_controller_base_1 = require("./test.controller.base");
let TaskController = class TaskController extends test_controller_base_1.TestControllerBase {
    constructor(taskRepository) {
        super(taskRepository);
        this.taskRepository = taskRepository;
    }
    async create(task) {
        return this.taskRepository.create(task);
    }
    async createAll(tasks) {
        return this.taskRepository.createAll(tasks);
    }
    async count(where) {
        return this.taskRepository.count(where);
    }
    async find(filter) {
        return this.taskRepository.find(filter);
    }
    async updateAll(task, where) {
        return this.taskRepository.updateAll(task, where);
    }
    async findById(id, filter) {
        return this.taskRepository.findById(id, filter);
    }
    async updateById(id, task) {
        await this.taskRepository.updateById(id, task);
    }
    async replaceById(id, task) {
        await this.taskRepository.replaceById(id, task);
    }
    async deleteById(id) {
        await this.taskRepository.deleteById(id);
    }
    async syncSequelizeModel() {
        await this.beforeEach();
    }
};
exports.TaskController = TaskController;
tslib_1.__decorate([
    (0, rest_1.post)('/tasks'),
    (0, rest_1.response)(200, {
        description: 'task model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Task) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Task, {
                    title: 'NewTask',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TaskController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.post)('/tasks-bulk'),
    (0, rest_1.response)(200, {
        description: 'task model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Task),
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Task, {
                        title: 'NewTask',
                        exclude: ['id'],
                    }),
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], TaskController.prototype, "createAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/tasks/count'),
    (0, rest_1.response)(200, {
        description: 'Task model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Task)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TaskController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/tasks'),
    (0, rest_1.response)(200, {
        description: 'Array of Task model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Task, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Task)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TaskController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/tasks'),
    (0, rest_1.response)(200, {
        description: 'Task PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Task, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Task)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Task, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TaskController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/tasks/{id}'),
    (0, rest_1.response)(200, {
        description: 'Task model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Task, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Task, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TaskController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/tasks/{id}'),
    (0, rest_1.response)(204, {
        description: 'Task PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Task, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Task]),
    tslib_1.__metadata("design:returntype", Promise)
], TaskController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/tasks/{id}'),
    (0, rest_1.response)(204, {
        description: 'Task PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Task]),
    tslib_1.__metadata("design:returntype", Promise)
], TaskController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/tasks/{id}'),
    (0, rest_1.response)(204, {
        description: 'Task DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], TaskController.prototype, "deleteById", null);
tslib_1.__decorate([
    (0, rest_1.get)('/tasks/sync-sequelize-model'),
    (0, rest_1.response)(200),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TaskController.prototype, "syncSequelizeModel", null);
exports.TaskController = TaskController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.TaskRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TaskRepository])
], TaskController);
//# sourceMappingURL=task.controller.js.map