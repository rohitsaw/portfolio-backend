import { QueryTypes } from "sequelize";
import {
  sequelize as psql,
  portfolio_backend as schemaname,
} from "../../../postgres.js";

import { User } from "../../../types/portfolio";

const getuser = async (email: string) => {
  const query = `select * from ${schemaname}.users where user_email = :email`;
  const res = await psql.query(query, {
    type: QueryTypes.SELECT,
    replacements: { email: email },
  });
  return res;
};

const addOrUpdateUser = async (
  { user_email, name, about, social_links }: User,
  user_id: number
) => {
  let social_links_string = JSON.stringify(social_links);
  const query = `update ${schemaname}.users set
    name = :name, 
    about = :about,
    social_links = :social_links
    where user_email = :user_email and id = :user_id
    `;
  const res = await psql.query(query, {
    type: QueryTypes.SELECT,
    replacements: {
      user_email,
      name,
      about,
      social_links: social_links_string,
      user_id,
    },
  });
  return res;
};

const getUserIdFromEmail = async (email: string) => {
  const query = `select id from ${schemaname}.users where user_email = :email`;
  const res: Array<{ id: number }> = await psql.query(query, {
    type: QueryTypes.SELECT,
    replacements: { email },
    raw: true,
  });
  return res[0]?.id;
};

export { getuser, addOrUpdateUser, getUserIdFromEmail };
