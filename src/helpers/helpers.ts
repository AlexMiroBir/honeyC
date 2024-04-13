import { type IStudent, type ITeacher } from '../schemas/schemas';
import CustomError from '../error/custom-error';

export const validateExamAlreadyPassed = (examExists: boolean): void => {
  if (examExists) {
    throw new CustomError({
      message: 'The student have already passed the exam',
    });
  }
};

export const validateUserExists = (user: IStudent | ITeacher, userType: string): void => {
  if (!user) {
    throw new CustomError({
      message: `${userType} not Found`,
    });
  }
};

export const validateExamExists = (examExists: boolean): void => {
  if (!examExists) {
    throw new CustomError({
      message: 'Exam not Found',
    });
  }
};
