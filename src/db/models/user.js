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
      // linkedin_url: {
      //   type: DataTypes.STRING,
      // },
      // github_url: {
      //   type: DataTypes.STRING,
      // },
      // blog_url: {
      //   type: DataTypes.STRING,
      // },
      // twitter_url: {
      //   type: DataTypes.STRING,
      // },
      // stackoverflow_url: {
      //   type: DataTypes.STRING,
      // },
    },
    {
      timestamps: false,
    }
  );
};

export default createUserModel;
