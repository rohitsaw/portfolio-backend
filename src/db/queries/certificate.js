import { psql } from "../postgres.js";
import dayjs from "dayjs";

const getAllCertificates = async () => {
  const query = `select * from certificates order by certification_date desc`;
  const res = await psql.query(query, {
    type: psql.QueryTypes.SELECT,
  });
  return res;
};

const addCertificates = async (certificate) => {
  if (certificate.id) {
    const query = `
      INSERT INTO certificates (id, certificate_name, certificate_description, certification_authority, certification_date, certification_expiry, verification_url, technology_tags)
      VALUES (:id, :certificate_name, :certificate_description, :certification_authority, :certification_date, :certification_expiry, :verification_url, ARRAY[:technology_tags])
      ON CONFLICT(id)
      DO UPDATE SET
      certificate_name = EXCLUDED.certificate_name,
      certificate_description = EXCLUDED.certificate_description,
      certification_authority = EXCLUDED.certification_authority,
      certification_date = EXCLUDED.certification_date,
      certification_expiry  = EXCLUDED.certification_expiry,
      verification_url  = EXCLUDED.verification_url,
      technology_tags = EXCLUDED.technology_tags
      ;`;
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
      },
    });
  } else {
    return psql.models.certificates.create(certificate);
  }
};

const deleteCertificates = async (certificate) => {
  return psql.models.certificates.destroy({ where: { id: certificate.id } });
};

export { getAllCertificates, addCertificates, deleteCertificates };
