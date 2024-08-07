import {
  sequelize as psql,
  portfolio_backend as schemaname,
} from "../../../../src/postgres.js";

const getuser = async (email) => {
  const query = `select * from ${schemaname}.users where user_email = :email`;
  const res = await psql.query(query, {
    type: psql.QueryTypes.SELECT,
    replacements: { email: email },
  });
  return res;
};

const addOrUpdateUser = async (
  { user_email, name, about, social_links },
  user_id
) => {
  social_links = JSON.stringify(social_links);
  const query = `update ${schemaname}.users set
    name = :name, 
    about = :about,
    social_links = :social_links
    where user_email = :user_email and id = :user_id
    `;
  const res = await psql.query(query, {
    type: psql.QueryTypes.SELECT,
    replacements: { user_email, name, about, social_links, user_id },
  });
  return res;
};

const getUserIdFromEmail = async (email) => {
  const query = `select id from ${schemaname}.users where user_email = :email`;
  const res = await psql.query(query, {
    type: psql.QueryTypes.SELECT,
    replacements: { email },
    raw: true,
  });
  return res[0]?.id;
};

export { getuser, addOrUpdateUser, getUserIdFromEmail };
