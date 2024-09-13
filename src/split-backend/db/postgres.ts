import { Sequelize } from "sequelize";

import createGroupModel from "./models/group.js";
import createUserModel from "./models/user.js";
import createTransactionModel from "./models/transaction.js";
import createTransactionPartModel from "./models/transactionPart.js";

const initializeDB = async (sequelize: Sequelize, schemaname: string) => {
  try {
    await sequelize.authenticate();

    createGroupModel(sequelize, schemaname);
    createUserModel(sequelize, schemaname);
    createTransactionModel(sequelize, schemaname);
    createTransactionPartModel(sequelize, schemaname);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export default initializeDB;
