"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorPatientController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let DoctorPatientController = class DoctorPatientController {
    constructor(doctorRepository) {
        this.doctorRepository = doctorRepository;
    }
    async find(id, filter) {
        return this.doctorRepository.patients(id).find(filter);
    }
    async create(id, patient) {
        return this.doctorRepository.patients(id).create(patient);
    }
    async patch(id, patient, where) {
        return this.doctorRepository.patients(id).patch(patient, where);
    }
    async delete(id, where) {
        return this.doctorRepository.patients(id).delete(where);
    }
};
exports.DoctorPatientController = DoctorPatientController;
tslib_1.__decorate([
    (0, rest_1.get)('/doctors/{id}/patients', {
        responses: {
            '200': {
                description: 'Array of Doctor has many Patient through Appointment',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Patient) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DoctorPatientController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/doctors/{id}/patients', {
        responses: {
            '200': {
                description: 'create a Patient model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Patient) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Patient, {
                    title: 'NewPatientInDoctor',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DoctorPatientController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/doctors/{id}/patients', {
        responses: {
            '200': {
                description: 'Doctor.Patient PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Patient, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Patient))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DoctorPatientController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/doctors/{id}/patients', {
        responses: {
            '200': {
                description: 'Doctor.Patient DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Patient))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DoctorPatientController.prototype, "delete", null);
exports.DoctorPatientController = DoctorPatientController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.DoctorRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DoctorRepository])
], DoctorPatientController);
//# sourceMappingURL=doctor-patient.controller.js.map