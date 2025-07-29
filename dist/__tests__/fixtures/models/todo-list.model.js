"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoList = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const todo_model_1 = require("./todo.model");
const user_model_1 = require("./user.model");
let TodoList = class TodoList extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.TodoList = TodoList;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], TodoList.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], TodoList.prototype, "title", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => todo_model_1.Todo, {
        keyTo: 'todoListId',
    }),
    tslib_1.__metadata("design:type", Array)
], TodoList.prototype, "todos", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => user_model_1.User, {
        keyTo: 'id',
        keyFrom: 'userId',
    }, {
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], TodoList.prototype, "userId", void 0);
exports.TodoList = TodoList = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], TodoList);
//# sourceMappingURL=todo-list.model.js.map