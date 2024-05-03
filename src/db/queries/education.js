import { psql } from "../postgres.js";


const getAllEducations = async () => {
  const query = `select * from education order by end_date desc`;
  const res = await psql.query(query, {
    type: psql.QueryTypes.SELECT,
  });
  return res;
};

const addEducations = async (education) => {
  if (education.id) {
    const query = `
      INSERT INTO education (id, institute_name, degree_name, start_date, end_date, score)
      VALUES (:id, :institute_name, :degree_name, :start_date, :end_date, :score)
      ON CONFLICT(id)
      DO UPDATE SET
      institute_name = EXCLUDED.institute_name,
      degree_name = EXCLUDED.degree_name,
      start_date = EXCLUDED.start_date,
      end_date = EXCLUDED.end_date,
      score  = EXCLUDED.score
      ;`;
    return psql.query(query, {
      replacements: {
        id: education.id,
        institute_name: education.institute_name,
        degree_name: education.degree_name,
        start_date: education.start_date,
        end_date: education.end_date,
        score: education.score,
      },
    });
  } else {
    return psql.models.education.create(education);
  }
};

const deleteEducations = async (education) => {
  return psql.models.education.destroy({ where: { id: education.id } });
};

export { getAllEducations, addEducations, deleteEducations };
