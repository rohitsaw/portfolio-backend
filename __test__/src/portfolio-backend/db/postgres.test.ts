import { jest } from '@jest/globals';

jest.mock('sequelize', () => {
  return {
    Sequelize: jest.fn((connStr) => {
      expect(connStr).toEqual('tests-postgres');
      return {
        authenticate: jest.fn(),
        sync: jest.fn(({ alter, force }) => {
          expect(alter).toEqual(true);
          expect(force).toEqual(undefined);
        }),
        query: jest.fn(),
      };
    }),
  };
});

jest.unstable_mockModule(
  '../../../../src/portfolio-backend/db/models/certificate.js',
  () => {
    return {
      __esModule: true,
      default: jest.fn(),
    };
  }
);
jest.unstable_mockModule(
  '../../../../src/portfolio-backend/db/models/project.js',
  () => {
    return {
      __esModule: true,
      default: jest.fn(),
    };
  }
);
jest.unstable_mockModule(
  '../../../../src/portfolio-backend/db/models/work-experience.js',
  () => {
    return {
      __esModule: true,
      default: jest.fn(),
    };
  }
);
jest.unstable_mockModule(
  '../../../../src/portfolio-backend/db/models/education.js',
  () => {
    return {
      __esModule: true,
      default: jest.fn(),
    };
  }
);

jest.unstable_mockModule(
  '../../../../src/portfolio-backend/db/models/skill.js',
  () => {
    return {
      __esModule: true,
      default: jest.fn(),
    };
  }
);
jest.unstable_mockModule(
  '../../../../src/portfolio-backend/db/models/user.js',
  () => {
    return {
      __esModule: true,
      default: jest.fn(),
    };
  }
);

const { default: initializePortfolioDB } = await import(
  '../../../../src/portfolio-backend/db/postgres.js'
);

const { Sequelize } = await import('sequelize');

const { default: createCertificateModel } = await import(
  '../../../../src/portfolio-backend/db/models/certificate.js'
);
const { default: createProjectModel } = await import(
  '../../../../src/portfolio-backend/db/models/project.js'
);
const { default: createWorkExperienceModel } = await import(
  '../../../../src/portfolio-backend/db/models/work-experience.js'
);
const { default: createEducationModel } = await import(
  '../../../../src/portfolio-backend/db/models/education.js'
);
const { default: createSkillModel } = await import(
  '../../../../src/portfolio-backend/db/models/skill.js'
);
const { default: createUserModel } = await import(
  '../../../../src/portfolio-backend/db/models/user.js'
);

describe('TEST PortfolioDB initialization', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('Should init initializeSplitDB', async () => {
    const ss = new Sequelize('tests-postgres');
    const schemaName = 'test-schema';
    await initializePortfolioDB(ss, schemaName);
    expect(createCertificateModel).toHaveBeenCalledWith(ss, schemaName);
    expect(createProjectModel).toHaveBeenCalledWith(ss, schemaName);
    expect(createWorkExperienceModel).toHaveBeenCalledWith(ss, schemaName);
    expect(createEducationModel).toHaveBeenCalledWith(ss, schemaName);
    expect(createSkillModel).toHaveBeenCalledWith(ss, schemaName);
    expect(createUserModel).toHaveBeenCalledWith(ss, schemaName);
  });

  test('Should log error in initializeSplitDB', async () => {
    (createUserModel as jest.Mocked<typeof createUserModel>).mockImplementation(
      () => {
        throw new Error('Error in creating model');
      }
    );

    const ss = new Sequelize('tests-postgres');
    const schemaName = 'test-schema';
    await initializePortfolioDB(ss, schemaName);
  });
});
