import { Getter } from '@loopback/core';
import { ReferencesManyAccessor } from '@loopback/repository';
import { SequelizeCrudRepository } from '../../../sequelize';
import { PrimaryDataSource } from '../datasources/primary.datasource';
import { Developer, DeveloperRelations, ProgrammingLanguage } from '../models/index';
import { ProgrammingLanguageRepository } from './programming-language.repository';
export declare class DeveloperRepository extends SequelizeCrudRepository<Developer, typeof Developer.prototype.id, DeveloperRelations> {
    protected programmingLanguageRepositoryGetter: Getter<ProgrammingLanguageRepository>;
    readonly programmingLanguages: ReferencesManyAccessor<ProgrammingLanguage, typeof Developer.prototype.id>;
    constructor(dataSource: PrimaryDataSource, programmingLanguageRepositoryGetter: Getter<ProgrammingLanguageRepository>);
}
