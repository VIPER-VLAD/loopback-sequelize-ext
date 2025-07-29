import { Operators } from '@loopback/repository';
/**
 * @key Operator used in loopback
 * @value Equivalent operator in Sequelize
 */
export declare const operatorTranslations: {
    [key in Operators]?: symbol;
};
