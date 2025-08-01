"use strict";
// Copyright LoopBack contributors 2022. All Rights Reserved.
// Node module: @loopback/sequelize
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.castToBoolean = exports.isTruelyObject = void 0;
/**
 * Function to check if the `value` is js object (`{}`)
 * @param value Target value to check
 * @returns `true` is it is an object `false` otherwise
 */
const isTruelyObject = (value) => {
    return typeof value === 'object' && !Array.isArray(value) && value !== null;
};
exports.isTruelyObject = isTruelyObject;
/**
 * Coerces a value to a boolean. This is used for Where Filter type coercion
 * to avoid passing "true" or "false" as strings to the internal Sequelize queries.
 *
 * @param value - The value to be serialized.
 * @returns The coerced boolean value: true / false.
 */
const castToBoolean = (value) => {
    if (typeof value === 'boolean') {
        return value;
    }
    else if (typeof value === 'string') {
        return value.toLowerCase() === 'true';
    }
    else {
        // e.g. null, undefined, 0, 1, etc.
        return Boolean(value);
    }
};
exports.castToBoolean = castToBoolean;
//# sourceMappingURL=utils.js.map