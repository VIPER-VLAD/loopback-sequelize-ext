import { SequelizeCrudRepository } from '../../../sequelize';
import { PrimaryDataSource } from '../datasources/primary.datasource';
import { Category, CategoryRelations } from '../models/index';
export declare class CategoryRepository extends SequelizeCrudRepository<Category, typeof Category.prototype.id, CategoryRelations> {
    constructor(dataSource: PrimaryDataSource);
}
