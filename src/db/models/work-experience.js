import Sequelize from "sequelize";

const createWorkExperienceModel = (sequelize) => {
  const { DataTypes } = Sequelize;
  return sequelize.define(
    "work_experiences",
    {
      company_name: { type: DataTypes.STRING, allowNull: false },
      designation: { type: DataTypes.STRING },

      start_date: { type: DataTypes.DATEONLY },
      leave_data: { type: DataTypes.DATEONLY },

      details: { type: DataTypes.TEXT },
    },
    {
      timestamps: false,
    }
  );
};

export default createWorkExperienceModel;
