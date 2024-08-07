import {
  sequelize as psql,
  portfolio_backend as schemaname,
} from "../../../../src/postgres.js";

const getAllExperiences = async (user_id) => {
  const query = `select * from ${schemaname}.work_experiences where user_id = :user_id order by end_date desc`;
  const res = await psql.query(query, {
    type: psql.QueryTypes.SELECT,
    replacements: {
      user_id,
    },
  });
  return res;
};

const addExperiences = async (experience, user_id) => {
  if (experience.id) {
    const query = `
    update ${schemaname}.work_experiences set
    company_name = :company_name,
    designation = :designation,
    start_date = :start_date,
    end_date = :end_date,
    details  = :details
    where id = :id and user_id = :user_id;`;
    return psql.query(query, {
      replacements: {
        id: experience.id,
        company_name: experience.company_name,
        designation: experience.designation,
        start_date: experience.start_date,
        end_date: experience.end_date,
        details: experience.details,
        user_id: user_id,
      },
    });
  } else {
    return psql.models.work_experiences.create({ ...experience, user_id });
  }
};

const deleteExperiences = async (experience, user_id) => {
  return psql.models.work_experiences.destroy({
    where: { id: experience.id, user_id },
  });
};

export { getAllExperiences, addExperiences, deleteExperiences };
