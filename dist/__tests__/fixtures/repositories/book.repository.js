"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const sequelize_1 = require("../../../sequelize");
const primary_datasource_1 = require("../datasources/primary.datasource");
const index_1 = require("../models/index");
let BookRepository = class BookRepository extends sequelize_1.SequelizeCrudRepository {
    constructor(dataSource, categoryRepositoryGetter) {
        super(index_1.Book, dataSource);
        this.categoryRepositoryGetter = categoryRepositoryGetter;
        this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter);
        this.registerInclusionResolver('category', this.category.inclusionResolver);
    }
};
exports.BookRepository = BookRepository;
exports.BookRepository = BookRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.primary')),
    tslib_1.__param(1, repository_1.repository.getter('CategoryRepository')),
    tslib_1.__metadata("design:paramtypes", [primary_datasource_1.PrimaryDataSource, Function])
], BookRepository);
//# sourceMappingURL=book.repository.js.map