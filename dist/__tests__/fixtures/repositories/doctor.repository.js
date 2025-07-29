"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const sequelize_1 = require("../../../sequelize");
const primary_datasource_1 = require("../datasources/primary.datasource");
const index_1 = require("../models/index");
let DoctorRepository = class DoctorRepository extends sequelize_1.SequelizeCrudRepository {
    constructor(dataSource, appointmentRepositoryGetter, patientRepositoryGetter) {
        super(index_1.Doctor, dataSource);
        this.appointmentRepositoryGetter = appointmentRepositoryGetter;
        this.patientRepositoryGetter = patientRepositoryGetter;
        this.patients = this.createHasManyThroughRepositoryFactoryFor('patients', patientRepositoryGetter, appointmentRepositoryGetter);
        this.registerInclusionResolver('patients', this.patients.inclusionResolver);
    }
};
exports.DoctorRepository = DoctorRepository;
exports.DoctorRepository = DoctorRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.primary')),
    tslib_1.__param(1, repository_1.repository.getter('AppointmentRepository')),
    tslib_1.__param(2, repository_1.repository.getter('PatientRepository')),
    tslib_1.__metadata("design:paramtypes", [primary_datasource_1.PrimaryDataSource, Function, Function])
], DoctorRepository);
//# sourceMappingURL=doctor.repository.js.map