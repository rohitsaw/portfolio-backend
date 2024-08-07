import Sequelize from "sequelize";

const createSkillModel = (sequelize, schema) => {
  const { DataTypes } = Sequelize;
  return sequelize.define(
    "skills",
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
      skill_name: { type: DataTypes.STRING, allowNull: false, unique: true },
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
      schema,
      timestamps: false,
    }
  );
};

export default createSkillModel;
