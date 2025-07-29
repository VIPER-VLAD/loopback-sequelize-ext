"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimaryDataSource = exports.config = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const sequelize_1 = require("../../../sequelize");
const config_1 = require("./config");
// DEVELOPMENT NOTE:
// "Few Test cases for database transaction features won't work for in-memory
// database configuration like sqlite3, change this to postgresql while developing to run
// all test cases of transactional repo including those of isolation levels.
// but ensure it's set to sqlite3 before commiting changes."
exports.config = config_1.datasourceTestConfig['primary']['sqlite3'];
let PrimaryDataSource = class PrimaryDataSource extends sequelize_1.SequelizeDataSource {
    constructor(dsConfig = exports.config) {
        super(dsConfig);
    }
};
exports.PrimaryDataSource = PrimaryDataSource;
PrimaryDataSource.dataSourceName = 'primary';
PrimaryDataSource.defaultConfig = exports.config;
exports.PrimaryDataSource = PrimaryDataSource = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)('datasource'),
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.primary', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], PrimaryDataSource);
//# sourceMappingURL=primary.datasource.js.map