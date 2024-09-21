import { Sequelize } from 'sequelize';

import connectToPortfolioDB from './portfolio-backend/db/postgres.js';
import connectToSplitDB from './split-backend/db/postgres.js';

class DBConnection {
  static portfolio_backend: string = 'portfolio_backend';
  static split_backend: string = 'split_backend';

  static #connStr: string;
  static #sequelize: Sequelize;

  constructor(connStr: string) {
    console.log('Creating DB instance.');
    DBConnection.#connStr = connStr;
    DBConnection.#sequelize = new Sequelize(DBConnection.#connStr);
  }

  static getSequelize(): Sequelize {
    return DBConnection.#sequelize;
  }

  async init() {
    await DBConnection.#sequelize.authenticate();
    console.log('Connection has been verified.');

    await connectToPortfolioDB(
      DBConnection.#sequelize,
      DBConnection.portfolio_backend
    );
    await connectToSplitDB(DBConnection.#sequelize, DBConnection.split_backend);
    await DBConnection.#sequelize.sync({ alter: true });
    await this.#createIndexes();

    console.log('Database Sync Done for all DB');
  }

  async #createIndexes() {
    const psql: Sequelize = DBConnection.#sequelize;
    await psql.query(
      'create unique index if not exists users_user_email on portfolio_backend.users (user_email)'
    );
    await psql.query(
      'create index if not exists certificates_user_id on portfolio_backend.certificates (user_id)'
    );
    await psql.query(
      'create index if not exists education_user_id on portfolio_backend.education (user_id)'
    );
    await psql.query(
      'create index if not exists projects_user_id on portfolio_backend.projects (user_id)'
    );
    await psql.query(
      'create index if not exists skills_user_id on portfolio_backend.skills (user_id)'
    );
    await psql.query(
      'create index if not exists work_experiences_user_id on portfolio_backend.work_experiences (user_id)'
    );

    await psql.query(
      'create index if not exists groups_name on split_backend.groups (name)'
    );
    await psql.query(
      'create index if not exists users_group_id on split_backend.users (group_id)'
    );
    await psql.query(
      'create index if not exists transactions_by on split_backend.transactions (by)'
    );
    await psql.query(
      'create index if not exists transaction_parts_transaction_id on split_backend.transaction_parts (transaction_id)'
    );
    await psql.query(
      'create index if not exists transaction_parts_user_id on split_backend.transaction_parts (user_id)'
    );
  }
}

if (!process.env.postgresConnStr) {
  throw new Error(`postgresConnStr env variable not set`);
}

const db: DBConnection = new DBConnection(process.env.postgresConnStr!);
await db.init();

export const sequelize: Sequelize = DBConnection.getSequelize();
export const portfolio_backend = DBConnection.portfolio_backend;
export const split_backend = DBConnection.split_backend;
