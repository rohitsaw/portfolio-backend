import { psql } from "../postgres.js";

const getAllProjects = async () => {
  const query = `select * from projects`;
  const res = await psql.query(query, {
    type: psql.QueryTypes.SELECT,
  });

  return res;
};

const addProjects = async (project) => {
  if (project.id) {
    const query = `
      update projects set
      project_name = :project_name,
      project_description = :project_description,
      github_url = :github_url,
      web_url = :web_url,
      play_store_url = :play_store_url,
      technology_tags = ARRAY[:technology_tags]
      where id = :id;
      `;
    return psql.query(query, {
      replacements: {
        id: project.id,
        project_name: project.project_name,
        project_description: project.project_description,
        github_url: project.github_url,
        web_url: project.web_url,
        play_store_url: project.play_store_url,
        technology_tags: Array.isArray(project.technology_tags)
          ? project.technology_tags
          : project.technology_tags?.split(","),
      },
    });
  } else {
    return psql.models.projects.create(project);
  }
};

const deleteProjects = async (project) => {
  return psql.models.projects.destroy({ where: { id: project.id } });
};

export { getAllProjects, addProjects, deleteProjects };
