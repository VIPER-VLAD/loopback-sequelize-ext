"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopedTask = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
/**
 * Simplified Entity used for testing settings "scope" functionality
 */
let ScopedTask = class ScopedTask extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.ScopedTask = ScopedTask;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], ScopedTask.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ScopedTask.prototype, "title", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], ScopedTask.prototype, "completed", void 0);
exports.ScopedTask = ScopedTask = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            scope: {
                limit: 1,
                where: {
                    completed: false,
                },
            },
        },
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], ScopedTask);
//# sourceMappingURL=scoped-task.model.js.map