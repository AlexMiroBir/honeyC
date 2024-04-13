import Joi from 'joi';
import { type IJoiValidationObject } from '../../../middlewares/joi.middleware';
import { CLASSES } from '../../../constants/constants';

export default {
  body: {
    studentsIds: Joi.array().items(Joi.string()).min(1).required(),
    newClass: Joi.string()
      .valid(...CLASSES)
      .required(),
  },
  query: {},
  params: {},
} satisfies IJoiValidationObject;
