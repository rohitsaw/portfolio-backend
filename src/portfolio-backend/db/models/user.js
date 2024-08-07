import Sequelize from "sequelize";

const createUserModel = (sequelize) => {
  const { DataTypes } = Sequelize;
  return sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      about: {
        type: DataTypes.TEXT,
      },
      social_links: {
        type: DataTypes.JSONB,
      },
    },
    {
      timestamps: false,
    }
  );
};

export default createUserModel;
