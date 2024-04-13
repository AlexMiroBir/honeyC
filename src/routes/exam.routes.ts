/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { createExam } from '../controllers/exam.controller';
import createExamJoi from './joi/exam/crateExam';
import { type IJoiValidationObject, joiMiddleware } from '../middlewares/joi.middleware';

const examRoutes = Router();

examRoutes.post('/', joiMiddleware(createExamJoi as IJoiValidationObject), createExam);

export default examRoutes;
