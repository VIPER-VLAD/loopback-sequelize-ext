"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestObserver = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const repositories_1 = require("../repositories");
/**
 * Test observer for validating that the Sequelize repositories are available in Loopback Observers during server startup.
 */
let TestObserver = class TestObserver {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async start() {
        try {
            await this.userRepository.find();
        }
        catch (error) {
            // For the repository tests, the database schema is not created until after the server is initialized:
            // extensions/sequelize/src/__tests__/integration/repository.integration.ts
            if (!error.message.includes('no such table: User')) {
                throw error;
            }
        }
    }
};
exports.TestObserver = TestObserver;
exports.TestObserver = TestObserver = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)('test'),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository])
], TestObserver);
//# sourceMappingURL=test.observer.js.map