import { DataTypes, Sequelize } from 'sequelize';

const createUserModel = (sequelize: Sequelize, schema: string) => {
  return sequelize.define(
    'users',
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
      profile_url: {
        type: DataTypes.TEXT,
        defaultValue:
          'https://cywiacstqjeecqodaozz.supabase.co/storage/v1/object/public/portfolio_images/default_profile_pic.webp',
      },
    },
    {
      schema,
      timestamps: false,
    }
  );
};

export default createUserModel;
