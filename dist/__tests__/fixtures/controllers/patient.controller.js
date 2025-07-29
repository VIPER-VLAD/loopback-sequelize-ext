"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let PatientController = class PatientController {
    constructor(patientRepository) {
        this.patientRepository = patientRepository;
    }
    async create(patient) {
        return this.patientRepository.create(patient);
    }
    async count(where) {
        return this.patientRepository.count(where);
    }
    async find(filter) {
        return this.patientRepository.find(filter);
    }
    async updateAll(patient, where) {
        return this.patientRepository.updateAll(patient, where);
    }
    async findById(id, filter) {
        return this.patientRepository.findById(id, filter);
    }
    async updateById(id, patient) {
        await this.patientRepository.updateById(id, patient);
    }
    async replaceById(id, patient) {
        await this.patientRepository.replaceById(id, patient);
    }
    async deleteById(id) {
        await this.patientRepository.deleteById(id);
    }
};
exports.PatientController = PatientController;
tslib_1.__decorate([
    (0, rest_1.post)('/patients'),
    (0, rest_1.response)(200, {
        description: 'Patient model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Patient) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Patient, {
                    title: 'NewPatient',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PatientController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/patients/count'),
    (0, rest_1.response)(200, {
        description: 'Patient model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Patient)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PatientController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/patients'),
    (0, rest_1.response)(200, {
        description: 'Array of Patient model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Patient, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Patient)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PatientController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/patients'),
    (0, rest_1.response)(200, {
        description: 'Patient PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Patient, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Patient)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Patient, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PatientController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/patients/{id}'),
    (0, rest_1.response)(200, {
        description: 'Patient model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Patient, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Patient, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PatientController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/patients/{id}'),
    (0, rest_1.response)(204, {
        description: 'Patient PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Patient, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Patient]),
    tslib_1.__metadata("design:returntype", Promise)
], PatientController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/patients/{id}'),
    (0, rest_1.response)(204, {
        description: 'Patient PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Patient]),
    tslib_1.__metadata("design:returntype", Promise)
], PatientController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/patients/{id}'),
    (0, rest_1.response)(204, {
        description: 'Patient DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], PatientController.prototype, "deleteById", null);
exports.PatientController = PatientController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.PatientRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.PatientRepository])
], PatientController);
//# sourceMappingURL=patient.controller.js.map