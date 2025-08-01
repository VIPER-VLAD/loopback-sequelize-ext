"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Patient = class Patient extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Patient = Patient;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Patient.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Patient.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        hidden: true,
    }),
    tslib_1.__metadata("design:type", String)
], Patient.prototype, "password", void 0);
exports.Patient = Patient = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Patient);
//# sourceMappingURL=patient.model.js.map