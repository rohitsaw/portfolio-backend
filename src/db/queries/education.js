import { psql } from "../postgres.js";

const getAllEducations = async (user_id = 1) => {
  const query = `select * from education where user_id = :user_id order by end_date desc`;
  const res = await psql.query(query, {
    type: psql.QueryTypes.SELECT,
    replacements: {
      user_id: user_id,
    },
  });
  return res;
};

const addEducations = async (education, user_id = 1) => {
  if (education.id) {
    const query = `
      update education set
      institute_name = :institute_name,
      degree_name = :degree_name,
      start_date = :start_date,
      end_date = :end_date,
      score  = :score
      where id = :id and user_id = :user_id
      ;`;
    return psql.query(query, {
      replacements: {
        id: education.id,
        institute_name: education.institute_name,
        degree_name: education.degree_name,
        start_date: education.start_date,
        end_date: education.end_date,
        score: education.score,
        user_id: user_id,
      },
    });
  } else {
    return psql.models.education.create({ ...education, user_id });
  }
};

const deleteEducations = async (education, user_id = 1) => {
  return psql.models.education.destroy({
    where: { id: education.id, user_id: user_id },
  });
};

export { getAllEducations, addEducations, deleteEducations };
