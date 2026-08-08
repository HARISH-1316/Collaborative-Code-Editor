import ExpressError from "./utils/ExpressError.js";
import { signupSchema, loginSchema } from "./validators/userValidation.js";
import {
  createRoomSchema,
  editRoomSchema,
} from "./validators/roomValidation.js";

/* ==========================
   Authentication
========================== */

export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    success: false,
    code: "NOT_AUTHENTICATED",
    message: "User is not authenticated",
  });
};

/* ==========================
   User Validation
========================== */

export const validateSignup = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);

  if (error) {
    const message = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, message);
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    const message = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, message);
  }

  next();
};

/* ==========================
   Room Validation
========================== */

export const validateCreateRoom = (req, res, next) => {
  const { error } = createRoomSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = {};

    error.details.forEach((err) => {
      errors[err.path[0]] = err.message;
    });

    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

export const validateEditRoom = (req, res, next) => {
  const { error } = editRoomSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = {};

    error.details.forEach((err) => {
      errors[err.path[0]] = err.message;
    });

    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};
