import {
  sequelize as psql,
  portfolio_backend as schemaname,
} from "../../../../src/postgres.js";
import dayjs from "dayjs";

const getAllCertificates = async (user_id) => {
  const query = `select * from ${schemaname}.certificates where user_id = :user_id order by certification_date desc`;
  const res = await psql.query(query, {
    type: psql.QueryTypes.SELECT,
    replacements: {
      user_id,
    },
  });
  return res;
};

const addCertificates = async (certificate, user_id) => {
  if (certificate.id) {
    const query = `
      update ${schemaname}.certificates set
      certificate_name = :certificate_name,
      certificate_description = :certificate_description,
      certification_authority = :certification_authority,
      certification_date = :certification_date,
      certification_expiry  = :certification_expiry,
      verification_url  = :verification_url,
      technology_tags = ARRAY[:technology_tags]
      where id = :id and user_id = :user_id;`;
    return psql.query(query, {
      replacements: {
        id: certificate.id,
        certificate_name: certificate.certificate_name,
        certificate_description: certificate.certificate_description,
        certification_authority: certificate.certification_authority,
        certification_date: dayjs(certificate.certification_date).format(
          "YYYY-MM-DD"
        ),
        certification_expiry: certificate.certification_expiry,
        verification_url: certificate.verification_url,
        technology_tags: Array.isArray(certificate.technology_tags)
          ? certificate.technology_tags
          : certificate.technology_tags?.split(","),
        user_id: user_id,
      },
    });
  } else {
    return psql.models.certificates.create({ ...certificate, user_id });
  }
};

const deleteCertificates = async (certificate, user_id) => {
  return psql.models.certificates.destroy({
    where: { id: certificate.id, user_id },
  });
};

export { getAllCertificates, addCertificates, deleteCertificates };
