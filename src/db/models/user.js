import Sequelize from "sequelize";

const createUserModel = (sequelize) => {
  const { DataTypes } = Sequelize;
  return sequelize.define(
    "users",
    {
      user_name: { type: DataTypes.STRING, allowNull: false },
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
      linkedin_url: {
        type: DataTypes.STRING,
      },
      github_url: {
        type: DataTypes.STRING,
      },
      linkedin_url: {
        type: DataTypes.STRING,
      },
      blog_url: {
        type: DataTypes.STRING,
      },
      twitter_url: {
        type: DataTypes.STRING,
      },
      stackoverflow_url: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};

export default createUserModel;
