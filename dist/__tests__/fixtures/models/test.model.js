"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = exports.Event = exports.eventTableName = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
exports.eventTableName = 'tbl_event';
let Event = class Event extends repository_1.Entity {
    // No properties are needed, This model is just used for testing the table names
    constructor(data) {
        super(data);
    }
};
exports.Event = Event;
exports.Event = Event = tslib_1.__decorate([
    (0, repository_1.model)({
        name: exports.eventTableName,
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Event);
let Box = class Box extends repository_1.Entity {
    // No properties are needed, This model is just used for testing the table names
    constructor(data) {
        super(data);
    }
};
exports.Box = Box;
exports.Box = Box = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Box);
//# sourceMappingURL=test.model.js.map