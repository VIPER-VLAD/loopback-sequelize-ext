import { AnyObject, Entity } from '@loopback/repository';
import { Model } from 'sequelize';
export declare class SequelizeModel extends Model implements Entity {
    getId(): null;
    getIdObject(): Object;
    toObject(_options?: AnyObject | undefined): Object;
}
