import Sequelize from "sequelize";

const createProjectModel = (sequelize) => {
  const { DataTypes } = Sequelize;
  return sequelize.define(
    "projects",
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
      project_name: { type: DataTypes.STRING, allowNull: false },
      project_description: { type: DataTypes.STRING, defaultValue: "N/A" },

      github_url: { type: DataTypes.STRING },
      web_url: { type: DataTypes.STRING },
      play_store_url: { type: DataTypes.STRING },

      // values. eg- Node.js, React.js, Flutter
      technology_tags: { type: DataTypes.ARRAY(DataTypes.STRING) },
    },
    {
      timestamps: false,
    }
  );
};

export default createProjectModel;
