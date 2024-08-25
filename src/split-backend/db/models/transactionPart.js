import { DataTypes } from "sequelize";

const createTransactionPartModel = (sequelize, schema) => {
  const TransactionPart = sequelize.define(
    "TransactionPart",
    {
      user_id: {
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
      transaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "transactions",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      schema,
      timestamps: true,
      underscored: true,
      tableName: "transaction_parts",
    }
  );
  return TransactionPart;
};

export default createTransactionPartModel;
