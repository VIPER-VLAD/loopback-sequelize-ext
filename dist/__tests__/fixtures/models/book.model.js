"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const category_model_1 = require("./category.model");
let Book = class Book extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Book = Book;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Book.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Book.prototype, "title", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        postgresql: {
            dataType: 'float',
            precision: 20,
            scale: 4,
        },
    }),
    tslib_1.__metadata("design:type", Number)
], Book.prototype, "rating", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => category_model_1.Category),
    tslib_1.__metadata("design:type", Number)
], Book.prototype, "categoryId", void 0);
exports.Book = Book = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Book);
//# sourceMappingURL=book.model.js.map