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

vi.mock('../../../src/portfolio-backend/controller.js', () => {
  return {
    addProjects: vi.fn(),
    addEducations: vi.fn(),
    addCertificates: vi.fn(),
    addExperiences: vi.fn(),
    addSkills: vi.fn(),
    deleteProjects: vi.fn(),
    deleteEducations: vi.fn(),
    deleteCertificates: vi.fn(),
    deleteExperiences: vi.fn(),
    deleteSkills: vi.fn(),
    addOrUpdateUser: vi.fn(),
  };
});

vi.mock('../../../src/portfolio-backend/db/queries/user.js', () => {
  return {
    getUserIdFromEmail: vi.fn(),
  };
});

vi.mock('../../../src/portfolio-backend/utils/validator.js', () => {
  return {
    validateIdInBody: vi.fn(),
    validateUserIdInQuery: vi.fn((req, res, next: Function) => next()),
    validateUserEmailInBody: vi.fn(),
    validateProjectInBody: vi.fn((req, res, next: Function) => next()),
    validateSkillInBody: vi.fn(),
    validateCertificateInBody: vi.fn(),
    validateEducationInBody: vi.fn(),
    validateExperienceInBody: vi.fn(),
  };
});

const { addProjects } = await import('../../../src/portfolio-backend/controller.js');

vi.mock('passport-google-oauth20', () => {
  return {
    Strategy: vi.fn(),
    Profile: {},
    VerifyCallback: vi.fn(),
  };
});

vi.mock('passport', () => {
  return {
    default: {
      use: vi.fn(),
      serializeUser: vi.fn(),
      deserializeUser: vi.fn(),
    },
  };
});

vi.mock('../../../src/portfolio-backend/utils/auth-check.js', () => {
  return {
    checkAuthenticated: vi.fn((req, res, next: Function) => next()),
  };
});

const { addRoutes } = await import('../../../src/portfolio-backend/protected-routes.js');

describe('Protected Routes Test', () => {
  let res = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
  } as any as Response;

  beforeEach(() => {
    vi.resetAllMocks();
    res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as any as Response;
  });

  test('protected route should return success', async () => {
    const app = express();
    app.use(express.json());
    
    // Mock addProjects to return immediately
    (addProjects as Mock).mockImplementation(async (_req: Request, res: Response) => {
      return res.status(200).send({ success: true });
    });
    
    addRoutes(app);
    
    const response = await request(app)
      .post('/projects')
      .query({ user_id: 1 })
      .send({ project_name: 'Test Project' });
      
    expect(addProjects).toHaveBeenCalled();
    expect(response.status).toBe(200);
  }, 10000); // Increase timeout to 10 seconds

  test('test express routes - addProjects', async () => {
    (addProjects as Mock).mockImplementation(
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
