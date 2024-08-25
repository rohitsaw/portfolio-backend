import { Sequelize } from "sequelize";

import connectToPortfolioDB from "./portfolio-backend/db/postgres.js";
import connectToSplitDB from "./split-backend/db/postgres.js";

let sequelize = null;
let portfolio_backend = "portfolio_backend";
let split_backend = "split_backend";

const connectToPostgres = async () => {
  const connStr = process.env.postgresConnStr;
  sequelize = new Sequelize(connStr);

  await connectToPortfolioDB(sequelize, portfolio_backend);
  await connectToSplitDB(sequelize, split_backend);

  await sequelize.sync({ alter: true });

  await createIndexes(sequelize);

  console.log("Database Sync Done for all DB");
};

const createIndexes = async (psql) => {
  await psql.query(
    "create unique index if not exists users_user_email on portfolio_backend.users (user_email)"
  );
  await psql.query(
    "create index if not exists certificates_user_id on portfolio_backend.certificates (user_id)"
  );
  await psql.query(
    "create index if not exists education_user_id on portfolio_backend.education (user_id)"
  );
  await psql.query(
    "create index if not exists projects_user_id on portfolio_backend.projects (user_id)"
  );
  await psql.query(
    "create index if not exists skills_user_id on portfolio_backend.skills (user_id)"
  );
  await psql.query(
    "create index if not exists work_experiences_user_id on portfolio_backend.work_experiences (user_id)"
  );

  await psql.query(
    "create index if not exists groups_name on split_backend.groups (name)"
  );
  await psql.query(
    "create index if not exists users_group_id on split_backend.users (group_id)"
  );
  await psql.query(
    "create index if not exists transactions_by on split_backend.transactions (by)"
  );
  await psql.query(
    "create index if not exists transaction_parts_transaction_id on split_backend.transaction_parts (transaction_id)"
  );
  await psql.query(
    "create index if not exists transaction_parts_user_id on split_backend.transaction_parts (user_id)"
  );
};

export default connectToPostgres;

export { sequelize, portfolio_backend, split_backend };
