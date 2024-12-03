import { jest } from '@jest/globals';
import request from 'supertest';
import express, { Request, Response } from 'express';


jest.unstable_mockModule('../../../src/@rsaw409/logger.js', () => {
  return {
    __esModule: true,
    default: {
      error: jest.fn(),
      info: jest.fn(),
    },
  };
});

jest.unstable_mockModule('../../../src/portfolio-backend/controller.js', () => {
  return {
    addProjects: jest.fn(),
    addEducations: jest.fn(),
    addCertificates: jest.fn(),
    addExperiences: jest.fn(),
    addSkills: jest.fn(),
    deleteProjects: jest.fn(),
    deleteEducations: jest.fn(),
    deleteCertificates: jest.fn(),
    deleteExperiences: jest.fn(),
    deleteSkills: jest.fn(),
    addOrUpdateUser: jest.fn(),
  };
});

jest.unstable_mockModule(
  '../../../src/portfolio-backend/db/queries/user.js',
  () => {
    return {
      getUserIdFromEmail: jest.fn(),
    };
  }
);

jest.unstable_mockModule(
  '../../../src/portfolio-backend/utils/validator.js',
  () => {
    return {
      validateIdInBody: jest.fn(),
      validateUserIdInQuery: jest.fn((req, res, next: Function) => next()),
      validateUserEmailInBody: jest.fn(),
      validateProjectInBody: jest.fn((req, res, next: Function) => next()),
      validateSkillInBody: jest.fn(),
      validateCertificateInBody: jest.fn(),
      validateEducationInBody: jest.fn(),
      validateExperienceInBody: jest.fn(),
    };
  }
);

const { addProjects } = await import(
  '../../../src/portfolio-backend/controller.js'
);

jest.mock('passport-google-oauth20', () => {
  return {
    Strategy: jest.fn(),
    Profile: {},
    VerifyCallback: jest.fn(),
  };
});

jest.unstable_mockModule('passport', () => {
  return {
    __esModule: true,
    default: {
      use: jest.fn(),
      serializeUser: jest.fn(),
      deserializeUser: jest.fn(),
    },
  };
});

jest.unstable_mockModule('../../../src/portfolio-backend/utils/auth-check.js', () => {
  return {
    checkAuthenticated: jest.fn((req, res, next: Function) => next()),
  };
});

const { addRoutes } = await import(
  '../../../src/portfolio-backend/protected-routes.js'
);

describe('TEST portfolio protected-routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('test express routes', async () => {
    (addProjects as jest.Mocked<typeof addProjects>).mockImplementation(
      async (_req: Request, res: Response) => {
        return res.status(200).send([]);
      }
    );

    const app = express();
    addRoutes(app);

    const response = await request(app).post('/projects');
    expect(response.status).toBe(200);
  });
});
