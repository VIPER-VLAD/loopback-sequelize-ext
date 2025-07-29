import { SequelizeCrudRepository } from '../../../sequelize';
import { PrimaryDataSource } from '../datasources/primary.datasource';
import { ProgrammingLanguage, ProgrammingLanguageRelations } from '../models/index';
export declare class ProgrammingLanguageRepository extends SequelizeCrudRepository<ProgrammingLanguage, typeof ProgrammingLanguage.prototype.id, ProgrammingLanguageRelations> {
    constructor(dataSource: PrimaryDataSource);
}
