// Sequelize
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('edutask', 'root', '1w551474', {
  host: 'localhost',
  dialect: 'mysql'
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}