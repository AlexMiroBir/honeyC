/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express';
import {
  createStudent,
  getStudentExams,
  updateStudentExamScore,
  updateStudentsClass,
} from '../controllers/student.controller';
import { type IJoiValidationObject, joiMiddleware } from '../middlewares/joi.middleware';
import createStudentJoi from './joi/student/createStudent';
import updateClassStudentsJoi from './joi/student/updateClassStudents';
import updateStudentExamScoreJoi from './joi/student/updateStudentExamScore';
import getStudentExamsJoi from './joi/student/getStudentExams';

const studentRoutes = Router();

studentRoutes.post(
  '/',
  joiMiddleware(createStudentJoi as IJoiValidationObject),
  createStudent
);
studentRoutes.put(
  '/update-class',
  joiMiddleware(updateClassStudentsJoi as IJoiValidationObject),
  updateStudentsClass
);
studentRoutes.put(
  '/:studentId/update-score',
  joiMiddleware(updateStudentExamScoreJoi as IJoiValidationObject),
  updateStudentExamScore
);

studentRoutes.get(
  '/:studentId/exams',
  joiMiddleware(getStudentExamsJoi as IJoiValidationObject),
  getStudentExams
);

export default studentRoutes;
