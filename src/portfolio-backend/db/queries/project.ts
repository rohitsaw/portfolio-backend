import { QueryTypes, Sequelize } from 'sequelize';
import DB from '../../../postgres.js';

import { Project } from '../../../types/portfolio.js';

const psql: Sequelize = DB.getSequelize();
const schemaname: string = DB.portfolio_backend;

const getAllProjects = async (user_id: number) => {
  const query = `select * from ${schemaname}.projects where user_id = :user_id order by id desc`;
  const res = await psql.query(query, {
    type: QueryTypes.SELECT,
    replacements: {
      user_id,
    },
  });

  return res;
};

const addProjects = async (project: Project, user_id: number) => {
  if (project.id) {
    const query = `
      update ${schemaname}.projects set
      project_name = :project_name,
      project_description = :project_description,
      github_url = :github_url,
      web_url = :web_url,
      play_store_url = :play_store_url,
      technology_tags = ARRAY[:technology_tags]
      where id = :id and user_id = :user_id;
      `;
    return psql.query(query, {
      replacements: {
        id: project.id,
        project_name: project.project_name,
        project_description: project.project_description,
        github_url: project.github_url,
        web_url: project.web_url,
        play_store_url: project.play_store_url,
        technology_tags: project.technology_tags,
        user_id: user_id,
      },
    });
  } else {
    return psql.models.projects.create({ ...project, user_id });
  }
};

const deleteProjects = async (project: Project, user_id: number) => {
  return psql.models.projects.destroy({
    where: { id: project.id, user_id: user_id },
  });
};

export { getAllProjects, addProjects, deleteProjects };
