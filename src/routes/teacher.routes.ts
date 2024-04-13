/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import {
  createTeacher,
  getTeacherStudentsResults,
  getTeacherStudentsAverageResults,
} from '../controllers/teacher.controller';
import { type IJoiValidationObject, joiMiddleware } from '../middlewares/joi.middleware';
import createTeacherJoi from './joi/teacher/createTeacher';
import getStudentsExamsJoi from './joi/teacher/getStudentsResults';
const teacherRoutes = Router();

teacherRoutes.post(
  '/',
  joiMiddleware(createTeacherJoi as IJoiValidationObject),
  createTeacher
);

teacherRoutes.get(
  '/:teacherId/students-results',
  joiMiddleware(getStudentsExamsJoi as IJoiValidationObject),
  getTeacherStudentsResults
);

teacherRoutes.get(
  '/:teacherId/students-average-results',
  joiMiddleware(getStudentsExamsJoi as IJoiValidationObject),
  getTeacherStudentsAverageResults
);

export default teacherRoutes;
