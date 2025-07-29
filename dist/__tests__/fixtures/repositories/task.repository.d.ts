import { SequelizeCrudRepository } from '../../../sequelize';
import { PrimaryDataSource } from '../datasources/primary.datasource';
import { Task, TaskRelations } from '../models/index';
export declare class TaskRepository extends SequelizeCrudRepository<Task, typeof Task.prototype.id, TaskRelations> {
    constructor(dataSource: PrimaryDataSource);
    protected getDefaultFnRegistry(): {
        customAlias: () => number;
    };
}
