"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const todo_list_model_1 = require("./todo-list.model");
let Todo = class Todo extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
exports.Todo = Todo;
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Todo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Todo.prototype, "title", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        name: 'is_complete',
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], Todo.prototype, "isComplete", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => todo_list_model_1.TodoList, {
        keyTo: 'id',
        keyFrom: 'todoListId',
        name: 'todoList',
    }, {
        name: 'todo_list_id',
    }),
    tslib_1.__metadata("design:type", Number)
], Todo.prototype, "todoListId", void 0);
exports.Todo = Todo = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Todo);
//# sourceMappingURL=todo.model.js.map