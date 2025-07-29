"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgrammingLanguage = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let ProgrammingLanguage = class ProgrammingLanguage extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.ProgrammingLanguage = ProgrammingLanguage;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], ProgrammingLanguage.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ProgrammingLanguage.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        hidden: true,
    }),
    tslib_1.__metadata("design:type", String)
], ProgrammingLanguage.prototype, "secret", void 0);
exports.ProgrammingLanguage = ProgrammingLanguage = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], ProgrammingLanguage);
//# sourceMappingURL=programming-language.model.js.map