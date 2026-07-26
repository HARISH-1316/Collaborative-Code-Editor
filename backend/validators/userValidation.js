import Joi from "joi";

export const userSchema = Joi.object({
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

  myRooms: Joi.array().items(
    Joi.object({
      room: Joi.string().hex().length(24).required(),

      createdAt: Joi.date(),
    }),
  ),

  recentRooms: Joi.array().items(
    Joi.object({
      room: Joi.string().hex().length(24).required(),

      joinedAt: Joi.date(),
    }),
  ),
});
