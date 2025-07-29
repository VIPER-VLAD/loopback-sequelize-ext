import { Application, Component } from '@loopback/core';
import { LoopbackSequelizeComponentOptions } from './types';
export declare class LoopbackSequelizeComponent implements Component {
    private application;
    private options;
    constructor(application: Application, options?: LoopbackSequelizeComponentOptions);
}
