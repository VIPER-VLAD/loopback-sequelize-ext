import { ScopedTaskRepository } from '../repositories';
import { TestControllerBase } from './test.controller.base';
export declare class ScopedTaskController extends TestControllerBase {
    scopedTaskRepository: ScopedTaskRepository;
    constructor(scopedTaskRepository: ScopedTaskRepository);
    syncSequelizeModel(): Promise<void>;
}
