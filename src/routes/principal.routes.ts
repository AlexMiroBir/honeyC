/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { type IJoiValidationObject, joiMiddleware } from '../middlewares/joi.middleware';
import getAverageResultsByClass from './joi/principal/getAverageResultsByClass';
import { getAverageScoreOfCourses } from '../controllers/principal.controller';
const principalRoutes = Router();

principalRoutes.get(
  '/get-class-results/:className',
  joiMiddleware(getAverageResultsByClass as IJoiValidationObject),
  getAverageScoreOfCourses
);

export default principalRoutes;
