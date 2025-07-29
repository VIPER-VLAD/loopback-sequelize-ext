"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeveloperController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const test_controller_base_1 = require("./test.controller.base");
let DeveloperController = class DeveloperController extends test_controller_base_1.TestControllerBase {
    constructor(developerRepository) {
        super(developerRepository);
        this.developerRepository = developerRepository;
    }
    async create(developer) {
        return this.developerRepository.create(developer);
    }
    async count(where) {
        return this.developerRepository.count(where);
    }
    async find(filter) {
        return this.developerRepository.find(filter);
    }
    async updateAll(developer, where) {
        return this.developerRepository.updateAll(developer, where);
    }
    async findById(id, filter) {
        return this.developerRepository.findById(id, filter);
    }
    async updateById(id, developer) {
        await this.developerRepository.updateById(id, developer);
    }
    async replaceById(id, developer) {
        await this.developerRepository.replaceById(id, developer);
    }
    async deleteById(id) {
        await this.developerRepository.deleteById(id);
    }
    async syncSequelizeModel() {
        await this.beforeEach({ syncAll: true });
    }
};
exports.DeveloperController = DeveloperController;
tslib_1.__decorate([
    (0, rest_1.post)('/developers'),
    (0, rest_1.response)(200, {
        description: 'Developer model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Developer) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Developer, {
                    title: 'NewDeveloper',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeveloperController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/developers/count'),
    (0, rest_1.response)(200, {
        description: 'Developer model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Developer)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeveloperController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/developers'),
    (0, rest_1.response)(200, {
        description: 'Array of Developer model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Developer, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Developer)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeveloperController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/developers'),
    (0, rest_1.response)(200, {
        description: 'Developer PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Developer, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Developer)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Developer, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeveloperController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/developers/{id}'),
    (0, rest_1.response)(200, {
        description: 'Developer model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Developer, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Developer, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DeveloperController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/developers/{id}'),
    (0, rest_1.response)(204, {
        description: 'Developer PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Developer, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Developer]),
    tslib_1.__metadata("design:returntype", Promise)
], DeveloperController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/developers/{id}'),
    (0, rest_1.response)(204, {
        description: 'Developer PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Developer]),
    tslib_1.__metadata("design:returntype", Promise)
], DeveloperController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/developers/{id}'),
    (0, rest_1.response)(204, {
        description: 'Developer DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], DeveloperController.prototype, "deleteById", null);
tslib_1.__decorate([
    (0, rest_1.get)('/developers/sync-sequelize-model'),
    (0, rest_1.response)(200),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DeveloperController.prototype, "syncSequelizeModel", null);
exports.DeveloperController = DeveloperController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.DeveloperRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DeveloperRepository])
], DeveloperController);
//# sourceMappingURL=developer.controller.js.map