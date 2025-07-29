"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const test_controller_base_1 = require("./test.controller.base");
let RolesController = class RolesController extends test_controller_base_1.TestControllerBase {
    constructor(roleRepository) {
        super(roleRepository);
        this.roleRepository = roleRepository;
    }
    async create(role) {
        return this.roleRepository.create(role);
    }
    async getRoles(filter) {
        return this.roleRepository.find(filter);
    }
    async syncSequelizeModel() {
        await this.beforeEach();
    }
};
exports.RolesController = RolesController;
tslib_1.__decorate([
    (0, rest_1.post)('/role'),
    (0, rest_1.response)(200, {
        description: 'Role model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Roles) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Roles, {
                    title: 'NewRole',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RolesController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/roles'),
    (0, rest_1.response)(200, {
        description: 'Role model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Roles, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Roles)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RolesController.prototype, "getRoles", null);
tslib_1.__decorate([
    (0, rest_1.get)('/roles/sync-sequelize-model'),
    (0, rest_1.response)(200),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], RolesController.prototype, "syncSequelizeModel", null);
exports.RolesController = RolesController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.RolesRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.RolesRepository])
], RolesController);
//# sourceMappingURL=roles.controller.js.map