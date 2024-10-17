import { QueryTypes, Sequelize } from 'sequelize';
import DB from '../../../postgres.js';
import { User } from '../../../types/portfolio.js';

const psql: Sequelize = DB.getSequelize();
const schemaname: string = DB.portfolio_backend;

const getuser = async (email: string, userFromAuth) => {
  console.log('getuser: email', email);
  console.log('getUser: userFromAuth', userFromAuth);
  if (userFromAuth) {
    const [user] = await psql.models.users.findOrCreate({
      where: { user_email: email },
      defaults: { user_email: email, name: userFromAuth.displayName },
    });
    return user;
  } else {
    const query = `select * from ${schemaname}.users where user_email = :email`;
    const res = await psql.query(query, {
      type: QueryTypes.SELECT,
      replacements: { email: email },
    });
    return res;
  }
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

const findOrCreateUser = async ({ email, name }) => {
  console.log('findOrCreateUser', email);
  return psql.models.users.findOrCreate({
    where: { user_email: email },
    defaults: {
      user_email: email,
      name: name,
    },
  });
};

export { getuser, addOrUpdateUser, getUserIdFromEmail, findOrCreateUser };
