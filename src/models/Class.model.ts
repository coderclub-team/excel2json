import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "class_list",
  timestamps: false,
  paranoid: false,
})
export default class Class extends Model {
  // id, curriculum, level, section

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    autoIncrementIdentity: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  curriculum: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  level: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  section: string;
}
