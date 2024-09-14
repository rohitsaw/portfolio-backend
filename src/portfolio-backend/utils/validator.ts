import { body, query, validationResult } from "express-validator";

const validateUserIdInQuery = [
  query("user_id")
    .exists()
    .withMessage("User ID is required")
    .isInt({ min: 1 })
    .withMessage("User ID must be a positive integer"),
  (req: Request, res: any, next: any) => {
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
  (req: Request, res: any, next: any) => {
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
  (req: Request, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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
  (req: Request, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export {
  validateUserIdInQuery,
  validateUserEmailInQuery,
  validateIdInBody,
  validateUserEmailInBody,
};
