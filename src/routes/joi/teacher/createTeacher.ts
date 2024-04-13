import Joi from 'joi';
import { type IJoiValidationObject } from '../../../middlewares/joi.middleware';
import { CLASSES } from '../../../constants/constants';

export default {
  body: {
    teacherId: Joi.string().required(),
    class: Joi.string()
      .valid(...CLASSES)
      .required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  },
  query: {},
  params: {},
} satisfies IJoiValidationObject;
