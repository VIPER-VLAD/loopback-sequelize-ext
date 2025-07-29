import { SequelizeCrudRepository } from '../../../sequelize';
import { SecondaryDataSource } from '../datasources/secondary.datasource';
import { Product, ProductRelations } from '../models';
export declare class ProductRepository extends SequelizeCrudRepository<Product, typeof Product.prototype.id, ProductRelations> {
    constructor(dataSource: SecondaryDataSource);
}
