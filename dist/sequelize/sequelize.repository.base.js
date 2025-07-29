"use strict";
// Copyright LoopBack contributors 2022. All Rights Reserved.
// Node module: @loopback/sequelize
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeCrudRepository = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const debug_1 = tslib_1.__importDefault(require("debug"));
const nanoid_1 = require("nanoid");
const sequelize_1 = require("sequelize");
const operator_translation_1 = require("./operator-translation");
const utils_1 = require("./utils");
const debug = (0, debug_1.default)('loopback:sequelize:repository');
const debugModelBuilder = (0, debug_1.default)('loopback:sequelize:modelbuilder');
/**
 * Sequelize implementation of CRUD repository to be used with default loopback entities
 * and SequelizeDataSource for SQL Databases
 */
class SequelizeCrudRepository {
    constructor(entityClass, dataSource) {
        this.entityClass = entityClass;
        this.dataSource = dataSource;
        /**
         * Default `order` filter style if only column name is specified
         */
        this.DEFAULT_ORDER_STYLE = 'ASC';
        /**
         * Object keys used in models for set database specific settings.
         * Example: In model property definition one can use postgresql dataType as float
         * `{
         *   type: 'number',
         *   postgresql: {
         *     dataType: 'float',
         *     precision: 20,
         *     scale: 4,
         *   },
         * }`
         *
         * This array of keys is used while building model definition for sequelize.
         */
        this.DB_SPECIFIC_SETTINGS_KEYS = [
            'postgresql',
            'mysql',
            'sqlite3',
        ];
        /**
         * Length of the `nanoid` generated for defaultFn's `shortid` and `nanoid` aliases.
         */
        this.NANO_ID_LENGTH = 9;
        /**
         * The alias registry for `defaultFn` option used in model property definition.
         *
         * See: https://loopback.io/doc/en/lb4/Model.html#property-decorator
         */
        this.defaultFnRegistry = {
            guid: sequelize_1.DataTypes.UUIDV1,
            uuid: sequelize_1.DataTypes.UUIDV1,
            uuidv4: sequelize_1.DataTypes.UUIDV4,
            now: sequelize_1.DataTypes.NOW,
            shortid: () => (0, nanoid_1.nanoid)(this.NANO_ID_LENGTH),
            nanoid: () => (0, nanoid_1.nanoid)(this.NANO_ID_LENGTH),
        };
        this.inclusionResolvers = new Map();
        if (this.dataSource.sequelize) {
            this.sequelizeModel = this.getSequelizeModel();
        }
    }
    getDefaultFnRegistry() {
        return this.defaultFnRegistry;
    }
    async create(entity, options) {
        const data = await this.sequelizeModel.create(entity, options);
        return new this.entityClass(data.toJSON());
    }
    async createAll(entities, options) {
        const models = await this.sequelizeModel.bulkCreate(entities, options);
        return this.toEntities(models);
    }
    exists(id, _options) {
        return new Promise((resolve, reject) => {
            this.sequelizeModel
                .findByPk(id)
                .then(value => {
                resolve(!!value);
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    async save(entity, options) {
        const id = this.entityClass.getIdOf(entity);
        if (id == null) {
            return this.create(entity, options);
        }
        else {
            await this.replaceById(id, entity, options);
            return new this.entityClass(entity.toObject());
        }
    }
    update(entity, options) {
        return this.updateById(entity.getId(), entity, options);
    }
    async updateById(id, data, options) {
        if (id === undefined) {
            throw new Error('Invalid Argument: id cannot be undefined');
        }
        const idProp = this.entityClass.definition.idProperties()[0];
        const where = {};
        where[idProp] = id;
        const result = await this.updateAll(data, where, options);
        if (result.count === 0) {
            // as MySQL didn't provide affected rows when the values are same as what database have
            if (this.dataSource.sequelizeConfig.dialect === 'mysql') {
                await this.findById(id);
            }
            else {
                throw new repository_1.EntityNotFoundError(this.entityClass, id);
            }
        }
    }
    async updateAll(data, where, options) {
        const [affectedCount] = await this.sequelizeModel.update(Object.assign({}, data), {
            where: this.buildSequelizeWhere(where),
            ...options,
        });
        return { count: affectedCount };
    }
    async delete(entity, options) {
        return this.deleteById(entity.getId(), options);
    }
    async find(filter, options) {
        var _a;
        const data = await this.sequelizeModel.findAll({
            include: this.buildSequelizeIncludeFilter(filter === null || filter === void 0 ? void 0 : filter.include),
            where: this.buildSequelizeWhere(filter === null || filter === void 0 ? void 0 : filter.where),
            attributes: this.buildSequelizeAttributeFilter(filter === null || filter === void 0 ? void 0 : filter.fields),
            order: this.buildSequelizeOrder(filter === null || filter === void 0 ? void 0 : filter.order),
            limit: filter === null || filter === void 0 ? void 0 : filter.limit,
            offset: (_a = filter === null || filter === void 0 ? void 0 : filter.offset) !== null && _a !== void 0 ? _a : filter === null || filter === void 0 ? void 0 : filter.skip,
            ...options,
        });
        return this.includeReferencesIfRequested(data, this.entityClass, filter === null || filter === void 0 ? void 0 : filter.include);
    }
    async findOne(filter, options) {
        var _a;
        const data = await this.sequelizeModel.findOne({
            include: this.buildSequelizeIncludeFilter(filter === null || filter === void 0 ? void 0 : filter.include),
            where: this.buildSequelizeWhere(filter === null || filter === void 0 ? void 0 : filter.where),
            attributes: this.buildSequelizeAttributeFilter(filter === null || filter === void 0 ? void 0 : filter.fields),
            order: this.buildSequelizeOrder(filter === null || filter === void 0 ? void 0 : filter.order),
            offset: (_a = filter === null || filter === void 0 ? void 0 : filter.offset) !== null && _a !== void 0 ? _a : filter === null || filter === void 0 ? void 0 : filter.skip,
            ...options,
        });
        if (data === null) {
            return Promise.resolve(null);
        }
        const resolved = await this.includeReferencesIfRequested([data], this.entityClass, filter === null || filter === void 0 ? void 0 : filter.include);
        return resolved[0];
    }
    async findById(id, filter, options) {
        var _a;
        const data = await this.sequelizeModel.findByPk(id, {
            order: this.buildSequelizeOrder(filter === null || filter === void 0 ? void 0 : filter.order),
            attributes: this.buildSequelizeAttributeFilter(filter === null || filter === void 0 ? void 0 : filter.fields),
            include: this.buildSequelizeIncludeFilter(filter === null || filter === void 0 ? void 0 : filter.include),
            limit: filter === null || filter === void 0 ? void 0 : filter.limit,
            offset: (_a = filter === null || filter === void 0 ? void 0 : filter.offset) !== null && _a !== void 0 ? _a : filter === null || filter === void 0 ? void 0 : filter.skip,
            ...options,
        });
        if (!data) {
            throw new repository_1.EntityNotFoundError(this.entityClass, id);
        }
        const resolved = await this.includeReferencesIfRequested([data], this.entityClass, filter === null || filter === void 0 ? void 0 : filter.include);
        return resolved[0];
    }
    async replaceById(id, data, options) {
        const idProp = this.entityClass.definition.idProperties()[0];
        if (idProp in data) {
            delete data[idProp];
        }
        await this.updateById(id, data, options);
    }
    async deleteAll(where, options) {
        const count = await this.sequelizeModel.destroy({
            where: this.buildSequelizeWhere(where),
            ...options,
        });
        return { count };
    }
    async deleteById(id, options) {
        const idProp = this.entityClass.definition.idProperties()[0];
        if (id === undefined) {
            throw new Error(`Invalid Argument: ${idProp} cannot be undefined`);
        }
        const where = {};
        where[idProp] = id;
        const count = await this.sequelizeModel.destroy({
            where: this.buildSequelizeWhere(where),
            ...options,
        });
        if (count === 0) {
            throw new repository_1.EntityNotFoundError(this.entityClass, id);
        }
    }
    async count(where, options) {
        const count = await this.sequelizeModel.count({
            where: this.buildSequelizeWhere(where),
            ...options,
        });
        return { count };
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
     * const result = await repo.execute(
     *   'SELECT * FROM Products WHERE size > ?',
     *   [42]
     * );
     *
     * // PostgreSQL
     * const result = await repo.execute(
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
        return this.dataSource.execute(command, parameters, options);
    }
    toEntities(models) {
        return models.map(m => new this.entityClass(m.toJSON()));
    }
    /**
     * Get Sequelize Operator
     * @param key Name of the operator used in loopback eg. lt
     * @returns Equivalent operator symbol if available in Sequelize eg `Op.lt`
     */
    getSequelizeOperator(key) {
        const sequelizeOperator = operator_translation_1.operatorTranslations[key];
        if (!sequelizeOperator) {
            throw Error(`There is no equivalent operator for "${key}" in sequelize.`);
        }
        return sequelizeOperator;
    }
    /**
     * Get Sequelize `attributes` filter value from `fields` of loopback.
     * @param fields Loopback styles `fields` options. eg. `["name", "age"]`, `{ id: false }`
     * @returns Sequelize Compatible Object/Array based on the fields provided. eg. `{ "exclude": ["id"] }`
     */
    buildSequelizeAttributeFilter(fields) {
        var _a, _b;
        if (fields === undefined) {
            return undefined;
        }
        if (Array.isArray(fields)) {
            // Both (sequelize and loopback filters) consider array as "only columns to include"
            return fields;
        }
        const sequelizeFields = {
            include: [],
            exclude: [],
        };
        // Push column having `false` values in `exclude` key and columns
        // having `true` in `include` key
        if ((0, utils_1.isTruelyObject)(fields)) {
            for (const key in fields) {
                if (fields[key] === true) {
                    (_a = sequelizeFields.include) === null || _a === void 0 ? void 0 : _a.push(key);
                }
                else if (fields[key] === false) {
                    (_b = sequelizeFields.exclude) === null || _b === void 0 ? void 0 : _b.push(key);
                }
            }
        }
        if (Array.isArray(sequelizeFields.include) &&
            sequelizeFields.include.length > 0) {
            delete sequelizeFields.exclude;
            return sequelizeFields.include;
        }
        if (Array.isArray(sequelizeFields.exclude) &&
            sequelizeFields.exclude.length > 0) {
            delete sequelizeFields.include;
        }
        return sequelizeFields;
    }
    /**
     * Get Sequelize Order filter value from loopback style order value.
     *
     * It also supports passing associations in the order array to sort by nested models. Example: `["user email ASC"]`.
     *
     * @see https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/#ordering-eager-loaded-associations
     *
     * @param order Sorting order in loopback style filter. eg. `title ASC`, `["id DESC", "age ASC"]`
     * @returns Sequelize compatible order filter value
     */
    buildSequelizeOrder(order) {
        if (order === undefined || order === '') {
            return undefined;
        }
        const parseOrderItem = (orderStr) => {
            const [columnName, ...rest] = orderStr.trim().split(' ');
            if (rest.length === 0) {
                return [columnName, this.DEFAULT_ORDER_STYLE];
            }
            return [columnName, ...rest];
        };
        if (typeof order === 'string') {
            return [parseOrderItem(order)];
        }
        return order.map(parseOrderItem);
    }
    /**
     * Checks if the resolver of the inclusion relation is registered
     * in the inclusionResolver of the current repository
     *
     * @param include - LoopBack Inclusion filter
     */
    isInclusionAllowed(include) {
        const relationName = typeof include === 'string' ? include : include.relation;
        if (!relationName) {
            return false;
        }
        const allowed = this.inclusionResolvers.has(relationName);
        return allowed;
    }
    /**
     * Build Sequelize compatible `include` filter
     * @param inclusionFilters - loopback style `where` condition
     * @param sourceModel - sequelize model instance
     * @returns Sequelize compatible `Includeable` array
     */
    buildSequelizeIncludeFilter(inclusionFilters, sourceModel) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        if (!inclusionFilters || inclusionFilters.length === 0) {
            return [];
        }
        if (!sourceModel) {
            sourceModel = this.sequelizeModel;
        }
        if (sourceModel === this.sequelizeModel) {
            const invalidInclusions = inclusionFilters.filter(inclusionFilter => !this.isInclusionAllowed(inclusionFilter));
            if (invalidInclusions.length) {
                const msg = 'Invalid "filter.include" entries: ' +
                    invalidInclusions
                        .map(inclusionFilter => JSON.stringify(inclusionFilter))
                        .join('; ');
                const err = new Error(msg);
                Object.assign(err, {
                    code: 'INVALID_INCLUSION_FILTER',
                    statusCode: 400,
                });
                throw err;
            }
        }
        const includable = [];
        for (const filter of inclusionFilters) {
            if (typeof filter === 'string') {
                if (filter in sourceModel.associations) {
                    includable.push(filter);
                }
                else {
                    debug(`Relation '${filter}' is not available in sequelize model associations. If it's referencesMany relation it will fallback to loopback inclusion resolver.`);
                }
            }
            else if (typeof filter === 'object') {
                if (!(filter.relation in sourceModel.associations)) {
                    debug(`Relation '${filter.relation}' is not available in sequelize model associations. If it's referencesMany relation it will fallback to loopback inclusion resolver.`);
                    continue;
                }
                const targetAssociation = sourceModel.associations[filter.relation];
                includable.push({
                    model: targetAssociation.target,
                    /**
                     * Exclude through model data from response to be backward compatible
                     * with loopback response style for hasMany through relation.
                     * Does not work with sqlite3
                     */
                    ...(targetAssociation.associationType === 'BelongsToMany' &&
                        targetAssociation.isMultiAssociation
                        ? { through: { attributes: [] } }
                        : {}),
                    where: this.buildSequelizeWhere((_a = filter.scope) === null || _a === void 0 ? void 0 : _a.where),
                    limit: (_c = (_b = filter.scope) === null || _b === void 0 ? void 0 : _b.totalLimit) !== null && _c !== void 0 ? _c : (_d = filter.scope) === null || _d === void 0 ? void 0 : _d.limit,
                    attributes: this.buildSequelizeAttributeFilter((_e = filter.scope) === null || _e === void 0 ? void 0 : _e.fields),
                    include: this.buildSequelizeIncludeFilter((_f = filter.scope) === null || _f === void 0 ? void 0 : _f.include, targetAssociation.target),
                    order: this.buildSequelizeOrder((_g = filter.scope) === null || _g === void 0 ? void 0 : _g.order),
                    as: filter.relation,
                    /**
                     * If true, uses an inner join, which means that the parent model will only be loaded if it has any matching children.
                     */
                    required: !!filter.required,
                    /**
                     * saperate: true is required for `order` and `limit` filter to work, it runs include in saperate queries
                     */
                    separate: !!((_h = filter.scope) === null || _h === void 0 ? void 0 : _h.order) ||
                        !!((_k = (_j = filter.scope) === null || _j === void 0 ? void 0 : _j.totalLimit) !== null && _k !== void 0 ? _k : (_l = filter.scope) === null || _l === void 0 ? void 0 : _l.limit),
                });
            }
        }
        return includable;
    }
    /**
     * Build Sequelize compatible where condition object
     * @param where loopback style `where` condition
     * @returns Sequelize compatible where options to be used in queries
     */
    buildSequelizeWhere(where) {
        if (!where) {
            return {};
        }
        const sequelizeWhere = {};
        /**
         * Handle model attribute conditions like `{ age: { gt: 18 } }`, `{ email: "a@b.c" }`
         * Transform Operators - eg. `{ gt: 0, lt: 10 }` to `{ [Op.gt]: 0, [Op.lt]: 10 }`
         */
        for (const columnName in where) {
            const conditionValue = (where[columnName]);
            // Ignoring undefined values for backwards compatibility with Loopback Juggler ORM API
            if (typeof conditionValue === 'undefined') {
                continue;
            }
            const entityClassCol = this.entityClass.definition.properties[columnName];
            const isBooleanColumn = entityClassCol && entityClassCol.type === 'boolean';
            if ((0, utils_1.isTruelyObject)(conditionValue)) {
                sequelizeWhere[columnName] = {};
                for (const lb4Operator of Object.keys(conditionValue)) {
                    const sequelizeOperator = this.getSequelizeOperator(lb4Operator);
                    if (isBooleanColumn) {
                        // Handles boolean column conditions like `{ neq: true }` or `{ eq: false }`
                        sequelizeWhere[columnName][sequelizeOperator] = (0, utils_1.castToBoolean)(conditionValue[lb4Operator]);
                    }
                    else {
                        sequelizeWhere[columnName][sequelizeOperator] =
                            conditionValue[lb4Operator];
                    }
                }
            }
            else if (['and', 'or'].includes(columnName) &&
                Array.isArray(conditionValue)) {
                /**
                 * Eg. {and: [{title: 'My Post'}, {content: 'Hello'}]}
                 */
                const sequelizeOperator = this.getSequelizeOperator(columnName);
                const conditions = conditionValue.map((condition) => {
                    return this.buildSequelizeWhere(condition);
                });
                Object.assign(sequelizeWhere, {
                    [sequelizeOperator]: conditions,
                });
            }
            else {
                // Equals operation. Casting boolean columns to avoid passing strings as boolean values
                // to the Sequelize query builders.
                sequelizeWhere[columnName] = {
                    [sequelize_1.Op.eq]: isBooleanColumn
                        ? (0, utils_1.castToBoolean)(conditionValue)
                        : conditionValue,
                };
            }
        }
        return sequelizeWhere;
    }
    /**
     * Get Sequelize Model
     * @returns Sequelize Model Instance based on the definitions from `entityClass`
     */
    getSequelizeModel(entityClass = this.entityClass) {
        if (!this.dataSource.sequelize) {
            throw Error(`The datasource "${this.dataSource.name}" doesn't have sequelize instance bound to it.`);
        }
        if (this.dataSource.sequelize.models[entityClass.modelName]) {
            // Model Already Defined by Sequelize before
            return this.dataSource.sequelize.models[entityClass.modelName];
        }
        // TODO: Make it more flexible, check support of all possible definition props
        const sourceModel = this.dataSource.sequelize.define(entityClass.modelName, this.getSequelizeModelAttributes(entityClass.definition.properties), {
            timestamps: false,
            tableName: this.getTableName(entityClass),
            freezeTableName: true,
            // Set up optional default scope: https://sequelize.org/docs/v6/other-topics/scopes/#definition
            defaultScope: entityClass.definition.settings.scope,
        });
        // Setup associations
        for (const key in entityClass.definition.relations) {
            const targetModel = this.getSequelizeModel(entityClass.definition.relations[key].target());
            debugModelBuilder(`Setting up relation`, entityClass.definition.relations[key]);
            if (entityClass.definition.relations[key].type ===
                repository_1.RelationType.belongsTo) {
                const relationDefinition = entityClass.definition.relations[key];
                const foreignKey = relationDefinition.keyFrom;
                const targetKey = relationDefinition.keyTo;
                sourceModel.belongsTo(targetModel, {
                    foreignKey: { name: foreignKey },
                    targetKey,
                    // Which client will pass on in loopback style include filter, eg. `include: ["thisName"]`
                    as: entityClass.definition.relations[key].name,
                });
            }
            else if (entityClass.definition.relations[key].type ===
                repository_1.RelationType.hasOne) {
                const foreignKey = entityClass.definition.relations[key].keyTo;
                sourceModel.hasOne(targetModel, {
                    foreignKey: foreignKey,
                    as: entityClass.definition.relations[key].name,
                });
            }
            else if (entityClass.definition.relations[key].type ===
                repository_1.RelationType.hasMany) {
                const relationDefinition = entityClass.definition.relations[key];
                const through = relationDefinition.through;
                const foreignKey = relationDefinition.keyTo;
                if (through) {
                    const keyTo = through.keyTo;
                    const keyFrom = through.keyFrom;
                    // Setup hasMany through
                    const throughModel = this.getSequelizeModel(through.model());
                    sourceModel.belongsToMany(targetModel, {
                        through: { model: throughModel },
                        otherKey: keyTo,
                        foreignKey: keyFrom,
                        as: entityClass.definition.relations[key].name,
                    });
                }
                else {
                    sourceModel.hasMany(targetModel, {
                        foreignKey: foreignKey,
                        as: entityClass.definition.relations[key].name,
                    });
                }
            }
        }
        debugModelBuilder('Table name supplied to sequelize'.concat(`"${entityClass.modelName.toLowerCase()}"`));
        return sourceModel;
    }
    /**
     * This function retrieves the table name associated with a given entity class.
     * Different loopback connectors have different conventions for picking up table names,
     * unless the name is specified in the @model decorator.
     *
     * The function follows the following cases to determine the table name:
     * - It checks if the name property is specified in the @model decorator and uses it. (this takes precedence over all other cases)
     * - If the dialect of the dataSource is PostgreSQL, it uses the lowercased version of the model class name.
     * - If the dialect is MySQL or any other dialect, it uses the default model class name.
     * @param {Entity} entityClass - The entity class for which the table name is being retrieved.
     * @returns {string} - The table name associated with the entity class. Which is used when performing the query.
     */
    getTableName(entityClass = this.entityClass) {
        let tableName = entityClass.name; // model class name
        if (entityClass.definition.name !== tableName) {
            // name is specified in decorator
            tableName = entityClass.definition.name;
        }
        else if (this.dataSource.sequelizeConfig.dialect === 'postgres') {
            // postgres is being used and name is not specified in @model decorator
            tableName = entityClass.modelName.toLowerCase();
        }
        return tableName;
    }
    /**
     * Run CREATE TABLE query for the target sequelize model, Useful for quick testing
     * @param options Sequelize Sync Options
     */
    async syncSequelizeModel(options = {}) {
        if (!this.dataSource.sequelize) {
            throw new Error('Sequelize instance is not attached to the datasource yet.');
        }
        await this.dataSource.sequelize.authenticate();
        await this.dataSource.sequelize.models[this.entityClass.modelName].sync(options);
    }
    /**
     * Run CREATE TABLE query for the all sequelize models, Useful for quick testing
     * @param options Sequelize Sync Options
     */
    async syncLoadedSequelizeModels(options = {}) {
        var _a;
        await ((_a = this.dataSource.sequelize) === null || _a === void 0 ? void 0 : _a.sync(options));
    }
    /**
     * Get Sequelize Model Attributes
     * @param definition property definition received from loopback entityClass eg. `{ id: { type: "Number", id: true } }`
     * @returns model attributes supported in sequelize model definiotion
     *
     * TODO: Verify all possible loopback types https://loopback.io/doc/en/lb4/LoopBack-types.html
     */
    getSequelizeModelAttributes(definition) {
        var _a, _b;
        debugModelBuilder('loopback model definition', definition);
        const sequelizeDefinition = {};
        for (const propName in definition) {
            // Set data type, defaults to `DataTypes.STRING`
            let dataType = sequelize_1.DataTypes.STRING;
            const isString = definition[propName].type === String ||
                ['String', 'string'].includes(definition[propName].type.toString());
            if (definition[propName].type === Number ||
                ['Number', 'number'].includes(definition[propName].type.toString())) {
                dataType = sequelize_1.DataTypes.INTEGER;
                // handle float
                for (const dbKey of this.DB_SPECIFIC_SETTINGS_KEYS) {
                    if (!(dbKey in definition[propName])) {
                        continue;
                    }
                    const dbSpecificSetting = definition[propName][dbKey];
                    if (['double precision', 'float', 'real'].includes(dbSpecificSetting.dataType)) {
                        // TODO: Handle precision
                        dataType = sequelize_1.DataTypes.FLOAT;
                    }
                }
            }
            if (definition[propName].type === Boolean ||
                ['Boolean', 'boolean'].includes(definition[propName].type.toString())) {
                dataType = sequelize_1.DataTypes.BOOLEAN;
            }
            if (definition[propName].type === Array ||
                ['Array', 'array'].includes(definition[propName].type.toString())) {
                // Postgres only
                if (this.dataSource.sequelizeConfig.dialect === 'postgres') {
                    const stringTypeArray = definition[propName].itemType === String ||
                        ['String', 'string'].includes(((_a = definition[propName].itemType) === null || _a === void 0 ? void 0 : _a.toString()) || '');
                    dataType = stringTypeArray
                        ? sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING)
                        : sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER);
                }
                else {
                    dataType = sequelize_1.DataTypes.JSON;
                }
            }
            if (definition[propName].type === Object ||
                ['object', 'Object'].includes(definition[propName].type.toString())) {
                // Postgres only, JSON dataType
                dataType = sequelize_1.DataTypes.JSON;
            }
            if (definition[propName].type === Date ||
                ['date', 'Date'].includes(definition[propName].type.toString())) {
                dataType = sequelize_1.DataTypes.DATE;
            }
            if (dataType === sequelize_1.DataTypes.STRING && !isString) {
                throw Error(`Unhandled DataType "${definition[propName].type.toString()}" for column "${propName}" in sequelize extension`);
            }
            let defaultValue = definition[propName].default;
            const originalDefaultFn = definition[propName]['defaultFn'];
            if (typeof originalDefaultFn === 'function') {
                defaultValue = originalDefaultFn;
            }
            else if (originalDefaultFn in this.getDefaultFnRegistry()) {
                defaultValue = this.getDefaultFnRegistry()[originalDefaultFn];
            }
            const columnOptions = {
                type: dataType,
                defaultValue,
            };
            // Set column as `primaryKey` when id is set to true (which is loopback way to define primary key)
            if (definition[propName].id === true) {
                if (columnOptions.type === sequelize_1.DataTypes.NUMBER) {
                    columnOptions.type = sequelize_1.DataTypes.INTEGER;
                }
                Object.assign(columnOptions, {
                    primaryKey: true,
                    /**
                     * `autoIncrement` needs to be true even if DataType is not INTEGER else it will pass the ID in the query set to NULL.
                     */
                    autoIncrement: !!definition[propName].generated,
                });
            }
            // For dialects that do not support a native JSON type, we need to parse
            // string responses to JSON objects to preserve backwards compatibility with the Juggler ORM.
            if (this.dataSource.parseJsonColumns === true &&
                dataType === sequelize_1.DataTypes.JSON) {
                // See: https://sequelize.org/docs/v6/core-concepts/getters-setters-virtuals/
                columnOptions.get = function getValue() {
                    const value = this.getDataValue(propName);
                    if (typeof value === 'string') {
                        try {
                            return JSON.parse(value);
                        }
                        catch (_error) {
                            return null;
                        }
                    }
                    return value;
                };
            }
            // TODO: Get the column name casing using actual methods / conventions used in different sql connectors for loopback
            columnOptions.field =
                (_b = definition[propName]['name']) !== null && _b !== void 0 ? _b : propName.toLowerCase();
            sequelizeDefinition[propName] = columnOptions;
        }
        debugModelBuilder('Sequelize model definition', sequelizeDefinition);
        return sequelizeDefinition;
    }
    /**
     * Remove hidden properties specified in model from response body. (See:  https://github.com/sourcefuse/loopback4-sequelize/issues/3)
     * @param entity normalized entity. You can use `entity.toJSON()`'s value
     * @returns normalized entity excluding the hiddenProperties
     *
     * @deprecated To exclude hidden props from an entity instance, call the `.toJSON()` method on it.
     * Alternatively it can be use by manually instantiating the model using `new EntityClass(data).toJSON()`.
     *
     * This function will be removed in next major release.
     */
    excludeHiddenProps(entity) {
        const hiddenProps = this.entityClass.definition.settings.hiddenProperties;
        if (!hiddenProps) {
            return entity;
        }
        for (const propertyName of hiddenProps) {
            delete entity[propertyName];
        }
        return entity;
    }
    /**
     * Include related entities of `@referencesMany` relation
     *
     * referencesMany relation is NOT handled by `sequelizeModel.findAll` as it doesn't have any direct alternative to it,
     * so to include relation data of referencesMany, we're manually fetching related data requested
     *
     * @param parentEntities source table data
     * @param filter actual payload passed in request
     * @param parentEntityClass loopback entity class for the parent entity
     * @returns entities with related models in them
     */
    async includeReferencesIfRequested(parentEntities, parentEntityClass, inclusionFilters) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (!parentEntityClass) {
            parentEntityClass = this.entityClass;
        }
        let parentEntityInstances = parentEntities.map(sequelizeModel => new this.entityClass(sequelizeModel.toJSON()));
        /**
         * All columns names defined in model with `@referencesMany`
         */
        const allReferencesColumns = [];
        for (const key in parentEntityClass.definition.relations) {
            if (parentEntityClass.definition.relations[key].type ===
                repository_1.RelationType.referencesMany) {
                const loopbackRelationObject = parentEntityClass.definition.relations[key];
                if (loopbackRelationObject.keyFrom) {
                    allReferencesColumns.push(loopbackRelationObject.keyFrom);
                }
            }
        }
        /**
         * Transform related entities queried through relations into their corresponding Loopback models.
         * This ensures hidden properties defined in the nested Loopback models are excluded from the response.
         * @see https://loopback.io/doc/en/lb4/Model.html#hidden-properties
         */
        function transformRelatedEntitiesToLoopbackModels(entities, entityClass) {
            entities.forEach(entity => {
                for (const key in entityClass.definition.relations) {
                    const relation = entityClass.definition.relations[key];
                    if (relation && relation.name in entity) {
                        try {
                            const TargetLoopbackModel = relation.target();
                            const relatedEntityOrEntities = entity[relation.name];
                            if (Array.isArray(relatedEntityOrEntities)) {
                                Object.assign(entity, {
                                    [relation.name]: relatedEntityOrEntities.map(relatedEntity => {
                                        const safeCopy = { ...relatedEntity };
                                        return new TargetLoopbackModel(safeCopy);
                                    }),
                                });
                            }
                            else {
                                const safeCopy = { ...relatedEntityOrEntities };
                                // Handles belongsTo relation which does not include a list of entities
                                Object.assign(entity, {
                                    [relation.name]: new TargetLoopbackModel(safeCopy),
                                });
                            }
                        }
                        catch (error) {
                            debug(`Error while transforming relation to Loopback model for relation: ${relation.name}`, error);
                        }
                    }
                }
            });
        }
        transformRelatedEntitiesToLoopbackModels(parentEntityInstances, parentEntityClass);
        // Validate data type of items in any column having references
        // For eg. convert ["1", "2"] into [1, 2] if `itemType` specified is `number[]`
        parentEntityInstances = parentEntityInstances.map(entity => {
            const data = entity;
            for (const columnName in data) {
                if (!allReferencesColumns.includes(columnName)) {
                    // Column is not the one used for referencesMany relation. Eg. "programmingLanguageIds"
                    continue;
                }
                const columnDefinition = parentEntityClass.definition.properties[columnName];
                if (columnDefinition.type !== Array ||
                    !Array.isArray(data[columnName])) {
                    // Column type or data received is not array, wrong configuration/data
                    continue;
                }
                // Loop over all references in array received
                const items = data[columnName];
                for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
                    if (columnDefinition.itemType === Number &&
                        typeof items[itemIndex] === 'string') {
                        items[itemIndex] = parseInt(items[itemIndex]);
                    }
                }
                data[columnName] = items;
            }
            return data;
        });
        // Requested inclusions of referencesMany relation
        const referencesManyInclusions = [];
        for (let includeFilter of inclusionFilters !== null && inclusionFilters !== void 0 ? inclusionFilters : []) {
            if (typeof includeFilter === 'string') {
                includeFilter = { relation: includeFilter };
            }
            const relationName = includeFilter.relation;
            const relation = parentEntityClass.definition.relations[relationName];
            if (relation.type === repository_1.RelationType.referencesMany) {
                referencesManyInclusions.push({
                    filter: includeFilter,
                    definition: relation,
                    keys: [],
                });
            }
        }
        if (referencesManyInclusions.length === 0) {
            return parentEntityInstances;
        }
        for (const relation of referencesManyInclusions) {
            parentEntityInstances.forEach(entity => {
                if (!relation.definition.keyFrom) {
                    return;
                }
                const columnValue = entity[relation.definition.keyFrom];
                if (Array.isArray(columnValue)) {
                    relation.keys.push(...columnValue);
                }
                else if (typeof columnValue === 'string' && columnValue.length > 0) {
                    relation.keys.push(...columnValue.split(','));
                }
                else {
                    // column value holding references keys isn't an array nor a string
                    debug(`Column "${relation.definition.keyFrom}"'s value holding references keys isn't an array for ${JSON.stringify(entity)}, Can't fetch related models.`);
                }
            });
            relation.keys = [...new Set(relation.keys)];
            const foreignKey = (_a = relation.definition.keyTo) !== null && _a !== void 0 ? _a : relation.definition.target().definition.idProperties()[0];
            // Strictly include primary key in attributes
            const attributesToFetch = this.buildSequelizeAttributeFilter((_b = relation.filter.scope) === null || _b === void 0 ? void 0 : _b.fields);
            let includeForeignKeyInResponse = false;
            if (attributesToFetch !== undefined) {
                if (Array.isArray(attributesToFetch)) {
                    if (attributesToFetch.includes(foreignKey)) {
                        includeForeignKeyInResponse = true;
                    }
                    else {
                        attributesToFetch.push(foreignKey);
                    }
                }
                else if (Array.isArray(attributesToFetch.include)) {
                    if (attributesToFetch.include.includes(foreignKey)) {
                        includeForeignKeyInResponse = true;
                    }
                    else {
                        attributesToFetch.include.push(foreignKey);
                    }
                }
            }
            else {
                includeForeignKeyInResponse = true;
            }
            const targetLoopbackModel = relation.definition.target();
            const targetSequelizeModel = this.getSequelizeModel(targetLoopbackModel);
            const sequelizeData = await targetSequelizeModel.findAll({
                where: {
                    // eg. id: { [Op.in]: [1,2,4,8] }
                    [foreignKey]: {
                        [sequelize_1.Op.in]: relation.keys,
                    },
                    ...this.buildSequelizeWhere((_c = relation.filter.scope) === null || _c === void 0 ? void 0 : _c.where),
                },
                attributes: attributesToFetch,
                include: this.buildSequelizeIncludeFilter((_d = relation.filter.scope) === null || _d === void 0 ? void 0 : _d.include, targetSequelizeModel),
                order: this.buildSequelizeOrder((_e = relation.filter.scope) === null || _e === void 0 ? void 0 : _e.order),
                limit: (_g = (_f = relation.filter.scope) === null || _f === void 0 ? void 0 : _f.totalLimit) !== null && _g !== void 0 ? _g : (_h = relation.filter.scope) === null || _h === void 0 ? void 0 : _h.limit,
                offset: (_k = (_j = relation.filter.scope) === null || _j === void 0 ? void 0 : _j.offset) !== null && _k !== void 0 ? _k : (_l = relation.filter.scope) === null || _l === void 0 ? void 0 : _l.skip,
            });
            const childModelData = await this.includeReferencesIfRequested(sequelizeData, targetLoopbackModel, (_m = relation.filter.scope) === null || _m === void 0 ? void 0 : _m.include);
            parentEntityInstances.forEach(entity => {
                const foreignKeys = entity[relation.definition.keyFrom];
                const filteredChildModels = childModelData.filter(childModel => {
                    if (Array.isArray(foreignKeys)) {
                        return foreignKeys === null || foreignKeys === void 0 ? void 0 : foreignKeys.includes(childModel[foreignKey]);
                    }
                    else {
                        return true;
                    }
                });
                Object.assign(entity, {
                    [relation.definition.name]: filteredChildModels.map(filteredChildModel => {
                        const safeCopy = { ...filteredChildModel };
                        if (includeForeignKeyInResponse === false) {
                            delete safeCopy[foreignKey];
                        }
                        return new targetLoopbackModel(safeCopy);
                    }),
                });
            });
        }
        return parentEntityInstances;
    }
    /**
     * Register an inclusion resolver for the related model name.
     *
     * @param relationName - Name of the relation defined on the source model
     * @param resolver - Resolver function for getting related model entities
     */
    registerInclusionResolver(relationName, resolver) {
        this.inclusionResolvers.set(relationName, resolver);
    }
    /**
     * Function to create a constrained relation repository factory
     *
     * @example
     * ```ts
     * class CustomerRepository extends SequelizeCrudRepository<
     *   Customer,
     *   typeof Customer.prototype.id,
     *   CustomerRelations
     * > {
     *   public readonly orders: HasManyRepositoryFactory<Order, typeof Customer.prototype.id>;
     *
     *   constructor(
     *     protected db: SequelizeDataSource,
     *     orderRepository: EntityCrudRepository<Order, typeof Order.prototype.id>,
     *   ) {
     *     super(Customer, db);
     *     this.orders = this.createHasManyRepositoryFactoryFor(
     *       'orders',
     *       orderRepository,
     *     );
     *   }
     * }
     * ```
     *
     * @param relationName - Name of the relation defined on the source model
     * @param targetRepo - Target repository instance
     */
    createHasManyRepositoryFactoryFor(relationName, targetRepositoryGetter) {
        const meta = this.entityClass.definition.relations[relationName];
        return (0, repository_1.createHasManyRepositoryFactory)(meta, targetRepositoryGetter);
    }
    /**
     * Function to create a belongs to accessor
     *
     * @param relationName - Name of the relation defined on the source model
     * @param targetRepo - Target repository instance
     */
    createBelongsToAccessorFor(relationName, targetRepositoryGetter) {
        const meta = this.entityClass.definition.relations[relationName];
        return (0, repository_1.createBelongsToAccessor)(meta, targetRepositoryGetter, this);
    }
    /**
     * Function to create a constrained hasOne relation repository factory
     *
     * @param relationName - Name of the relation defined on the source model
     * @param targetRepo - Target repository instance
     */
    createHasOneRepositoryFactoryFor(relationName, targetRepositoryGetter) {
        const meta = this.entityClass.definition.relations[relationName];
        return (0, repository_1.createHasOneRepositoryFactory)(meta, targetRepositoryGetter);
    }
    /**
     * Function to create a constrained hasManyThrough relation repository factory
     *
     * @example
     * ```ts
     * class CustomerRepository extends SequelizeCrudRepository<
     *   Customer,
     *   typeof Customer.prototype.id,
     *   CustomerRelations
     * > {
     *   public readonly cartItems: HasManyRepositoryFactory<CartItem, typeof Customer.prototype.id>;
     *
     *   constructor(
     *     protected db: SequelizeDataSource,
     *     cartItemRepository: EntityCrudRepository<CartItem, typeof, CartItem.prototype.id>,
     *     throughRepository: EntityCrudRepository<Through, typeof Through.prototype.id>,
     *   ) {
     *     super(Customer, db);
     *     this.cartItems = this.createHasManyThroughRepositoryFactoryFor(
     *       'cartItems',
     *       cartItemRepository,
     *     );
     *   }
     * }
     * ```
     *
     * @param relationName - Name of the relation defined on the source model
     * @param targetRepo - Target repository instance
     * @param throughRepo - Through repository instance
     */
    createHasManyThroughRepositoryFactoryFor(relationName, targetRepositoryGetter, throughRepositoryGetter) {
        const meta = this.entityClass.definition.relations[relationName];
        return (0, repository_1.createHasManyThroughRepositoryFactory)(meta, targetRepositoryGetter, throughRepositoryGetter);
    }
    /**
     * Function to create a references many accessor
     *
     * @param relationName - Name of the relation defined on the source model
     * @param targetRepo - Target repository instance
     */
    createReferencesManyAccessorFor(relationName, targetRepoGetter) {
        const meta = this.entityClass.definition.relations[relationName];
        return (0, repository_1.createReferencesManyAccessor)(meta, targetRepoGetter, this);
    }
    async beginTransaction(options) {
        return this.dataSource.beginTransaction(options);
    }
}
exports.SequelizeCrudRepository = SequelizeCrudRepository;
//# sourceMappingURL=sequelize.repository.base.js.map