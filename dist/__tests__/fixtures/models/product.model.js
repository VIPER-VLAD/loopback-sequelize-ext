"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.TableInSecondaryDB = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
exports.TableInSecondaryDB = 'products';
let Product = class Product extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Product = Product;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "price", void 0);
exports.Product = Product = tslib_1.__decorate([
    (0, repository_1.model)({
        name: exports.TableInSecondaryDB,
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Product);
//# sourceMappingURL=product.model.js.map