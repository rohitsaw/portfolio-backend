import { DataTypes } from "sequelize";

const createTransactionModel = (sequelize, schema) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      schema,
      timestamps: true,
      underscored: true,
      tableName: "transactions",
    }
  );
  return Transaction;
};

export default createTransactionModel;
