"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let CategoryController = class CategoryController {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(category) {
        return this.categoryRepository.create(category);
    }
    async createAll(categories) {
        return this.categoryRepository.createAll(categories);
    }
    async count(where) {
        return this.categoryRepository.count(where);
    }
    async find(filter) {
        return this.categoryRepository.find(filter);
    }
    async updateAll(category, where) {
        return this.categoryRepository.updateAll(category, where);
    }
    async findById(id, filter) {
        return this.categoryRepository.findById(id, filter);
    }
    async updateById(id, category) {
        await this.categoryRepository.updateById(id, category);
    }
    async replaceById(id, category) {
        await this.categoryRepository.replaceById(id, category);
    }
    async deleteById(id) {
        await this.categoryRepository.deleteById(id);
    }
};
exports.CategoryController = CategoryController;
tslib_1.__decorate([
    (0, rest_1.post)('/categories'),
    (0, rest_1.response)(200, {
        description: 'Category model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Category) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Category, {
                    title: 'NewCategory',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.post)('/categories-bulk'),
    (0, rest_1.response)(200, {
        description: 'Category model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Category),
                },
            },
        },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Category, {
                        title: 'NewCategory',
                        exclude: ['id'],
                    }),
                },
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "createAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/categories/count'),
    (0, rest_1.response)(200, {
        description: 'Category model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Category)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/categories'),
    (0, rest_1.response)(200, {
        description: 'Array of Category model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Category, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Category)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/categories'),
    (0, rest_1.response)(200, {
        description: 'Category PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Category, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Category)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Category, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/categories/{id}'),
    (0, rest_1.response)(200, {
        description: 'Category model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Category, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Category, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/categories/{id}'),
    (0, rest_1.response)(204, {
        description: 'Category PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Category, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Category]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/categories/{id}'),
    (0, rest_1.response)(204, {
        description: 'Category PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Category]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/categories/{id}'),
    (0, rest_1.response)(204, {
        description: 'Category DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteById", null);
exports.CategoryController = CategoryController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.CategoryRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CategoryRepository])
], CategoryController);
//# sourceMappingURL=category.controller.js.map