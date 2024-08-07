import createGroupModel from "./models/group.js";
import createUserModel from "./models/user.js";
import createTransactionModel from "./models/transaction.js";
import createTransactionPartModel from "./models/transactionPart.js";

const initializeDB = async (sequelize, schemaname) => {
  try {
    await sequelize.authenticate();

    await createGroupModel(sequelize, schemaname);
    await createUserModel(sequelize, schemaname);
    await createTransactionModel(sequelize, schemaname);
    await createTransactionPartModel(sequelize, schemaname);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export default initializeDB;
