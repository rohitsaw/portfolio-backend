import { DataTypes, Sequelize } from "sequelize";

const createTransactionModel = (sequelize: Sequelize, schema: string) => {
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
        onDelete: "CASCADE",
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
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
