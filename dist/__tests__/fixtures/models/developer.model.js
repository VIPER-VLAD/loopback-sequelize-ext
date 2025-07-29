"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Developer = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const programming_language_model_1 = require("./programming-language.model");
let Developer = class Developer extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Developer = Developer;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Developer.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Developer.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.referencesMany)(() => programming_language_model_1.ProgrammingLanguage, {}, {
        type: ['string'],
        postgresql: { dataType: 'varchar[]' },
    }),
    tslib_1.__metadata("design:type", Array)
], Developer.prototype, "programmingLanguageIds", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        hidden: true,
    }),
    tslib_1.__metadata("design:type", String)
], Developer.prototype, "apiSecret", void 0);
exports.Developer = Developer = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Developer);
//# sourceMappingURL=developer.model.js.map