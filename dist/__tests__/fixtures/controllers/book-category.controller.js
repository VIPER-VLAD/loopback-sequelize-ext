"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookCategoryController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let BookCategoryController = class BookCategoryController {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    async getCategory(id) {
        return this.bookRepository.category(id);
    }
};
exports.BookCategoryController = BookCategoryController;
tslib_1.__decorate([
    (0, rest_1.get)('/books/{id}/category', {
        responses: {
            '200': {
                description: 'Category belonging to Book',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Category) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BookCategoryController.prototype, "getCategory", null);
exports.BookCategoryController = BookCategoryController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.BookRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BookRepository])
], BookCategoryController);
//# sourceMappingURL=book-category.controller.js.map