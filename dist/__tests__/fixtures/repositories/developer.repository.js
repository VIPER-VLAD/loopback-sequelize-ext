"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeveloperRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const sequelize_1 = require("../../../sequelize");
const primary_datasource_1 = require("../datasources/primary.datasource");
const index_1 = require("../models/index");
let DeveloperRepository = class DeveloperRepository extends sequelize_1.SequelizeCrudRepository {
    constructor(dataSource, programmingLanguageRepositoryGetter) {
        super(index_1.Developer, dataSource);
        this.programmingLanguageRepositoryGetter = programmingLanguageRepositoryGetter;
        this.programmingLanguages = this.createReferencesManyAccessorFor('programmingLanguages', programmingLanguageRepositoryGetter);
        this.registerInclusionResolver('programmingLanguages', this.programmingLanguages.inclusionResolver);
    }
};
exports.DeveloperRepository = DeveloperRepository;
exports.DeveloperRepository = DeveloperRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.primary')),
    tslib_1.__param(1, repository_1.repository.getter('ProgrammingLanguageRepository')),
    tslib_1.__metadata("design:paramtypes", [primary_datasource_1.PrimaryDataSource, Function])
], DeveloperRepository);
//# sourceMappingURL=developer.repository.js.map