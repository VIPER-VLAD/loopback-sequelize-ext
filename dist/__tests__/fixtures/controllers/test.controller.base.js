"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestControllerBase = void 0;
class TestControllerBase {
    constructor(...repositories) {
        this.repositories = repositories;
    }
    /**
     * `beforeEach` is only for testing purposes in the controller,
     * Calling `syncSequelizeModel` ensures that corresponding table
     * exists before calling the function. In real project you are supposed
     * to run migrations instead, to sync model definitions to the target database.
     */
    async beforeEach(options = {}) {
        const syncOptions = { force: true };
        for (const repository of this.repositories) {
            if (options.syncAll) {
                await repository.syncLoadedSequelizeModels(syncOptions);
                continue;
            }
            await repository.syncSequelizeModel(syncOptions);
        }
    }
}
exports.TestControllerBase = TestControllerBase;
//# sourceMappingURL=test.controller.base.js.map