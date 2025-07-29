"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopedTaskController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const repositories_1 = require("../repositories");
const test_controller_base_1 = require("./test.controller.base");
let ScopedTaskController = class ScopedTaskController extends test_controller_base_1.TestControllerBase {
    constructor(scopedTaskRepository) {
        super(scopedTaskRepository);
        this.scopedTaskRepository = scopedTaskRepository;
    }
    async syncSequelizeModel() {
        await this.beforeEach();
    }
};
exports.ScopedTaskController = ScopedTaskController;
tslib_1.__decorate([
    (0, rest_1.get)('/scoped-tasks/sync-sequelize-model'),
    (0, rest_1.response)(200),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ScopedTaskController.prototype, "syncSequelizeModel", null);
exports.ScopedTaskController = ScopedTaskController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ScopedTaskRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ScopedTaskRepository])
], ScopedTaskController);
//# sourceMappingURL=scoped-task.controller.js.map