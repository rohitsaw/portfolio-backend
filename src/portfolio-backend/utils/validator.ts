import { NextFunction, Request, Response } from "express";
import { body, query, validationResult } from "express-validator";

const validateUserIdInQuery = [
  query("user_id")
    .exists()
    .withMessage("User ID is required")
    .isInt({ min: 1 })
    .withMessage("User ID must be a positive integer"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUserEmailInQuery = [
  query("user_email")
    .exists()
    .withMessage("User Email is required")
    .isEmail()
    .withMessage("User ID must be a valid email"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateUserEmailInBody = [
  body("user_email")
    .exists()
    .withMessage("User Email is required")
    .isEmail()
    .withMessage("User ID must be a valid email"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];

const validateIdInBody = [
  body("id")
    .exists()
    .withMessage("id required")
    .isInt({ min: 1 })
    .withMessage("id must be a positive integer"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];

const validateProjectInBody = [
  body("project_name").exists().withMessage("project_name is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];

const validateSkillInBody = [
  body("skill_name").exists().withMessage("skill_name is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];

const validateCertificateInBody = [
  body("certificate_name")
    .exists()
    .withMessage("certificate_name is required.")
    .notEmpty(),
  body("certification_authority")
    .exists()
    .withMessage("certification_authority is required.")
    .notEmpty(),
  body("certification_date")
    .exists()
    .withMessage("certification_date is required.")
    .notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];

const validateEducationInBody = [
  body("institute_name").exists().notEmpty(),
  body("degree_name").exists().notEmpty(),
  body("start_date").exists().notEmpty(),
  body("end_date").exists().notEmpty(),
  body("score").exists().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];

const validateExperienceInBody = [
  body("company_name").exists().notEmpty(),
  body("designation").exists().notEmpty(),
  body("start_date").exists().notEmpty(),
  body("end_date").exists().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];

export {
  validateUserIdInQuery,
  validateUserEmailInQuery,
  validateIdInBody,
  validateUserEmailInBody,
  validateProjectInBody,
  validateSkillInBody,
  validateCertificateInBody,
  validateEducationInBody,
  validateExperienceInBody,
};
