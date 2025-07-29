import { LifeCycleObserver } from '@loopback/core';
import { SequelizeDataSource, SequelizeDataSourceConfig } from '../../../sequelize';
export declare const config: SequelizeDataSourceConfig;
export declare class SecondaryDataSource extends SequelizeDataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: SequelizeDataSourceConfig;
    constructor(dsConfig?: SequelizeDataSourceConfig);
}
