import Sequelize from "sequelize";

const createSkillModel = (sequelize) => {
  const { DataTypes } = Sequelize;
  return sequelize.define(
    "skills",
    {
      skill_name: { type: DataTypes.STRING, allowNull: false },
      skill_category: { type: DataTypes.STRING, defaultValue: "Misc" },
      skill_proficiency: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 100,
        },
      },
    },
    {
      timestamps: false,
    }
  );
};

export default createSkillModel;
