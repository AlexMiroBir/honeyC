import type { Request, Response, NextFunction } from 'express';
import type mongoose from 'mongoose';
import { Exam, type IStudent, Student } from '../schemas/schemas';
import { validateExamAlreadyPassed, validateUserExists } from '../helpers/helpers';

export const createExam = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { studentId, examId } = req.body;
    const student = await Student.findOne({ studentId });
    validateUserExists(student as IStudent, 'Student');
    let exam: any = {};

    if (student != null) {
      const examExists = !!(await Exam.findOne({
        studentId: student._id,
        examId,
      }));
      validateExamAlreadyPassed(examExists);
      exam = new Exam({ ...req.body, studentId: student._id });
      await exam.save();
      student.exams.push(exam as mongoose.Types.ObjectId);
      await student.save();
    }
    res.status(200).json(exam);
  } catch (error) {
    next(error);
  }
};
