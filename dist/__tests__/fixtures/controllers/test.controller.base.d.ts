import { AnyObject } from '@loopback/repository';
export declare abstract class TestControllerBase {
    repositories: AnyObject[];
    constructor(...repositories: AnyObject[]);
    /**
     * `beforeEach` is only for testing purposes in the controller,
     * Calling `syncSequelizeModel` ensures that corresponding table
     * exists before calling the function. In real project you are supposed
     * to run migrations instead, to sync model definitions to the target database.
     */
    beforeEach(options?: {
        syncAll?: boolean;
    }): Promise<void>;
}
