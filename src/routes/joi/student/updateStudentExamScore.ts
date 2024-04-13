import Joi from 'joi';
import { type IJoiValidationObject } from '../../../middlewares/joi.middleware';

export default {
  body: {
    examId: Joi.string().required(),
    newScore: Joi.number().integer().min(0).required(),
  },
  query: {},
  params: {
    studentId: Joi.string().required(),
  },
} satisfies IJoiValidationObject;
