"use strict";
// Copyright LoopBack contributors 2022. All Rights Reserved.
// Node module: @loopback/sequelize
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.operatorTranslations = void 0;
const sequelize_1 = require("sequelize");
/**
 * @key Operator used in loopback
 * @value Equivalent operator in Sequelize
 */
exports.operatorTranslations = {
    eq: sequelize_1.Op.eq,
    gt: sequelize_1.Op.gt,
    gte: sequelize_1.Op.gte,
    lt: sequelize_1.Op.lt,
    lte: sequelize_1.Op.lte,
    neq: sequelize_1.Op.ne,
    between: sequelize_1.Op.between,
    inq: sequelize_1.Op.in,
    nin: sequelize_1.Op.notIn,
    like: sequelize_1.Op.like,
    nlike: sequelize_1.Op.notLike,
    ilike: sequelize_1.Op.iLike,
    nilike: sequelize_1.Op.notILike,
    regexp: sequelize_1.Op.regexp,
    and: sequelize_1.Op.and,
    or: sequelize_1.Op.or,
    match: sequelize_1.Op.match,
    contains: sequelize_1.Op.contains,
};
//# sourceMappingURL=operator-translation.js.map