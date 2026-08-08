import Joi from "joi";

/* ==========================
   Create Room Validation
========================== */

export const createRoomSchema = Joi.object({
  roomName: Joi.string().trim().min(3).max(50).required().messages({
    "string.empty": "Room name is required.",
    "string.min": "Room name must be at least 3 characters long.",
    "string.max": "Room name cannot exceed 50 characters.",
    "any.required": "Room name is required.",
  }),

  fileName: Joi.string().trim().min(3).max(100).required().messages({
    "string.empty": "File name is required.",
    "string.min": "File name must be at least 3 characters long.",
    "string.max": "File name cannot exceed 100 characters.",
    "any.required": "File name is required.",
  }),

  language: Joi.string()
    .valid("javascript", "java", "cpp", "c", "python")
    .required()
    .messages({
      "any.only":
        "Language must be one of javascript, java, cpp, c, or python.",
      "any.required": "Language is required.",
    }),
});

/* ==========================
   Edit Room Validation
========================== */

export const editRoomSchema = Joi.object({
  roomName: Joi.string().trim().min(3).max(50).required().messages({
    "string.empty": "Room name is required.",
    "string.min": "Room name must be at least 3 characters long.",
    "string.max": "Room name cannot exceed 50 characters.",
    "any.required": "Room name is required.",
  }),

  fileName: Joi.string().trim().min(3).max(100).required().messages({
    "string.empty": "File name is required.",
    "string.min": "File name must be at least 3 characters long.",
    "string.max": "File name cannot exceed 100 characters.",
    "any.required": "File name is required.",
  }),

  language: Joi.string()
    .valid("javascript", "java", "cpp", "c", "python")
    .required()
    .messages({
      "any.only":
        "Language must be one of javascript, java, cpp, c, or python.",
      "any.required": "Language is required.",
    }),
});
