import { psql } from "../postgres.js";

const getAllExperiences = async () => {
  const query = `select * from work_experiences order by end_date desc`;
  const res = await psql.query(query, {
    type: psql.QueryTypes.SELECT,
  });
  return res;
};

const addExperiences = async (experience) => {
  if (experience.id) {
    const query = `
    INSERT INTO work_experiences (id, company_name, designation, start_date, end_date, details)
    VALUES (:id, :company_name, :designation, :start_date, :end_date, :details)
    ON CONFLICT(id)
    DO UPDATE SET
    company_name = EXCLUDED.company_name,
    designation = EXCLUDED.designation,
    start_date = EXCLUDED.start_date,
    end_date = EXCLUDED.end_date,
    details  = EXCLUDED.details
    ;`;
    return psql.query(query, {
      replacements: {
        id: experience.id,
        company_name: experience.company_name,
        designation: experience.designation,
        start_date: experience.start_date,
        end_date: experience.end_date,
        details: experience.details,
      },
    });
  } else {
    return psql.models.work_experiences.create(experience);
  }
};

const deleteExperiences = async (experience) => {
  return psql.models.work_experiences.destroy({ where: { id: experience.id } });
};

export { getAllExperiences, addExperiences, deleteExperiences };
