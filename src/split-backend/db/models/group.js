import { DataTypes } from "sequelize";

const createGroupModel = (sequelize, schema) => {
  const User = sequelize.define(
    "Group",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      schema,
      timestamps: true,
      underscored: true,
      tableName: "groups",
    }
  );
  return User;
};

export default createGroupModel;
