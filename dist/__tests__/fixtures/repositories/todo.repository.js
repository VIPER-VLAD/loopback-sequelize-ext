"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const sequelize_1 = require("../../../sequelize");
const primary_datasource_1 = require("../datasources/primary.datasource");
const index_1 = require("../models/index");
let TodoRepository = class TodoRepository extends sequelize_1.SequelizeCrudRepository {
    constructor(dataSource, todoListRepositoryGetter) {
        super(index_1.Todo, dataSource);
        this.todoListRepositoryGetter = todoListRepositoryGetter;
        this.todoList = this.createBelongsToAccessorFor('todoList', todoListRepositoryGetter);
        this.registerInclusionResolver('todoList', this.todoList.inclusionResolver);
    }
};
exports.TodoRepository = TodoRepository;
exports.TodoRepository = TodoRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.primary')),
    tslib_1.__param(1, repository_1.repository.getter('TodoListRepository')),
    tslib_1.__metadata("design:paramtypes", [primary_datasource_1.PrimaryDataSource, Function])
], TodoRepository);
//# sourceMappingURL=todo.repository.js.map