import Sequelize from "sequelize";

const createEducationModel = (sequelize, schema) => {
  const { DataTypes } = Sequelize;
  return sequelize.define(
    "education",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      institute_name: { type: DataTypes.STRING, allowNull: false },
      degree_name: { type: DataTypes.STRING, allowNull: false },

      start_date: { type: DataTypes.DATEONLY, allowNull: false },
      end_date: { type: DataTypes.DATEONLY },

      score: { type: DataTypes.DOUBLE },
    },
    {
      schema,
      timestamps: false,
    }
  );
};

export default createEducationModel;
