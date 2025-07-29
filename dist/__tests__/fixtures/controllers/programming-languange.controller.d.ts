import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { ProgrammingLanguage } from '../models';
import { ProgrammingLanguageRepository } from '../repositories';
export declare class ProgrammingLanguangeController {
    programmingLanguageRepository: ProgrammingLanguageRepository;
    constructor(programmingLanguageRepository: ProgrammingLanguageRepository);
    create(programmingLanguage: Omit<ProgrammingLanguage, 'id'>): Promise<ProgrammingLanguage>;
    createAll(programmingLanguages: Array<Omit<ProgrammingLanguage, 'id'>>): Promise<ProgrammingLanguage[]>;
    count(where?: Where<ProgrammingLanguage>): Promise<Count>;
    find(filter?: Filter<ProgrammingLanguage>): Promise<ProgrammingLanguage[]>;
    updateAll(programmingLanguage: ProgrammingLanguage, where?: Where<ProgrammingLanguage>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<ProgrammingLanguage>): Promise<ProgrammingLanguage>;
    updateById(id: number, programmingLanguage: ProgrammingLanguage): Promise<void>;
    replaceById(id: number, programmingLanguage: ProgrammingLanguage): Promise<void>;
    deleteById(id: number): Promise<void>;
}
