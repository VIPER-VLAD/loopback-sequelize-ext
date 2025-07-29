"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const appointment_model_1 = require("./appointment.model");
const patient_model_1 = require("./patient.model");
let Doctor = class Doctor extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Doctor = Doctor;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Doctor.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Doctor.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => patient_model_1.Patient, {
        through: {
            model: () => appointment_model_1.Appointment,
            keyFrom: 'doctorId',
            keyTo: 'patientId',
        },
    }),
    tslib_1.__metadata("design:type", Array)
], Doctor.prototype, "patients", void 0);
exports.Doctor = Doctor = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Doctor);
//# sourceMappingURL=doctor.model.js.map