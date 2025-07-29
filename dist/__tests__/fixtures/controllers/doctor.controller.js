"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const test_controller_base_1 = require("./test.controller.base");
let DoctorController = class DoctorController extends test_controller_base_1.TestControllerBase {
    constructor(doctorRepository) {
        super(doctorRepository);
        this.doctorRepository = doctorRepository;
    }
    async create(doctor) {
        return this.doctorRepository.create(doctor);
    }
    async count(where) {
        return this.doctorRepository.count(where);
    }
    async find(filter) {
        return this.doctorRepository.find(filter);
    }
    async updateAll(doctor, where) {
        return this.doctorRepository.updateAll(doctor, where);
    }
    async findById(id, filter) {
        return this.doctorRepository.findById(id, filter);
    }
    async updateById(id, doctor) {
        await this.doctorRepository.updateById(id, doctor);
    }
    async replaceById(id, doctor) {
        await this.doctorRepository.replaceById(id, doctor);
    }
    async deleteById(id) {
        await this.doctorRepository.deleteById(id);
    }
    async syncSequelizeModel() {
        await this.beforeEach({ syncAll: true });
    }
};
exports.DoctorController = DoctorController;
tslib_1.__decorate([
    (0, rest_1.post)('/doctors'),
    (0, rest_1.response)(200, {
        description: 'Doctor model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Doctor) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Doctor, {
                    title: 'NewDoctor',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DoctorController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/doctors/count'),
    (0, rest_1.response)(200, {
        description: 'Doctor model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Doctor)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DoctorController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/doctors'),
    (0, rest_1.response)(200, {
        description: 'Array of Doctor model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Doctor, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Doctor)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DoctorController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/doctors'),
    (0, rest_1.response)(200, {
        description: 'Doctor PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Doctor, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Doctor)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Doctor, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DoctorController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/doctors/{id}'),
    (0, rest_1.response)(200, {
        description: 'Doctor model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Doctor, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Doctor, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DoctorController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/doctors/{id}'),
    (0, rest_1.response)(204, {
        description: 'Doctor PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Doctor, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Doctor]),
    tslib_1.__metadata("design:returntype", Promise)
], DoctorController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/doctors/{id}'),
    (0, rest_1.response)(204, {
        description: 'Doctor PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Doctor]),
    tslib_1.__metadata("design:returntype", Promise)
], DoctorController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/doctors/{id}'),
    (0, rest_1.response)(204, {
        description: 'Doctor DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], DoctorController.prototype, "deleteById", null);
tslib_1.__decorate([
    (0, rest_1.get)('/doctors/sync-sequelize-model'),
    (0, rest_1.response)(200),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DoctorController.prototype, "syncSequelizeModel", null);
exports.DoctorController = DoctorController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.DoctorRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DoctorRepository])
], DoctorController);
//# sourceMappingURL=doctor.controller.js.map