"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const sequelize_1 = require("../../../sequelize");
const primary_datasource_1 = require("../datasources/primary.datasource");
const index_1 = require("../models/index");
let TodoListRepository = class TodoListRepository extends sequelize_1.SequelizeCrudRepository {
    constructor(dataSource, todoRepositoryGetter, userRepositoryGetter) {
        super(index_1.TodoList, dataSource);
        this.todoRepositoryGetter = todoRepositoryGetter;
        this.userRepositoryGetter = userRepositoryGetter;
        this.todos = this.createHasManyRepositoryFactoryFor('todos', todoRepositoryGetter);
        this.registerInclusionResolver('todos', this.todos.inclusionResolver);
        this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
        this.registerInclusionResolver('user', this.user.inclusionResolver);
    }
};
exports.TodoListRepository = TodoListRepository;
exports.TodoListRepository = TodoListRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.primary')),
    tslib_1.__param(1, repository_1.repository.getter('TodoRepository')),
    tslib_1.__param(2, repository_1.repository.getter('UserRepository')),
    tslib_1.__metadata("design:paramtypes", [primary_datasource_1.PrimaryDataSource, Function, Function])
], TodoListRepository);
//# sourceMappingURL=todo-list.repository.js.map