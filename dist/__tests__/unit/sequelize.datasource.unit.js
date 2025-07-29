"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const sequelize_1 = require("../../sequelize");
const config_1 = require("../fixtures/datasources/config");
const primary_datasource_1 = require("../fixtures/datasources/primary.datasource");
describe('Sequelize DataSource', () => {
    it('throws error when nosql connectors are supplied', () => {
        try {
            new sequelize_1.SequelizeDataSource({
                name: 'db',
                user: 'test',
                password: 'secret',
                connector: 'memory',
            });
        }
        catch (err) {
            const result = err.message;
            (0, testlab_1.expect)(result).which.eql('Specified connector memory is not supported.');
        }
    });
    it('accepts url strings for connection', async () => {
        const dataSource = new sequelize_1.SequelizeDataSource(config_1.datasourceTestConfig.url[primary_datasource_1.config.connector === 'postgresql'
            ? 'postgresql'
            : 'sqlite3']);
        (0, testlab_1.expect)(await dataSource.init()).to.not.throwError();
        await dataSource.stop();
    });
    it('throws error if url strings has wrong password', async function () {
        if (primary_datasource_1.config.connector !== 'postgresql') {
            // eslint-disable-next-line @typescript-eslint/no-invalid-this
            this.skip();
        }
        const dataSource = new sequelize_1.SequelizeDataSource(config_1.datasourceTestConfig.wrongPassword.postgresql);
        try {
            await dataSource.init();
        }
        catch (err) {
            (0, testlab_1.expect)(err.message).to.be.eql('password authentication failed for user "postgres"');
        }
    });
    it('should be able override sequelize options', async function () {
        if (primary_datasource_1.config.connector !== 'postgresql') {
            // eslint-disable-next-line @typescript-eslint/no-invalid-this
            this.skip();
        }
        const dataSource = new sequelize_1.SequelizeDataSource({
            ...config_1.datasourceTestConfig.primary.postgresql,
            user: 'wrong-username',
            sequelizeOptions: {
                username: config_1.datasourceTestConfig.primary.postgresql.user,
            },
        });
        (0, testlab_1.expect)(await dataSource.init()).to.not.throwError();
    });
    it('parses pool options for postgresql', async () => {
        const dataSource = new sequelize_1.SequelizeDataSource({
            name: 'db',
            connector: 'postgresql',
            min: 10,
            max: 20,
            idleTimeoutMillis: 18000,
        });
        const poolOptions = dataSource.getPoolOptions();
        (0, testlab_1.expect)(poolOptions).to.have.property('min', 10);
        (0, testlab_1.expect)(poolOptions).to.have.property('max', 20);
        (0, testlab_1.expect)(poolOptions).to.have.property('idle', 18000);
        (0, testlab_1.expect)(poolOptions).to.not.have.property('acquire');
    });
    it('parses pool options for mysql', async () => {
        const dataSource = new sequelize_1.SequelizeDataSource({
            name: 'db',
            connector: 'mysql',
            connectionLimit: 20,
            acquireTimeout: 10000,
        });
        const poolOptions = dataSource.getPoolOptions();
        (0, testlab_1.expect)(poolOptions).to.have.property('max', 20);
        (0, testlab_1.expect)(poolOptions).to.have.property('acquire', 10000);
        (0, testlab_1.expect)(poolOptions).to.not.have.property('min');
        (0, testlab_1.expect)(poolOptions).to.not.have.property('idle');
    });
    it('parses pool options for oracle', async () => {
        const dataSource = new sequelize_1.SequelizeDataSource({
            name: 'db',
            connector: 'oracle',
            minConn: 10,
            maxConn: 20,
            timeout: 20000,
        });
        const poolOptions = dataSource.getPoolOptions();
        (0, testlab_1.expect)(poolOptions).to.have.property('min', 10);
        (0, testlab_1.expect)(poolOptions).to.have.property('max', 20);
        (0, testlab_1.expect)(poolOptions).to.have.property('idle', 20000);
        (0, testlab_1.expect)(poolOptions).to.not.have.property('acquire');
    });
});
//# sourceMappingURL=sequelize.datasource.unit.js.map