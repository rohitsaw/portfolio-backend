import { DataTypes } from "sequelize";

const createUserModel = (sequelize, schema) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      group_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "groups",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      schema,
      timestamps: true,
      underscored: true,
      tableName: "users",
    }
  );
  return User;
};

export default createUserModel;
