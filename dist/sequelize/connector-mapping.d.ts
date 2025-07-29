import { Dialect as AllSequelizeDialects, PoolOptions } from 'sequelize';
export type SupportedLoopbackConnectors = 'mysql' | 'postgresql' | 'oracle' | 'sqlite3' | 'db2' | 'mssql';
/**
 * @key Loopback connectors name supported by this extension
 * @value Equivalent Dialect in Sequelize
 */
export declare const SupportedConnectorMapping: {
    [key in SupportedLoopbackConnectors]?: AllSequelizeDialects;
};
/**
 * Loopback uses different keys for pool options depending on the connector.
 */
export declare const poolConfigKeys: readonly ["connectionLimit", "acquireTimeout", "min", "max", "idleTimeoutMillis", "minConn", "maxConn", "timeout"];
export type LoopbackPoolConfigKey = (typeof poolConfigKeys)[number];
export type PoolingEnabledConnector = Exclude<SupportedLoopbackConnectors, 'db2' | 'sqlite3'>;
export declare const poolingEnabledConnectors: PoolingEnabledConnector[];
type IConnectionPoolOptions = {
    [connectorName in PoolingEnabledConnector]?: {
        [sequelizePoolOption in keyof PoolOptions]: LoopbackPoolConfigKey;
    };
};
export declare const ConnectionPoolOptions: IConnectionPoolOptions;
export {};
