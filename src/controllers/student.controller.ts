import type { Request, Response, NextFunction } from 'express';
import { Exam, type IExam, type IStudent, Student } from '../schemas/schemas';
import { validateExamExists, validateUserExists } from '../helpers/helpers';

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const student = new Student(req.body);
    await student.save();

    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

export const getStudentExams = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { studentId } = req.params;
    const student = await Student.findOne({ studentId }, '_id');
    validateUserExists(student as IStudent, 'Student');
    let exams: object[] = [];
    if (student) {
      exams = await Exam.find(
        { studentId: student._id },
        {
          course: 1,
          score: 1,
          type: 1,
          date: 1,
          examId: 1,
          _id: 0,
        }
      );
    }
    res.status(200).json(exams);
  } catch (error) {
    next(error);
  }
};

export const updateStudentExamScore = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { studentId } = req.params;
    const { examId, newScore } = req.body;
    const student = await Student.findOne({ studentId }, '_id').populate('exams');
    validateUserExists(student as IStudent, 'Student');
    if (student && student.exams.length > 0) {
      const examIndex = student.exams.findIndex(
        (exam: any) => (exam as IExam).examId === examId
      );

      validateExamExists(examIndex > -1);
      const exam: any = student.exams[examIndex];
      exam.score = newScore;
      await exam.save();
    }
    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

export const updateStudentsClass = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { studentsIds, newClass } = req.body;
    const result = await Student.updateMany(
      { studentId: { $in: studentsIds } },
      { class: newClass }
    );

    res.status(200).json({ updated: result.modifiedCount });
  } catch (error) {
    next(error);
  }
};
