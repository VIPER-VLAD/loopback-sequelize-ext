import { type LifeCycleObserver } from '@loopback/core';
import { UserRepository } from '../repositories';
/**
 * Test observer for validating that the Sequelize repositories are available in Loopback Observers during server startup.
 */
export declare class TestObserver implements LifeCycleObserver {
    private userRepository;
    constructor(userRepository: UserRepository);
    start(): Promise<void>;
}
