"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const sequelize_1 = require("../../../sequelize");
const secondary_datasource_1 = require("../datasources/secondary.datasource");
const models_1 = require("../models");
let ProductRepository = class ProductRepository extends sequelize_1.SequelizeCrudRepository {
    constructor(dataSource) {
        super(models_1.Product, dataSource);
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.secondary')),
    tslib_1.__metadata("design:paramtypes", [secondary_datasource_1.SecondaryDataSource])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map