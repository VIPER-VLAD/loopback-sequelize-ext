"use strict";
// Copyright LoopBack contributors 2022. All Rights Reserved.
// Node module: @loopback/sequelize
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionPoolOptions = exports.poolingEnabledConnectors = exports.poolConfigKeys = exports.SupportedConnectorMapping = void 0;
/**
 * @key Loopback connectors name supported by this extension
 * @value Equivalent Dialect in Sequelize
 */
exports.SupportedConnectorMapping = {
    mysql: 'mysql',
    postgresql: 'postgres',
    oracle: 'oracle',
    sqlite3: 'sqlite',
    db2: 'db2',
    mssql: 'mssql',
};
/**
 * Loopback uses different keys for pool options depending on the connector.
 */
exports.poolConfigKeys = [
    // mysql
    'connectionLimit',
    'acquireTimeout',
    // postgresql
    'min',
    'max',
    'idleTimeoutMillis',
    // oracle
    'minConn',
    'maxConn',
    'timeout',
];
exports.poolingEnabledConnectors = [
    'mysql',
    'oracle',
    'postgresql',
];
exports.ConnectionPoolOptions = {
    mysql: {
        max: 'connectionLimit',
        acquire: 'acquireTimeout',
    },
    postgresql: {
        min: 'min',
        max: 'max',
        idle: 'idleTimeoutMillis',
    },
    oracle: {
        min: 'minConn',
        max: 'maxConn',
        idle: 'timeout',
    },
};
//# sourceMappingURL=connector-mapping.js.map