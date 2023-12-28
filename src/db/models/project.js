import Sequelize from "sequelize";

const createProjectModel = (sequelize) => {
  const { DataTypes } = Sequelize;
  return sequelize.define(
    "projects",
    {
      project_name: { type: DataTypes.STRING, allowNull: false },
      project_description: { type: DataTypes.STRING, defaultValue: "N/A" },

      github_url: { type: DataTypes.STRING },
      web_url: { type: DataTypes.STRING },
      play_store_url: { type: DataTypes.STRING },

      // comma separated values. eg- Node.js, React.js, Flutter
      technologies_tags: { type: DataTypes.STRING },
    },
    {
      timestamps: false,
    }
  );
};

export default createProjectModel;
