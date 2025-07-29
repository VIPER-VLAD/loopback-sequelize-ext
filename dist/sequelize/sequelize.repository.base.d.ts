import { AnyObject, BelongsToAccessor, Command, Count, DataObject, Entity, EntityCrudRepository, Fields, Filter, Getter, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, HasOneRepositoryFactory, Inclusion, InclusionFilter, InclusionResolver, NamedParameters, Options, PositionalParameters, PropertyDefinition, ReferencesManyAccessor, Where } from '@loopback/repository';
import { Attributes, FindAttributeOptions, Includeable, Model, ModelAttributes, ModelStatic, Order, SyncOptions, Transaction, TransactionOptions, WhereOptions } from 'sequelize';
import { operatorTranslations } from './operator-translation';
import { SequelizeDataSource } from './sequelize.datasource.base';
import { SequelizeModel } from './sequelize.model';
interface InclusionWithRequired extends Inclusion {
    /**
     * Setting this option to true will result in an inner join query that
     * explicitly requires the specified condition for the child model.
     *
     * @see https://loopback.io/pages/en/lb4/readmes/loopback-next/extensions/sequelize/#inner-join
     */
    required?: boolean;
}
type InclusionFilterWithRequired = string | InclusionWithRequired;
interface FilterWithRequired<T extends object> extends Filter<T> {
    include?: InclusionFilterWithRequired[];
}
type FilterWithRequiredExcludingWhere<T extends object> = Omit<FilterWithRequired<T>, 'where'>;
/**
 * Sequelize implementation of CRUD repository to be used with default loopback entities
 * and SequelizeDataSource for SQL Databases
 */
