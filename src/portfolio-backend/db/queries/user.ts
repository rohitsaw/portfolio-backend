import { QueryTypes, Sequelize } from 'sequelize';
import DB from '../../../postgres.js';
import { User } from '../../../types/portfolio.js';

const psql: Sequelize = DB.getSequelize();
const schemaname: string = DB.portfolio_backend;

const getuser = async (email: string, name?: string) => {
  if (name) {
    const [user, created] = await psql.models.users.findOrCreate({
      where: { user_email: email },
      defaults: { user_email: email, name: name },
    });
    console.log('Is user created', created);
    console.log('user', user);
    return user;
  } else {
    const user = await psql.models.users.findOne({
      where: { user_email: email },
    });
    console.log('user', user);
    return user;
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
