import { SequelizeCrudRepository } from '../../../sequelize';
import { PrimaryDataSource } from '../datasources/primary.datasource';
import { Roles, RolesRelations } from '../models';
export declare class RolesRepository extends SequelizeCrudRepository<Roles, typeof Roles.prototype.id, RolesRelations> {
    constructor(dataSource: PrimaryDataSource);
}
