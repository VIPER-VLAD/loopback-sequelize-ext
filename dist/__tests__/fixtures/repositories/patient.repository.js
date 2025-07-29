"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const sequelize_1 = require("../../../sequelize");
const primary_datasource_1 = require("../datasources/primary.datasource");
const index_1 = require("../models/index");
let PatientRepository = class PatientRepository extends sequelize_1.SequelizeCrudRepository {
    constructor(dataSource) {
        super(index_1.Patient, dataSource);
    }
};
exports.PatientRepository = PatientRepository;
exports.PatientRepository = PatientRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.primary')),
    tslib_1.__metadata("design:paramtypes", [primary_datasource_1.PrimaryDataSource])
], PatientRepository);
//# sourceMappingURL=patient.repository.js.map