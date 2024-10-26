import { jest } from '@jest/globals';

jest.mock('sequelize', () => {
  return {
    QueryTypes: {
      SELECT: 'SELECT',
    },
  };
});

jest.unstable_mockModule('../../../../../src/postgres.js', () => {
  return {
    __esModule: true,
    default: {
      getSequelize: jest.fn(() => {
        return {
          models: {
            users: {
              findOrCreate: jest.fn(() => [{}]),
              findOne: jest.fn(() => {
                return {
                  name: '',
                  save: jest.fn(),
                };
              }),
            },
            work_experiences: {
              create: jest.fn((p) => {
                expect(p).toHaveProperty('user_id');
              }),
              destroy: jest.fn((p) => {
                expect(p).toHaveProperty(
                  'where',
                  expect.objectContaining({ id: expect.any(Number) })
                );
              }),
            },
            skills: {
              destroy: jest.fn((p) => {
                expect(p).toHaveProperty(
                  'where',
                  expect.objectContaining({ id: expect.any(Number) })
                );
              }),
              create: jest.fn((p) => {
                expect(p).toHaveProperty('user_id', expect.any(Number));
              }),
            },
            projects: {
              destroy: jest.fn((p) => {
                expect(p).toHaveProperty(
                  'where',
                  expect.objectContaining({ id: expect.any(Number) })
                );
              }),
              create: jest.fn((p) => {
                expect(p).toHaveProperty('user_id', expect.any(Number));
              }),
            },
            education: {
              destroy: jest.fn((p) => {
                expect(p).toHaveProperty(
                  'where',
                  expect.objectContaining({ id: expect.any(Number) })
                );
              }),
              create: jest.fn((p) => {
                expect(p).toHaveProperty('user_id', expect.any(Number));
              }),
            },
            certificates: {
              destroy: jest.fn((p) => {
                expect(p).toHaveProperty(
                  'where',
                  expect.objectContaining({ id: expect.any(Number) })
                );
              }),
              create: jest.fn((p) => {
                expect(p).toHaveProperty('user_id', expect.any(Number));
              }),
            },
          },
          query: jest.fn((sql, options) => {
            expect(typeof sql).toEqual('string');
            return [];
          }),
        };
      }),
      split_backend: 'split_backend',
      portfolio_backend: 'portfolio_backend',
    },
  };
});

const { getAllExperiences, addExperiences, deleteExperiences } = await import(
  '../../../../../src/portfolio-backend/db/queries/work-experience.js'
);
const { getAllCertificates, addCertificates, deleteCertificates } =
  await import(
    '../../../../../src/portfolio-backend/db/queries/certificate.js'
  );
const { getAllEducations, addEducations, deleteEducations } = await import(
  '../../../../../src/portfolio-backend/db/queries/education.js'
);
const { addSkills, getAllSkills, deleteSkills } = await import(
  '../../../../../src/portfolio-backend/db/queries/skill.js'
);
const { getuser, addOrUpdateUser, getUserIdFromEmail, findOrCreateUser } =
  await import('../../../../../src/portfolio-backend/db/queries/user.js');

const { getAllProjects, addProjects, deleteProjects } = await import(
  '../../../../../src/portfolio-backend/db/queries/project.js'
);

describe('TEST portfolio DB Experience queries', () => {
  test('TEST getAllExperiences', async () => {
    await getAllExperiences(1);
  });
  test('TEST deleteExperiences', async () => {
    await deleteExperiences(
      {
        id: 1,
        company_name: 'test',
        designation: 'test',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        details: 'details',
      },
      1
    );
  });
  test('TEST addExperiences with id', async () => {
    await addExperiences(
      {
        id: 1,
        company_name: 'test',
        designation: 'test',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        details: 'details',
      },
      1
    );
  });
  test('TEST addExperiences without id for update', async () => {
    await addExperiences(
      {
        company_name: 'test',
        designation: 'test',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        details: 'details',
      },
      1
    );
  });
});

