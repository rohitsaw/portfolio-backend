import { sequelize } from "../../../../src/postgres.js";

const getAllUsersInGroup = async ({ group_id }) => {
  return sequelize.models.User.findAll({
    where: { group_id: group_id },
    attributes: ["id", "group_id", "name"],
  });
};

const createUser = async (payload) => {
  const isAlreadyExist = await sequelize.models.User.findOne({
    where: { name: payload.name, group_id: payload.group_id },
  });
  if (isAlreadyExist) {
    throw new Error("User Already Exists");
  }
  return sequelize.models.User.create({
    name: payload.name,
    group_id: payload.group_id,
  });
};

export { getAllUsersInGroup, createUser };
