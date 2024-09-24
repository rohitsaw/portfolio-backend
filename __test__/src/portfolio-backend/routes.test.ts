import { jest } from '@jest/globals';
import request from 'supertest';
import express, { Request, Response } from 'express';

jest.unstable_mockModule(
  '../../../src/portfolio-backend/utils/validator.js',
  () => {
    return {
      __esModule: true,
      validateUserEmailInQuery: jest.fn((req, res, next: () => void) => {
        next();
      }),
      validateUserIdInQuery: jest.fn((req, res, next: () => void) => {
        console.log('validating userid in query');
        next();
      }),
    };
  }
);

jest.unstable_mockModule('../../../src/portfolio-backend/controller.js', () => {
  return {
    __esModule: true,
    getAllCertificates: jest.fn(),
    getAllProjects: jest.fn(),
    getAllEducations: jest.fn(),
    getAllExperiences: jest.fn(),
    getAllSkills: jest.fn(),
    getuser: jest.fn(),
  };
});

const { validateUserIdInQuery } = await import(
  '../../../src/portfolio-backend/utils/validator.js'
);

const { getAllCertificates } = await import(
  '../../../src/portfolio-backend/controller.js'
);

const { addRoutes } = await import('../../../src/portfolio-backend/routes.js');

describe('TEST portfolio routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should call all middleware', async () => {
    (
      getAllCertificates as jest.Mocked<typeof getAllCertificates>
    ).mockImplementation(async (_req: Request, res: Response) => {
      return res.status(200).send([]);
    });

    const app = express();
    addRoutes(app);

    const response = await request(app).get('/certificates');

    expect(validateUserIdInQuery).toHaveBeenCalled();
    expect(getAllCertificates).toHaveBeenCalled();
    expect(response.status).toBe(200);
  });
});
