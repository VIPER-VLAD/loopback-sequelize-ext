"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Roles = class Roles extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Roles = Roles;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", String)
], Roles.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'string',
        required: true,
        postgresql: {
            dataType: 'varchar[]',
        },
    }),
    tslib_1.__metadata("design:type", Array)
], Roles.prototype, "permissions", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Roles.prototype, "description", void 0);
exports.Roles = Roles = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Roles);
//# sourceMappingURL=roles.model.js.map