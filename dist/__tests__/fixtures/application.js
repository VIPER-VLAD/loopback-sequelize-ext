"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeSandboxApplication = void 0;
const boot_1 = require("@loopback/boot");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
class SequelizeSandboxApplication extends (0, boot_1.BootMixin)((0, repository_1.RepositoryMixin)(rest_1.RestApplication)) {
    constructor(options = {}) {
        super(options);
        this.projectRoot = __dirname;
    }
}
exports.SequelizeSandboxApplication = SequelizeSandboxApplication;
//# sourceMappingURL=application.js.map