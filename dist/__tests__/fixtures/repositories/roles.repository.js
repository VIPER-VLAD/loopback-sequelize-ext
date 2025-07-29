"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const sequelize_1 = require("../../../sequelize");
const primary_datasource_1 = require("../datasources/primary.datasource");
const models_1 = require("../models");
let RolesRepository = class RolesRepository extends sequelize_1.SequelizeCrudRepository {
    constructor(dataSource) {
        super(models_1.Roles, dataSource);
    }
};
exports.RolesRepository = RolesRepository;
exports.RolesRepository = RolesRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.primary')),
    tslib_1.__metadata("design:paramtypes", [primary_datasource_1.PrimaryDataSource])
], RolesRepository);
//# sourceMappingURL=roles.repository.js.map