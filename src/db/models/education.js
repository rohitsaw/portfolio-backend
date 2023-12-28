import Sequelize from "sequelize";

const createEducationModel = (sequelize) => {
  const { DataTypes } = Sequelize;
  return sequelize.define(
    "education",
    {
      institute_name: { type: DataTypes.STRING, allowNull: false },
      degree_name: { type: DataTypes.STRING, allowNull: false },

      start_date: { type: DataTypes.DATEONLY, allowNull: false },
      leave_data: { type: DataTypes.DATEONLY },

      score: { type: DataTypes.INTEGER },
    },
    {
      timestamps: false,
    }
  );
};

export default createEducationModel;
