import Sequelize from "sequelize";

const createEducationModel = (sequelize) => {
  const { DataTypes } = Sequelize;
  return sequelize.define(
    "education",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      institute_name: { type: DataTypes.STRING, allowNull: false },
      degree_name: { type: DataTypes.STRING, allowNull: false },

      start_date: { type: DataTypes.DATEONLY, allowNull: false },
      end_date: { type: DataTypes.DATEONLY },

      score: { type: DataTypes.DOUBLE },
    },
    {
      timestamps: false,
    }
  );
};

export default createEducationModel;
