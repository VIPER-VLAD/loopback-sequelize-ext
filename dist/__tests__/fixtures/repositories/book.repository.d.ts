import { Getter } from '@loopback/core';
import { BelongsToAccessor } from '@loopback/repository';
import { SequelizeCrudRepository } from '../../../sequelize';
import { PrimaryDataSource } from '../datasources/primary.datasource';
import { Book, BookRelations, Category } from '../models/index';
import { CategoryRepository } from './category.repository';
export declare class BookRepository extends SequelizeCrudRepository<Book, typeof Book.prototype.id, BookRelations> {
    protected categoryRepositoryGetter: Getter<CategoryRepository>;
    readonly category: BelongsToAccessor<Category, typeof Book.prototype.id>;
    constructor(dataSource: PrimaryDataSource, categoryRepositoryGetter: Getter<CategoryRepository>);
}
