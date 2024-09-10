import { sequelize as psql, portfolio_backend as schemaname, } from "../../../../src/postgres.js";
const getAllProjects = async (user_id) => {
    const query = `select * from ${schemaname}.projects where user_id = :user_id order by id desc`;
    const res = await psql.query(query, {
        type: psql.QueryTypes.SELECT,
        replacements: {
            user_id,
        },
    });
    return res;
};
const addProjects = async (project, user_id) => {
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
                technology_tags: Array.isArray(project.technology_tags)
                    ? project.technology_tags
                    : project.technology_tags?.split(","),
                user_id: user_id,
            },
        });
    }
    else {
        return psql.models.projects.create({ ...project, user_id });
    }
};
const deleteProjects = async (project, user_id) => {
    return psql.models.projects.destroy({
        where: { id: project.id, user_id: user_id },
    });
};
export { getAllProjects, addProjects, deleteProjects };
