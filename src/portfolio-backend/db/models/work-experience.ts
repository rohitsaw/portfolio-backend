import { DataTypes, Sequelize } from 'sequelize';

const createWorkExperienceModel = (sequelize: Sequelize, schema: string) => {
  return sequelize.define(
    'work_experiences',
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
          model: 'users',
          key: 'id',
        },
      },
      company_name: { type: DataTypes.STRING, allowNull: false },
      designation: { type: DataTypes.STRING },

      start_date: { type: DataTypes.DATEONLY },
      end_date: { type: DataTypes.DATEONLY },

      details: { type: DataTypes.TEXT },
    },
    {
      schema,
      timestamps: false,
    }
  );
};

export default createWorkExperienceModel;
