import { vi, describe, test, beforeEach, expect, Mock } from 'vitest';
import request from 'supertest';
import express, { Request, Response } from 'express';

vi.mock('../../../src/@rsaw409/logger.js', () => {
  return {
    default: {
      error: vi.fn(),
      info: vi.fn(),
    },
  };
});

vi.mock('../../../src/portfolio-backend/utils/validator.js', () => {
  return {
    validateUserEmailInQuery: vi.fn((req, res, next: () => void) => {
      next();
    }),
    validateUserIdInQuery: vi.fn((req, res, next: () => void) => {
      next();
    }),
  };
});

vi.mock('../../../src/portfolio-backend/controller.js', () => {
  return {
    getAllCertificates: vi.fn(),
    getAllEducations: vi.fn(),
    getAllExperiences: vi.fn(),
    getAllProjects: vi.fn(),
    getAllSkills: vi.fn(),
    getuser: vi.fn(),
  };
});

const { validateUserIdInQuery } = await import('../../../src/portfolio-backend/utils/validator.js');
const {
  getAllCertificates,
  getAllEducations,
  getAllExperiences,
  getAllProjects,
  getAllSkills,
  getuser,
} = await import('../../../src/portfolio-backend/controller.js');
const { addRoutes } = await import('../../../src/portfolio-backend/routes.js');

describe('TEST routes', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('test express routes - getAllCertificates', async () => {
    (getAllCertificates as Mock).mockImplementation(async (_req: Request, res: Response) => {
      return res.status(200).send([]);
    });
    const app = express();
    addRoutes(app);
    const response = await request(app).get('/certificates');
    expect(validateUserIdInQuery).toHaveBeenCalled();
    expect(getAllCertificates).toHaveBeenCalled();
    expect(response.status).toBe(200);
  });

  test('test express routes - getAllEducations', async () => {
    (getAllEducations as Mock).mockImplementation(async (_req: Request, res: Response) => {
      return res.status(200).send([]);
    });
    const app = express();
    addRoutes(app);
    const response = await request(app).get('/educations');
    expect(getAllEducations).toHaveBeenCalled();
    expect(response.status).toBe(200);
  });

  test('test express routes - getAllExperiences', async () => {
    (getAllExperiences as Mock).mockImplementation(async (_req: Request, res: Response) => {
      return res.status(200).send([]);
    });
    const app = express();
    addRoutes(app);
    const response = await request(app).get('/experiences');
    expect(getAllExperiences).toHaveBeenCalled();
    expect(response.status).toBe(200);
  });

  test('test express routes - getAllProjects', async () => {
    (getAllProjects as Mock).mockImplementation(async (_req: Request, res: Response) => {
      return res.status(200).send([]);
    });
    const app = express();
    addRoutes(app);
    const response = await request(app).get('/projects');
    expect(getAllProjects).toHaveBeenCalled();
    expect(response.status).toBe(200);
  });

  test('test express routes - getAllSkills', async () => {
    (getAllSkills as Mock).mockImplementation(async (_req: Request, res: Response) => {
      return res.status(200).send([]);
    });
    const app = express();
    addRoutes(app);
    const response = await request(app).get('/skills');
    expect(getAllSkills).toHaveBeenCalled();
    expect(response.status).toBe(200);
  });

  test('test express routes - getuser', async () => {
    (getuser as Mock).mockImplementation(async (_req: Request, res: Response) => {
      return res.status(200).send([]);
    });
    const app = express();
    addRoutes(app);
    const response = await request(app).get('/user');
    expect(getuser).toHaveBeenCalled();
    expect(response.status).toBe(200);
  });
});
