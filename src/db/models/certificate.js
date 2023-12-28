import Sequelize from "sequelize";

const createCertificateModel = (sequelize) => {
  const { DataTypes } = Sequelize;
  return sequelize.define(
    "certificates",
    {
      certificates_name: { type: DataTypes.STRING, allowNull: false },
      certificates_description: { type: DataTypes.STRING, defaultValue: "N/A" },

      certification_authority: { type: DataTypes.STRING },

      certification_date: { type: DataTypes.DATEONLY },
      certification_expiry: { type: DataTypes.DATEONLY },

      verification_url: { type: DataTypes.STRING },

      // comma separated values. eg- AWS, Javascript
      technologies_tags: { type: DataTypes.STRING },
    },
    {
      timestamps: false,
    }
  );
};

export default createCertificateModel;
