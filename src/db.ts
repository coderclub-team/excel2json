import { Sequelize } from "sequelize-typescript";
import Class from "./models/Class.model";
import Student from "./models/Student.model.";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "103.93.16.51",
  username: "touchsk1_thiru",
  password: "Thiru@123$",
  database: "touchsk1_nodev_001",
  dialectModule: require("mysql2"),
  dialectModulePath: "mysql2",
  logging: false,
  pool: {
    max: 15,
    min: 5,
    idle: 20000,
    evict: 15000,
    acquire: 30000,
    maxUses: 100,
  },
});

export default async () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
      return;
    });

  sequelize.addModels([Student]);
  Student.sync({
    alter: true,
  });

  return sequelize;
};