describe('TEST portfolio DB User queries', () => {
  test('TEST getuser', async () => {
    await getuser('rsaw409@gmail.com');
  });

  test('TEST getuser with name', async () => {
    await getuser('rsaw409@gmail.com', 'Rohit Saw');
  });

  test('TEST addOrUpdateUser', async () => {
    await addOrUpdateUser(
      {
        user_email: 'rsaw409@gmail.com',
        name: 'rohit',
        about: 'NA',
        profile_url: '',
        social_links: [],
      },
      1
    );
  });

  test('TEST addOrUpdateUser with profile_url', async () => {
    await addOrUpdateUser(
      {
        user_email: 'rsaw409@gmail.com',
        name: 'rohit',
        about: 'NA',
        profile_url: 'https://image.com',
        social_links: [],
      },
      1
    );
  });

  test('TEST getUserIdFromEmail', async () => {
    await getUserIdFromEmail('rsaw409@gmail.com');
  });

  test('TEST findOrCreateUser', async () => {
    await findOrCreateUser({ email: 'rsaw409@gmail.com', name: 'Rohit' });
  });
});

describe('TEST portfolio DB Skill queries', () => {
  test('TEST getAllSkills', async () => {
    await getAllSkills(1);
  });

  test('TEST addSkills - update', async () => {
    await addSkills(
      {
        id: 1,
        skill_name: 'Javascript',
        skill_category: 'backend',
        skill_proficiency: 90,
      },
      1
    );
  });

  test('TEST addSkills - create', async () => {
    await addSkills(
      {
        skill_name: 'Javascript',
        skill_category: 'backend',
        skill_proficiency: 90,
      },
      1
    );
  });

  test('TEST deleteSkills', async () => {
    await deleteSkills(
      {
        id: 1,
        skill_name: 'Javascript',
        skill_category: 'backend',
        skill_proficiency: 90,
      },
      1
    );
  });
});

describe('TEST portfolio DB Projects queries', () => {
  test('TEST getAllProjects', async () => {
    await getAllProjects(1);
  });

  test('TEST addProjects - update', async () => {
    await addProjects(
      {
        id: 1,
        project_name: 'Javascript',
        project_description: 'backend',
        github_url: '',
        web_url: '',
        play_store_url: '',
        technology_tags: [],
      },
      1
    );
  });

  test('TEST addProjects - create', async () => {
    await addProjects(
      {
        project_name: 'Javascript',
        project_description: 'backend',
        github_url: '',
        web_url: '',
        play_store_url: '',
        technology_tags: [],
      },
      1
    );
  });

  test('TEST deleteProjects', async () => {
    await deleteProjects(
      {
        id: 1,
        project_name: 'Javascript',
        project_description: 'backend',
        github_url: '',
        web_url: '',
        play_store_url: '',
        technology_tags: [],
      },
      1
    );
  });
});

describe('TEST portfolio DB Education queries', () => {
  test('TEST getAllEducations', async () => {
    await getAllEducations(1);
  });

  test('TEST addEducations - update', async () => {
    await addEducations(
      {
        id: 1,
        institute_name: '',
        degree_name: '',
        start_date: '',
        end_date: '',
        score: 90,
      },
      1
    );
  });

  test('TEST addEducations - create', async () => {
    await addEducations(
      {
        institute_name: '',
        degree_name: '',
        start_date: '',
        end_date: '',
        score: 90,
      },
      1
    );
  });

  test('TEST deleteEducations', async () => {
    await deleteEducations(
      {
        id: 1,
        institute_name: '',
        degree_name: '',
        start_date: '',
        end_date: '',
        score: 90,
      },
      1
    );
  });
});

describe('TEST portfolio DB Certificate queries', () => {
  test('TEST getAllCertificates', async () => {
    await getAllCertificates(1);
  });

  test('TEST addCertificates - update', async () => {
    await addCertificates(
      {
        id: 1,
        certificate_name: '',
        certificate_description: '',
        certification_authority: '',
        certification_date: '',
        certification_expiry: '',
        verification_url: '',
        technology_tags: [''],
      },
      1
    );
  });

  test('TEST addCertificates - create', async () => {
    await addCertificates(
      {
        certificate_name: '',
        certificate_description: '',
        certification_authority: '',
        certification_date: '',
        certification_expiry: '',
        verification_url: '',
        technology_tags: [''],
      },
      1
    );
  });

  test('TEST deleteCertificates', async () => {
    await deleteCertificates(
      {
        id: 1,
        certificate_name: '',
        certificate_description: '',
        certification_authority: '',
        certification_date: '',
        certification_expiry: '',
        verification_url: '',
        technology_tags: [''],
      },
      1
    );
  });
});
