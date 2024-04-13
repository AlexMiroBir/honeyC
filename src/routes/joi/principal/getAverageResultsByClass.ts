import Joi from 'joi';
import { type IJoiValidationObject } from '../../../middlewares/joi.middleware';

export default {
  body: {},
  query: {},
  params: {
    className: Joi.string().required(),
  },
} satisfies IJoiValidationObject;
