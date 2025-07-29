"use strict";
// Copyright LoopBack contributors 2022. All Rights Reserved.
// Node module: @loopback/sequelize
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopbackSequelizeComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const keys_1 = require("./keys");
const types_1 = require("./types");
// Configure the binding for LoopbackSequelizeComponent
let LoopbackSequelizeComponent = class LoopbackSequelizeComponent {
    constructor(application, options = types_1.DEFAULT_LOOPBACK_SEQUELIZE_OPTIONS) {
        this.application = application;
        this.options = options;
    }
};
exports.LoopbackSequelizeComponent = LoopbackSequelizeComponent;
exports.LoopbackSequelizeComponent = LoopbackSequelizeComponent = tslib_1.__decorate([
    (0, core_1.injectable)({
        tags: {
            [core_1.ContextTags.KEY]: keys_1.LoopbackSequelizeComponentBindings.COMPONENT,
        },
    }),
    tslib_1.__param(0, (0, core_1.inject)(core_1.CoreBindings.APPLICATION_INSTANCE)),
    tslib_1.__param(1, (0, core_1.config)()),
    tslib_1.__metadata("design:paramtypes", [core_1.Application, Object])
], LoopbackSequelizeComponent);
//# sourceMappingURL=component.js.map