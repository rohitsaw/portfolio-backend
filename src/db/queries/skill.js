import { psql } from "../postgres.js";

const getAllSkills = async () => {
  const query = `select * from skills order by skill_name;`;
  // skill_category, json_agg(json_build_object('id', id, 'skill_name', skill_name, 'skill_proficiency', COALESCE(skill_proficiency,0))) as skills from skills group by skill_category`;
  const res = await psql.query(query, {
    type: psql.QueryTypes.SELECT,
  });
  return res;
};

const addSkills = async (skill) => {
  if (skill.id) {
    const query = `
      INSERT INTO skills (id, skill_name, skill_category, skill_proficiency)
      VALUES (:id, :skill_name, :skill_category, :skill_proficiency)
      ON CONFLICT(id)
      DO UPDATE SET
      skill_name = EXCLUDED.skill_name,
      skill_proficiency = EXCLUDED.skill_proficiency;`;
    return psql.query(query, {
      replacements: {
        id: skill.id,
        skill_name: skill.skill_name,
        skill_category: skill.skill_category,
        skill_proficiency: skill.skill_proficiency,
      },
    });
  } else {
    return psql.models.skills.create(skill);
  }
};

const deleteSkills = async (skill) => {
  return psql.models.skills.destroy({ where: { id: skill.id } });
};

export { addSkills, getAllSkills, deleteSkills };
