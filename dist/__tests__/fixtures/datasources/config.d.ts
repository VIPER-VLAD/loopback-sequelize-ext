import { SequelizeDataSourceConfig } from '../../../sequelize';
type AvailableConfig = Record<'postgresql' | 'sqlite3', SequelizeDataSourceConfig>;
export declare const datasourceTestConfig: Record<'primary' | 'secondary' | 'url' | 'wrongPassword', AvailableConfig>;
export {};
