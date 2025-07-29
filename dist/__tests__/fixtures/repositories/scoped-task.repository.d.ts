import { SequelizeCrudRepository } from '../../../sequelize';
import { PrimaryDataSource } from '../datasources/primary.datasource';
import { ScopedTask, ScopedTaskRelations } from '../models/index';
/**
 * Simplified repository used for testing Model settings "scope" functionality
 */
export declare class ScopedTaskRepository extends SequelizeCrudRepository<ScopedTask, typeof ScopedTask.prototype.id, ScopedTaskRelations> {
    constructor(dataSource: PrimaryDataSource);
    protected getDefaultFnRegistry(): {
        customAlias: () => number;
    };
}
