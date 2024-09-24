import { jest } from '@jest/globals';

jest.mock('sequelize', () => {
  return {
    Sequelize: jest.fn((connStr) => {
      expect(connStr).toEqual('tests-postgres');
      return {
        define: jest.fn(),
        authenticate: jest.fn(),
        sync: jest.fn(({ alter, force }) => {
          expect(alter).toEqual(true);
          expect(force).toEqual(undefined);
        }),
        query: jest.fn(),
      };
    }),
    DataTypes: { INTEGER: 'INTEGER', STRING: 'STRING', ARRAY: () => {} },
  };
});

const { Sequelize } = await import('sequelize');

const { default: createCertificateModel } = await import(
  '../../../../../src/portfolio-backend/db/models/certificate.js'
);
const { default: createProjectModel } = await import(
  '../../../../../src/portfolio-backend/db/models/project.js'
);
const { default: createWorkExperienceModel } = await import(
  '../../../../../src/portfolio-backend/db/models/work-experience.js'
);
const { default: createEducationModel } = await import(
  '../../../../../src/portfolio-backend/db/models/education.js'
);
const { default: createSkillModel } = await import(
  '../../../../../src/portfolio-backend/db/models/skill.js'
);
const { default: createUserModel } = await import(
  '../../../../../src/portfolio-backend/db/models/user.js'
);

describe('TEST models init', () => {
  test('tests portfolio db models init', () => {
    const ss = new Sequelize('tests-postgres');
    const schemaName = 'tests-schemaname';

    createCertificateModel(ss, schemaName);
    createProjectModel(ss, schemaName);
    createWorkExperienceModel(ss, schemaName);
    createEducationModel(ss, schemaName);
    createSkillModel(ss, schemaName);
    createUserModel(ss, schemaName);

    expect(ss.define).toHaveBeenCalledTimes(6);
  });
});
