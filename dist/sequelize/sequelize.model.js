"use strict";
// Copyright LoopBack contributors 2022. All Rights Reserved.
// Node module: @loopback/sequelize
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeModel = void 0;
const sequelize_1 = require("sequelize");
class SequelizeModel extends sequelize_1.Model {
    getId() {
        // Method implementation not required as this class is just being used as type not a constructor
        return null;
    }
    getIdObject() {
        // Method implementation not required as this class is just being used as type not a constructor
        return {};
    }
    toObject(_options) {
        // Method implementation not required as this class is just being used as type not a constructor
        return {};
    }
}
exports.SequelizeModel = SequelizeModel;
//# sourceMappingURL=sequelize.model.js.map