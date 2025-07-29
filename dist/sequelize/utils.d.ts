/**
 * Function to check if the `value` is js object (`{}`)
 * @param value Target value to check
 * @returns `true` is it is an object `false` otherwise
 */
export declare const isTruelyObject: (value?: unknown) => boolean;
/**
 * Coerces a value to a boolean. This is used for Where Filter type coercion
 * to avoid passing "true" or "false" as strings to the internal Sequelize queries.
 *
 * @param value - The value to be serialized.
 * @returns The coerced boolean value: true / false.
 */
export declare const castToBoolean: (value: unknown) => boolean;
