"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgrammingLanguangeController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ProgrammingLanguangeController = class ProgrammingLanguangeController {
    constructor(programmingLanguageRepository) {
        this.programmingLanguageRepository = programmingLanguageRepository;
    }
    async create(programmingLanguage) {
        return this.programmingLanguageRepository.create(programmingLanguage);
    }
    async createAll(programmingLanguages) {
        return this.programmingLanguageRepository.createAll(programmingLanguages);
    }
    async count(where) {
        return this.programmingLanguageRepository.count(where);
    }
    async find(filter) {
        return this.programmingLanguageRepository.find(filter);
    }
    async updateAll(programmingLanguage, where) {
        return this.programmingLanguageRepository.updateAll(programmingLanguage, where);
    }
    async findById(id, filter) {
        return this.programmingLanguageRepository.findById(id, filter);
    }
    async updateById(id, programmingLanguage) {
        await this.programmingLanguageRepository.updateById(id, programmingLanguage);
    }
    async replaceById(id, programmingLanguage) {
        await this.programmingLanguageRepository.replaceById(id, programmingLanguage);
    }
    async deleteById(id) {
        await this.programmingLanguageRepository.deleteById(id);
    }
};
exports.ProgrammingLanguangeController = ProgrammingLanguangeController;
tslib_1.__decorate([
    (0, rest_1.post)('/programming-languages'),
    (0, rest_1.response)(200, {
        description: 'ProgrammingLanguage model instance',
        content: {
            'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.ProgrammingLanguage) },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.ProgrammingLanguage, {
                    title: 'NewProgrammingLanguage',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProgrammingLanguangeController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.post)('/programming-languages-bulk'),
    (0, rest_1.response)(200, {
        description: 'ProgrammingLanguage model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.ProgrammingLanguage),
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.ProgrammingLanguage, {
                        title: 'NewProgrammingLanguage',
                        exclude: ['id'],
                    }),
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], ProgrammingLanguangeController.prototype, "createAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/programming-languages/count'),
    (0, rest_1.response)(200, {
        description: 'ProgrammingLanguage model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.ProgrammingLanguage)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProgrammingLanguangeController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/programming-languages'),
    (0, rest_1.response)(200, {
        description: 'Array of ProgrammingLanguage model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.ProgrammingLanguage, {
                        includeRelations: true,
                    }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.ProgrammingLanguage)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProgrammingLanguangeController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/programming-languages'),
    (0, rest_1.response)(200, {
        description: 'ProgrammingLanguage PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.ProgrammingLanguage, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.ProgrammingLanguage)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.ProgrammingLanguage, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProgrammingLanguangeController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/programming-languages/{id}'),
    (0, rest_1.response)(200, {
        description: 'ProgrammingLanguage model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.ProgrammingLanguage, {
                    includeRelations: true,
                }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.ProgrammingLanguage, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProgrammingLanguangeController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/programming-languages/{id}'),
    (0, rest_1.response)(204, {
        description: 'ProgrammingLanguage PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.ProgrammingLanguage, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.ProgrammingLanguage]),
    tslib_1.__metadata("design:returntype", Promise)
], ProgrammingLanguangeController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/programming-languages/{id}'),
    (0, rest_1.response)(204, {
        description: 'ProgrammingLanguage PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.ProgrammingLanguage]),
    tslib_1.__metadata("design:returntype", Promise)
], ProgrammingLanguangeController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/programming-languages/{id}'),
    (0, rest_1.response)(204, {
        description: 'ProgrammingLanguage DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProgrammingLanguangeController.prototype, "deleteById", null);
exports.ProgrammingLanguangeController = ProgrammingLanguangeController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ProgrammingLanguageRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ProgrammingLanguageRepository])
], ProgrammingLanguangeController);
//# sourceMappingURL=programming-languange.controller.js.map