export declare class SequelizeCrudRepository<T extends Entity, ID, Relations extends object = {}> implements EntityCrudRepository<T, ID, Relations> {
    entityClass: typeof Entity & {
        prototype: T;
    };
    dataSource: SequelizeDataSource;
    constructor(entityClass: typeof Entity & {
        prototype: T;
    }, dataSource: SequelizeDataSource);
    /**
     * Default `order` filter style if only column name is specified
     */
    readonly DEFAULT_ORDER_STYLE = "ASC";
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
    readonly DB_SPECIFIC_SETTINGS_KEYS: readonly ["postgresql", "mysql", "sqlite3"];
    /**
     * Length of the `nanoid` generated for defaultFn's `shortid` and `nanoid` aliases.
     */
    NANO_ID_LENGTH: number;
    /**
     * The alias registry for `defaultFn` option used in model property definition.
     *
     * See: https://loopback.io/doc/en/lb4/Model.html#property-decorator
     */
    protected defaultFnRegistry: Record<string, unknown>;
    protected getDefaultFnRegistry(): Record<string, unknown>;
    readonly inclusionResolvers: Map<string, InclusionResolver<T, Entity>>;
    /**
     * Sequelize Model Instance created from the model definition received from the `entityClass`
     */
    sequelizeModel: ModelStatic<Model<T>>;
    create(entity: DataObject<T>, options?: AnyObject): Promise<T>;
    createAll(entities: DataObject<T>[], options?: AnyObject): Promise<T[]>;
    exists(id: ID, _options?: AnyObject): Promise<boolean>;
    save(entity: T, options?: AnyObject): Promise<T>;
    update(entity: T, options?: AnyObject): Promise<void>;
    updateById(id: ID, data: DataObject<T>, options?: AnyObject): Promise<void>;
    updateAll(data: DataObject<T>, where?: Where<T>, options?: AnyObject): Promise<Count>;
    delete(entity: T, options?: AnyObject): Promise<void>;
    find(filter?: FilterWithRequired<T>, options?: AnyObject): Promise<(T & Relations)[]>;
    findOne(filter?: FilterWithRequired<T>, options?: AnyObject): Promise<(T & Relations) | null>;
    findById(id: ID, filter?: FilterWithRequiredExcludingWhere<T>, options?: AnyObject): Promise<T & Relations>;
    replaceById(id: ID, data: DataObject<T>, options?: AnyObject | undefined): Promise<void>;
    deleteAll(where?: Where<T> | undefined, options?: AnyObject | undefined): Promise<Count>;
    deleteById(id: ID, options?: AnyObject | undefined): Promise<void>;
    count(where?: Where<T>, options?: AnyObject): Promise<Count>;
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
    execute(command: Command, parameters?: NamedParameters | PositionalParameters, options?: Options): Promise<AnyObject>;
    protected toEntities(models: Model<T, T>[]): T[];
    /**
     * Get Sequelize Operator
     * @param key Name of the operator used in loopback eg. lt
     * @returns Equivalent operator symbol if available in Sequelize eg `Op.lt`
     */
    protected getSequelizeOperator(key: keyof typeof operatorTranslations): symbol;
    /**
     * Get Sequelize `attributes` filter value from `fields` of loopback.
     * @param fields Loopback styles `fields` options. eg. `["name", "age"]`, `{ id: false }`
     * @returns Sequelize Compatible Object/Array based on the fields provided. eg. `{ "exclude": ["id"] }`
     */
    protected buildSequelizeAttributeFilter(fields?: Fields): FindAttributeOptions | undefined;
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
    protected buildSequelizeOrder(order?: string[] | string): Order | undefined;
    /**
     * Checks if the resolver of the inclusion relation is registered
     * in the inclusionResolver of the current repository
     *
     * @param include - LoopBack Inclusion filter
     */
    protected isInclusionAllowed(include: InclusionFilter): boolean;
    /**
     * Build Sequelize compatible `include` filter
     * @param inclusionFilters - loopback style `where` condition
     * @param sourceModel - sequelize model instance
     * @returns Sequelize compatible `Includeable` array
     */
    protected buildSequelizeIncludeFilter(inclusionFilters?: Array<InclusionFilter & {
        required?: boolean;
    }>, sourceModel?: ModelStatic<Model<T>>): Includeable[];
    /**
     * Build Sequelize compatible where condition object
     * @param where loopback style `where` condition
     * @returns Sequelize compatible where options to be used in queries
     */
    protected buildSequelizeWhere<MT extends T>(where?: Where<MT>): WhereOptions<MT>;
    /**
     * Get Sequelize Model
     * @returns Sequelize Model Instance based on the definitions from `entityClass`
     */
    getSequelizeModel(entityClass?: typeof Entity & {
        prototype: T;
    }): import("sequelize").ModelCtor<Model<any, any>>;
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
    getTableName(entityClass?: typeof Entity & {
        prototype: T;
    }): string;
    /**
     * Run CREATE TABLE query for the target sequelize model, Useful for quick testing
     * @param options Sequelize Sync Options
     */
    syncSequelizeModel(options?: SyncOptions): Promise<void>;
    /**
     * Run CREATE TABLE query for the all sequelize models, Useful for quick testing
     * @param options Sequelize Sync Options
     */
    syncLoadedSequelizeModels(options?: SyncOptions): Promise<void>;
    /**
     * Get Sequelize Model Attributes
     * @param definition property definition received from loopback entityClass eg. `{ id: { type: "Number", id: true } }`
     * @returns model attributes supported in sequelize model definiotion
     *
     * TODO: Verify all possible loopback types https://loopback.io/doc/en/lb4/LoopBack-types.html
     */
    protected getSequelizeModelAttributes(definition: {
        [name: string]: PropertyDefinition;
    }): ModelAttributes<SequelizeModel, Attributes<SequelizeModel>>;
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
    protected excludeHiddenProps(entity: T & Relations): T & Relations;
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
    protected includeReferencesIfRequested(parentEntities: Model<T, T>[], parentEntityClass: typeof Entity, inclusionFilters?: InclusionFilter[]): Promise<(T & Relations)[]>;
    /**
     * Register an inclusion resolver for the related model name.
     *
     * @param relationName - Name of the relation defined on the source model
     * @param resolver - Resolver function for getting related model entities
     */
    registerInclusionResolver(relationName: string, resolver: InclusionResolver<T, Entity>): void;
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
    protected createHasManyRepositoryFactoryFor<Target extends Entity, TargetID, ForeignKeyType>(relationName: string, targetRepositoryGetter: Getter<EntityCrudRepository<Target, TargetID>>): HasManyRepositoryFactory<Target, ForeignKeyType>;
    /**
     * Function to create a belongs to accessor
     *
     * @param relationName - Name of the relation defined on the source model
     * @param targetRepo - Target repository instance
     */
    protected createBelongsToAccessorFor<Target extends Entity, TargetId>(relationName: string, targetRepositoryGetter: Getter<EntityCrudRepository<Target, TargetId>> | {
        [repoType: string]: Getter<EntityCrudRepository<Target, TargetId>>;
    }): BelongsToAccessor<Target, ID>;
    /**
     * Function to create a constrained hasOne relation repository factory
     *
     * @param relationName - Name of the relation defined on the source model
     * @param targetRepo - Target repository instance
     */
    protected createHasOneRepositoryFactoryFor<Target extends Entity, TargetID, ForeignKeyType>(relationName: string, targetRepositoryGetter: Getter<EntityCrudRepository<Target, TargetID>> | {
        [repoType: string]: Getter<EntityCrudRepository<Target, TargetID>>;
    }): HasOneRepositoryFactory<Target, ForeignKeyType>;
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
    protected createHasManyThroughRepositoryFactoryFor<Target extends Entity, TargetID, Through extends Entity, ThroughID, ForeignKeyType>(relationName: string, targetRepositoryGetter: Getter<EntityCrudRepository<Target, TargetID>> | {
        [repoType: string]: Getter<EntityCrudRepository<Target, TargetID>>;
    }, throughRepositoryGetter: Getter<EntityCrudRepository<Through, ThroughID>>): HasManyThroughRepositoryFactory<Target, TargetID, Through, ForeignKeyType>;
    /**
     * Function to create a references many accessor
     *
     * @param relationName - Name of the relation defined on the source model
     * @param targetRepo - Target repository instance
     */
    protected createReferencesManyAccessorFor<Target extends Entity, TargetId>(relationName: string, targetRepoGetter: Getter<EntityCrudRepository<Target, TargetId>>): ReferencesManyAccessor<Target, ID>;
    beginTransaction(options?: TransactionOptions | TransactionOptions['isolationLevel']): Promise<Transaction>;
}
export {};
