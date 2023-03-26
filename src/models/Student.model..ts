import { Column, DataType, Model, Table } from "sequelize-typescript";

// md5 hash

@Table({
  tableName: "student_list",
  timestamps: false,
  paranoid: true,
})
export default class Student extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    primaryKey: true,
  })
  student_id: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  fullname: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  class_id: number;
}
