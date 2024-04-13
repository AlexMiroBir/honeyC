// eslint-disable-next-line @typescript-eslint/no-unused-vars
import JoiDate from '@joi/date';
import Joi from 'joi';
import { type IJoiValidationObject } from '../../../middlewares/joi.middleware';
import { COURSES, DATE_FORMAT, EXAM_TYPES } from '../../../constants/constants';
import moment from 'moment';

export default {
  body: {
    examId: Joi.string().required(),
    studentId: Joi.string().required(),
    course: Joi.string()
      .valid(...COURSES)
      .required(),
    type: Joi.string()
      .valid(...EXAM_TYPES)
      .required(),
    date: Joi.date().default(() => moment().format(DATE_FORMAT)),
    score: Joi.number().integer().min(0).required(),
  },
  query: {},
  params: {},
} satisfies IJoiValidationObject;
