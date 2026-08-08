import Joi from "joi";

/* ==========================
   Signup Validation
========================== */

export const signupSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required(),

  email: Joi.string().trim().lowercase().email().required(),

  phone: Joi.string()
    .trim()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid 10-digit Indian mobile number.",
    }),

  password: Joi.string().min(6).max(128).required(),
});

/* ==========================
   Login Validation
========================== */

export const loginSchema = Joi.object({
  username: Joi.string().trim().required(),

  password: Joi.string().required(),
});

/* ==========================
   Update User Validation
========================== */

export const updateUserSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30),

  email: Joi.string().trim().lowercase().email(),

  phone: Joi.string()
    .trim()
    .pattern(/^[6-9]\d{9}$/)
    .messages({
      "string.pattern.base":
        "Phone number must be a valid 10-digit Indian mobile number.",
    }),
}).min(1);
