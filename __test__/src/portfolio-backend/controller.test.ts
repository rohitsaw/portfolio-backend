import { vi, expect, describe, test, beforeEach, Mock } from 'vitest';
import { Request, Response } from 'express';

vi.mock('../../../src/@rsaw409/logger.js', () => {
  return {
    default: {
      error: vi.fn(),
      info: vi.fn(),
    },
  };
});

vi.mock(
  '../../../src/portfolio-backend/db/queries/project.js',
  () => {
    return {
      getAllProjects: vi.fn(),
      addProjects: vi.fn(),
      deleteProjects: vi.fn(),
    };
  }
);

vi.mock(
  '../../../src/portfolio-backend/db/queries/education.js',
  () => {
    return {
      getAllEducations: vi.fn(),
      addEducations: vi.fn(),
      deleteEducations: vi.fn(),
    };
  }
);
vi.mock(
  '../../../src/portfolio-backend/db/queries/certificate.js',
  () => {
    return {
      getAllCertificates: vi.fn(),
      addCertificates: vi.fn(),
      deleteCertificates: vi.fn(),
    };
  }
);
vi.mock(
  '../../../src/portfolio-backend/db/queries/skill.js',
  () => {
    return {
      addSkills: vi.fn(),
      getAllSkills: vi.fn(),
      deleteSkills: vi.fn(),
    };
  }
);
vi.mock(
  '../../../src/portfolio-backend/db/queries/user.js',
  () => {
    return {
      getuser: vi.fn(),
      addOrUpdateUser: vi.fn(),
      getUserIdFromEmail: vi.fn(),
    };
  }
);
vi.mock(
  '../../../src/portfolio-backend/db/queries/work-experience.js',
  () => {
    return {
      getAllExperiences: vi.fn(),
      addExperiences: vi.fn(),
      deleteExperiences: vi.fn(),
    };
  }
);

vi.mock('../../../src/@rsaw409/supabase.js', () => {
  return {
    default: {
      uploadFileToSupabse: vi.fn(),
      deleteFileFromSupabase: vi.fn(),
    },
  };
});

const {
  getAllProjects: getAllProjectsFromDb,
  deleteProjects: deleteProjectsInDb,
  addProjects: addProjectsInDb,
} = await import('../../../src/portfolio-backend/db/queries/project.js');

const {
  getAllSkills: getAllSkillsFromDb,
  addSkills: addSkillsInDb,
  deleteSkills: deleteSkillsInDb,
} = await import('../../../src/portfolio-backend/db/queries/skill.js');

const { getuser: getuserFromDb, addOrUpdateUser: addOrUpdateUserInDB } =
  await import('../../../src/portfolio-backend/db/queries/user.js');

const {
  getAllExperiences: getAllExperiencesFromDb,
  addExperiences: addExperiencesInDb,
  deleteExperiences: deleteExperiencesInDb,
} = await import(
  '../../../src/portfolio-backend/db/queries/work-experience.js'
);

const {
  getAllCertificates: getAllCertificatesFromDb,
  addCertificates: addCertificatesInDb,
  deleteCertificates: deleteCertificatesInDb,
} = await import('../../../src/portfolio-backend/db/queries/certificate.js');

const {
  getAllEducations: getAllEducationsFromDb,
  addEducations: addEducationsInDb,
  deleteEducations: deleteEducationsInDb,
} = await import('../../../src/portfolio-backend/db/queries/education.js');

const {
  getAllCertificates,
  getAllProjects,
  getAllEducations,
  getAllExperiences,
  getAllSkills,
  getuser,

  // Add Controllers
  addProjects,
  addSkills,
  addCertificates,
  addEducations,
  addExperiences,
  addOrUpdateUser,

  // Delete Controllers
  deleteProjects,
  deleteSkills,
  deleteCertificates,
  deleteEducations,
  deleteExperiences,
} = await import('../../../src/portfolio-backend/controller.js');

