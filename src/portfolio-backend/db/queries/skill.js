import {
  sequelize as psql,
  portfolio_backend as schemaname,
} from "../../../../src/postgres.js";

const getAllSkills = async (user_id) => {
  const query = `select * from ${schemaname}.skills where user_id = :user_id order by skill_name;`;
  const res = await psql.query(query, {
    type: psql.QueryTypes.SELECT,
    replacements: {
      user_id: user_id,
    },
  });
  return res;
};

const addSkills = async (skill, user_id) => {
  if (skill.id) {
    const query = `
      update ${schemaname}.skills set
      skill_name = :skill_name,
      skill_proficiency = :skill_proficiency,
      skill_category = :skill_category
      where id = :id and user_id = :user_id;`;
    return psql.query(query, {
      replacements: {
        id: skill.id,
        skill_name: skill.skill_name,
        skill_category: skill.skill_category,
        skill_proficiency: skill.skill_proficiency,
        user_id: user_id,
      },
    });
  } else {
    return psql.models.skills.create({ ...skill, user_id });
  }
};

const deleteSkills = async (skill, user_id) => {
  return psql.models.skills.destroy({
    where: { id: skill.id, user_id: user_id },
  });
};

export { addSkills, getAllSkills, deleteSkills };
