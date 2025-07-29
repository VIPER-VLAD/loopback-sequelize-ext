"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeDataSource = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const sequelize_1 = require("sequelize");
const connector_mapping_1 = require("./connector-mapping");
const debug = (0, debug_1.default)('loopback:sequelize:datasource');
const queryLogging = (0, debug_1.default)('loopback:sequelize:queries');
/**
 * Sequelize DataSource Class
 */
class SequelizeDataSource {
    constructor(config) {
        var _a;
        this.config = config;
        this.settings = {};
        if (this.config.connector &&
            !(this.config.connector in connector_mapping_1.SupportedConnectorMapping)) {
            throw new Error(`Specified connector ${(_a = this.config.connector) !== null && _a !== void 0 ? _a : this.config.dialect} is not supported.`);
        }
        const { connector, file, schema, database, host, port, user, username, password, tns, } = config;
        this.sequelizeConfig = {
            database,
            dialect: connector ? connector_mapping_1.SupportedConnectorMapping[connector] : undefined,
            storage: file,
            host,
            port,
            schema,
            username: user !== null && user !== void 0 ? user : username,
            password,
            logging: queryLogging,
            pool: this.getPoolOptions(),
            dialectOptions: {
                connectString: tns, // oracle connect string
            },
            ...config.sequelizeOptions,
        };
        if (config.url) {
            this.sequelize = new sequelize_1.Sequelize(config.url, this.sequelizeConfig);
        }
        else {
            this.sequelize = new sequelize_1.Sequelize(this.sequelizeConfig);
        }
    }
    /**
     * Gets the flag indicating whether to parse JSON columns.
     * If the `parseJsonColumns` property is set in the configuration, its value will be returned.
     * Otherwise, it returns `true` if the dialect is MySQL, `false` otherwise.
     *
     * @returns {boolean} The flag indicating whether to parse JSON columns.
     */
    get parseJsonColumns() {
        var _a;
        if (typeof ((_a = this.config) === null || _a === void 0 ? void 0 : _a.parseJsonColumns) === 'boolean') {
            return this.config.parseJsonColumns;
        }
        return this.sequelizeConfig.dialect === 'mysql';
    }
    async init() {
        await this.sequelize.authenticate();
        debug('Connection has been established successfully.');
    }
    async start(..._injectedArgs) { }
    async stop() {
        var _a;
        await ((_a = this.sequelize) === null || _a === void 0 ? void 0 : _a.close());
    }
    automigrate() {
        throw new Error('SequelizeDataSourceError: Migrations are not supported. Use `db-migrate` package instead.');
    }
    autoupdate() {
        throw new Error('SequelizeDataSourceError: Migrations are not supported. Use `db-migrate` package instead.');
    }
    /**
     * Begin a new transaction.
     *
     * @param [options] Options {isolationLevel: '...'}
     * @returns A promise which resolves to a Sequelize Transaction object
     */
    async beginTransaction(options) {
        var _a;
        /**
         * Default Isolation level for transactions is `READ_COMMITTED`, to be consistent with loopback default.
         * See: https://loopback.io/doc/en/lb4/Using-database-transactions.html#isolation-levels
         */
        const DEFAULT_ISOLATION_LEVEL = sequelize_1.Transaction.ISOLATION_LEVELS.READ_COMMITTED;
        if (typeof options === 'string') {
            // Received `isolationLevel` as the first argument
            options = {
                isolationLevel: options,
            };
        }
        else if (options === undefined) {
            options = {
                isolationLevel: DEFAULT_ISOLATION_LEVEL,
            };
        }
        else {
            options.isolationLevel =
                (_a = options.isolationLevel) !== null && _a !== void 0 ? _a : DEFAULT_ISOLATION_LEVEL;
        }
        return this.sequelize.transaction(options);
    }
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
    async execute(command, parameters, options) {
        if (!this.sequelize) {
            throw Error(`The datasource "${this.name}" doesn't have sequelize instance bound to it.`);
        }
        if (typeof command !== 'string') {
            command = JSON.stringify(command);
        }
        options = options !== null && options !== void 0 ? options : {};
        const queryOptions = {};
        if (options === null || options === void 0 ? void 0 : options.transaction) {
            queryOptions.transaction = options.transaction;
        }
        let targetReplacementKey;
        // By default, we'll use 'bind'
        targetReplacementKey = 'bind';
        if (command.includes('?')) {
            // If command has '?', use 'replacements'
            targetReplacementKey = 'replacements';
        }
        else if (/\$\w/g.test(command)) {
            // If command has parameters starting with a dollar sign ($param or $1, $2), use 'bind'
            targetReplacementKey = 'bind';
        }
        if (parameters) {
            queryOptions[targetReplacementKey] = parameters;
        }
        const result = await this.sequelize.query(command, queryOptions);
        // Sequelize returns the select query result in an array at index 0 and at index 1 is the actual Result instance
        // Whereas in juggler it is returned directly as plain array.
        // Below condition maps that 0th index to final result to match juggler's behaviour
        if (command.match(/^(select|\(select)/i) && result.length >= 1) {
            return result[0];
        }
        return result;
    }
    getPoolOptions() {
        const config = this.config;
        const specifiedPoolOptions = Object.keys(config).some(key => connector_mapping_1.poolConfigKeys.includes(key));
        const supportsPooling = config.connector &&
            connector_mapping_1.poolingEnabledConnectors.includes(config.connector);
        if (!(supportsPooling && specifiedPoolOptions)) {
            return;
        }
        const optionMapping = connector_mapping_1.ConnectionPoolOptions[config.connector];
        if (!optionMapping) {
            return;
        }
        const { min, max, acquire, idle } = optionMapping;
        const options = {};
        if (max && config[max]) {
            options.max = config[max];
        }
        if (min && config[min]) {
            options.min = config[min];
        }
        if (acquire && config[acquire]) {
            options.acquire = config[acquire];
        }
        if (idle && config[idle]) {
            options.idle = config[idle];
        }
        return options;
    }
}
exports.SequelizeDataSource = SequelizeDataSource;
//# sourceMappingURL=sequelize.datasource.base.js.map