describe('TESTING portfolio-backend controllers', () => {
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

  test('getAllCertificates should return success', async () => {
    let req = {
      query: { user_id: 1 },
    } as any as Request;

    await getAllCertificates(req, res);
    expect(getAllCertificatesFromDb).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
  test('getAllEducations should return success', async () => {
    let req = {
      query: { user_id: 1 },
    } as any as Request;

    await getAllEducations(req, res);
    expect(getAllEducationsFromDb).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
  test('getAllExperiences should return success', async () => {
    let req = {
      query: { user_id: 1 },
    } as any as Request;

    await getAllExperiences(req, res);
    expect(getAllExperiencesFromDb).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
  test('getAllProjects should return success', async () => {
    let req = {
      query: { user_id: 1 },
    } as any as Request;

    await getAllProjects(req, res);
    expect(getAllProjectsFromDb).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
  test('getAllSkills should return success', async () => {
    let req = {
      query: { user_id: 1 },
    } as any as Request;

    await getAllSkills(req, res);
    expect(getAllSkillsFromDb).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  test('getuser should return success', async () => {
    let req = {
      query: { user_email: 'test@test.com' },
      headers: {},
    } as any as Request;

    await getuser(req, res);
    expect(getuserFromDb).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
  test('addProjects should return success', async () => {
    let req = {
      query: { user_id: 1 },
      body: {},
    } as any as Request;

    await addProjects(req, res);
    expect(addProjectsInDb).toHaveBeenCalledWith({ user_id: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
  test('deleteProjects should return success', async () => {
    let req = {
      query: { user_id: 1 },
      body: {},
    } as any as Request;

    await deleteProjects(req, res);
    expect(deleteProjectsInDb).toHaveBeenCalledWith({ user_id: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
  test('addSkills should return success', async () => {
    let req = {
      query: { user_id: 1 },
      body: {},
    } as any as Request;

    await addSkills(req, res);
    expect(addSkillsInDb).toHaveBeenCalledWith({ user_id: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  test('deleteSkills should return success', async () => {
    let req = {
      query: { user_id: 1 },
      body: {},
    } as any as Request;

    await deleteSkills(req, res);
    expect(deleteSkillsInDb).toHaveBeenCalledWith({ user_id: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
  test('addCertificates should return success', async () => {
    let req = {
      query: { user_id: 1 },
      body: {},
    } as any as Request;

    await addCertificates(req, res);
    expect(addCertificatesInDb).toHaveBeenCalledWith({ user_id: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  test('deleteCertificates should return success', async () => {
    let req = {
      query: { user_id: 1 },
      body: {},
    } as any as Request;

    await deleteCertificates(req, res);
    expect(deleteCertificatesInDb).toHaveBeenCalledWith({ user_id: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
  test('addEducations should return success', async () => {
    let req = {
      query: { user_id: 1 },
      body: {},
    } as any as Request;

    await addEducations(req, res);
    expect(addEducationsInDb).toHaveBeenCalledWith({ user_id: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  test('deleteEducations should return success', async () => {
    let req = {
      query: { user_id: 1 },
      body: {},
    } as any as Request;

    await deleteEducations(req, res);
    expect(deleteEducationsInDb).toHaveBeenCalledWith({ user_id: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
  test('addExperiences should return success', async () => {
    let req = {
      query: { user_id: 1 },
      body: {},
    } as any as Request;

    await addExperiences(req, res);
    expect(addExperiencesInDb).toHaveBeenCalledWith({ user_id: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  test('deleteExperiences should return success', async () => {
    let req = {
      query: { user_id: 1 },
      body: {},
    } as any as Request;

    await deleteExperiences(req, res);
    expect(deleteExperiencesInDb).toHaveBeenCalledWith({ user_id: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
  test('addOrUpdateUser should return success', async () => {
    let req = {
      file: {
        buffer: '',
      },
      query: { user_id: 1 },
      body: {
        user_email: 'rsaw409@Gmail.com',
      },
    } as any as Request;

    await addOrUpdateUser(req, res);
    expect(addOrUpdateUserInDB).toHaveBeenCalledWith(expect.any(Object), 1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
});

describe('TESTING portfolio-backend controller errors', () => {
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

  test('getAllCertificates should return error', async () => {
    let req = {
      query: {},
      body: {},
    } as any as Request;
    (getAllCertificatesFromDb as Mock).mockImplementation(
      () => {
        throw new Error();
      }
    );
    getAllCertificates(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('getAllProjects should return error', async () => {
    let req = {
      query: {},
      body: {},
    } as any as Request;
    (getAllProjectsFromDb as Mock).mockImplementation(() => {
      throw new Error();
    });
    getAllProjects(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('getAllEducations should return error', async () => {
    let req = {
      query: {},
      body: {},
    } as any as Request;
    (getAllEducationsFromDb as Mock).mockImplementation(() => {
      throw new Error();
    });
    getAllEducations(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('getAllExperiences should return error', async () => {
    let req = {
      query: {},
      body: {},
    } as any as Request;
    (getAllExperiencesFromDb as Mock).mockImplementation(() => {
      throw new Error();
    });
    getAllExperiences(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('getAllSkills should return error', async () => {
    let req = {
      query: {},
      body: {},
    } as any as Request;
    (getAllSkillsFromDb as Mock).mockImplementation(() => {
      throw new Error();
    });
    getAllSkills(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('getuser should return error', async () => {
    let req = {
      query: {},
      body: {},
    } as any as Request;
    (getuserFromDb as Mock).mockImplementation(() => {
      throw new Error();
    });
    getuser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('addProjects should return error', async () => {
    let req = {
      query: {},
      body: {},
    } as any as Request;
    (addProjectsInDb as Mock).mockImplementation(() => {
      throw new Error();
    });
    addProjects(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('deleteProjects should return error', async () => {
    let req = {
      query: {},
      body: {},
    } as any as Request;
    (deleteProjectsInDb as Mock).mockImplementation(() => {
      throw new Error();
    });
    deleteProjects(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('addSkills should return error', async () => {
    let req = {
      query: {},
      body: {},
    } as any as Request;
    (addSkillsInDb as Mock).mockImplementation(() => {
      throw new Error();
    });
    addSkills(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test('deleteSkills should return error', async () => {
    let req = {
      query: {},
      body: {},
    } as any as Request;
    (deleteSkillsInDb as Mock).mockImplementation(() => {
      throw new Error();
    });
    deleteSkills(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });
  test('addCertificates should return error', async () => {
    let req = {
      query: {},
      body: {},
    } as any as Request;
    (addCertificatesInDb as Mock).mockImplementation(() => {
      throw new Error();
    });
    addCertificates(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });
  test('deleteCertificates should return error', async () => {
    let req = {
      query: {},
      body: {},
    } as any as Request;
    (deleteCertificatesInDb as Mock).mockImplementation(() => {
      throw new Error();
    });
    deleteCertificates(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });
  test('addEducations should return error', async () => {
    let req = {
      query: {},
      body: {},
    } as any as Request;
    (addEducationsInDb as Mock).mockImplementation(() => {
      throw new Error();
    });
    addEducations(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });
  test('deleteEducations should return error', async () => {
    let req = {
      query: {},
      body: {},
    } as any as Request;
    (deleteEducationsInDb as Mock).mockImplementation(() => {
      throw new Error();
    });
    deleteEducations(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });
  test('addExperiences should return error', async () => {
    let req = {
      query: {},
      body: {},
    } as any as Request;
    (addExperiencesInDb as Mock).mockImplementation(() => {
      throw new Error();
    });
    addExperiences(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });
  test('deleteExperiences should return error', async () => {
    let req = {
      query: {},
      body: {},
    } as any as Request;
    (deleteExperiencesInDb as Mock).mockImplementation(() => {
      throw new Error();
    });
    deleteExperiences(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });
  test('addOrUpdateUser should return error', async () => {
    let req = {
      query: {},
      body: {},
    } as any as Request;
    (addOrUpdateUserInDB as Mock).mockImplementation(() => {
      throw new Error();
    });
    addOrUpdateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });
});
