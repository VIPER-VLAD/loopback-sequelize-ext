"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Task = class Task extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Task = Task;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Task.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Task.prototype, "title", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        defaultFn: 'uuid',
    }),
    tslib_1.__metadata("design:type", String)
], Task.prototype, "uuidv1", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        defaultFn: 'uuidv4',
    }),
    tslib_1.__metadata("design:type", String)
], Task.prototype, "uuidv4", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        defaultFn: 'shortid',
    }),
    tslib_1.__metadata("design:type", String)
], Task.prototype, "shortId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        defaultFn: 'nanoid',
    }),
    tslib_1.__metadata("design:type", String)
], Task.prototype, "nanoId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        defaultFn: 'customAlias',
    }),
    tslib_1.__metadata("design:type", Number)
], Task.prototype, "customAlias", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: Date,
        defaultFn: 'now',
    }),
    tslib_1.__metadata("design:type", Date)
], Task.prototype, "createdAt", void 0);
exports.Task = Task = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Task);
//# sourceMappingURL=task.model.js.map