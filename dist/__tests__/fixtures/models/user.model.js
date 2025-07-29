"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Address = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const todo_list_model_1 = require("./todo-list.model");
let Address = class Address extends repository_1.Entity {
};
exports.Address = Address;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "city", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Address.prototype, "zipCode", void 0);
exports.Address = Address = tslib_1.__decorate([
    (0, repository_1.model)()
], Address);
let User = class User extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.User = User;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    repository_1.property.array('string', {
        name: 'phone_numbers',
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "phoneNumbers", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        default: false,
        name: 'is_active',
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "active", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'object',
        postgresql: {
            dataType: 'json',
        },
    }),
    tslib_1.__metadata("design:type", Address)
], User.prototype, "address", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        hidden: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "dob", void 0);
tslib_1.__decorate([
    (0, repository_1.hasOne)(() => todo_list_model_1.TodoList, { keyTo: 'userId' }),
    tslib_1.__metadata("design:type", todo_list_model_1.TodoList)
], User.prototype, "todoList", void 0);
exports.User = User = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], User);
//# sourceMappingURL=user.model.js.map