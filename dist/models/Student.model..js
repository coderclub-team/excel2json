"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
let Student = class Student extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    })
], Student.prototype, "UUID", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [3, 50],
        },
    })
], Student.prototype, "firstname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [3, 50],
        },
    })
], Student.prototype, "lastname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [3, 10],
        },
    })
], Student.prototype, "class", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [3, 10],
        },
    })
], Student.prototype, "section", void 0);
Student = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "test_students",
        timestamps: true,
        paranoid: true,
    })
], Student);
exports.default = Student;
