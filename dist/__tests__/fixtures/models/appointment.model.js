"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Appointment = class Appointment extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Appointment = Appointment;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Appointment.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Appointment.prototype, "doctorId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Appointment.prototype, "patientId", void 0);
exports.Appointment = Appointment = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Appointment);
//# sourceMappingURL=appointment.model.js.map