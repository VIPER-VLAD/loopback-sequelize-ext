import { LifeCycleObserver } from '@loopback/core';
import { AnyObject, Command, NamedParameters, Options, PositionalParameters } from '@loopback/repository';
import { PoolOptions, Sequelize, Options as SequelizeOptions, Transaction, TransactionOptions } from 'sequelize';
import { SupportedLoopbackConnectors } from './connector-mapping';
/**
 * Sequelize DataSource Class
 */
export declare class SequelizeDataSource implements LifeCycleObserver {
    config: SequelizeDataSourceConfig;
    name: string;
    settings: {};
    constructor(config: SequelizeDataSourceConfig);
    sequelize: Sequelize;
    sequelizeConfig: SequelizeOptions;
    /**
     * Gets the flag indicating whether to parse JSON columns.
     * If the `parseJsonColumns` property is set in the configuration, its value will be returned.
     * Otherwise, it returns `true` if the dialect is MySQL, `false` otherwise.
     *
     * @returns {boolean} The flag indicating whether to parse JSON columns.
     */
    get parseJsonColumns(): boolean;
    init(): Promise<void>;
    start(..._injectedArgs: unknown[]): Promise<void>;
    stop(): Promise<void>;
    automigrate(): void;
    autoupdate(): void;
    /**
     * Begin a new transaction.
     *
     * @param [options] Options {isolationLevel: '...'}
     * @returns A promise which resolves to a Sequelize Transaction object
     */
    beginTransaction(options?: TransactionOptions | TransactionOptions['isolationLevel']): Promise<Transaction>;
    /**
     * Execute a SQL command.
     *
     * **WARNING:** In general, it is always better to perform database actions
     * through repository methods. Directly executing SQL may lead to unexpected
     * results, corrupted data, security vulnerabilities and other issues.
     *
     * @example
     *
     * ```ts
     * // MySQL
     * const result = await db.execute(
     *   'SELECT * FROM Products WHERE size > ?',
     *   [42]
     * );
     *
     * // PostgreSQL
     * const result = await db.execute(
     *   'SELECT * FROM Products WHERE size > $1',
     *   [42]
     * );
     * ```
     *
     * @param command A parameterized SQL command or query.
     * @param parameters List of parameter values to use.
     * @param options Additional options, for example `transaction`.
     * @returns A promise which resolves to the command output. The output type (data structure) is database specific and
     * often depends on the command executed.
     */
    execute(command: Command, parameters?: NamedParameters | PositionalParameters, options?: Options): Promise<AnyObject>;
    getPoolOptions(): PoolOptions | undefined;
}
export type SequelizeDataSourceConfig = {
    name?: string;
    user?: string;
    connector?: SupportedLoopbackConnectors;
    url?: string;
    /**
     * Whether or not to parse the JSON data stored in database columns.
     *
     * For dialects that do not support a native JSON type, we need to parse
     * string column values to JSON objects to preserve backwards compatibility with the Juggler ORM.
     * Example: https://github.com/loopbackio/loopback-connector-mysql/blob/edf176b09234b82796f925203ff006843e045498/lib/mysql.js#L476
     *
     * With Sequelize v6, some of the dialects like MariaDB and SQLite already parse JSON strings to JSON objects by default:
     * - https://github.com/sequelize/sequelize/blob/cb8ea88c9aa37b14c908fd34dff1afc603de2ea7/src/dialects/mariadb/query.js#L191
     * - https://github.com/sequelize/sequelize/blob/cb8ea88c9aa37b14c908fd34dff1afc603de2ea7/src/dialects/sqlite/query.js#L365
     *
     * Defaults to true for MySQL and false for other dialects.
     */
    parseJsonColumns?: boolean;
    /**
     * Additional sequelize options that are passed directly to
     * Sequelize when initializing the connection.
     * Any options provided in this way will take priority over
     * other configurations that may come from parsing the loopback style configurations.
     *
     * eg.
     * ```ts
     * let config = {
     *   name: 'db',
     *   connector: 'postgresql',
     *   sequelizeOptions: {
     *      dialectOptions: {
     *        rejectUnauthorized: false,
     *        ca: fs.readFileSync('/path/to/root.crt').toString(),
     *      }
     *   }
     * };
     * ```
     */
    sequelizeOptions?: SequelizeOptions;
} & AnyObject;
