import { Entity } from '@loopback/repository';
export declare class ProgrammingLanguage extends Entity {
    id?: number;
    name: string;
    secret: string;
    constructor(data?: Partial<ProgrammingLanguage>);
}
export interface ProgrammingLanguageRelations {
}
export type ProgrammingLanguageWithRelations = ProgrammingLanguage & ProgrammingLanguageRelations;
