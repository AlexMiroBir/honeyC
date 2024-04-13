import type { Request, Response, NextFunction } from 'express';
import { type IStudent, Student } from '../schemas/schemas';

export const getAverageScoreOfCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { className } = req.params;

    const students: IStudent[] = await Student.find({
      class: className,
    }).populate('exams', {
      course: 1,
      score: 1,
      type: 1,
      date: 1,
      examId: 1,
      _id: 0,
    });

    const averageScoresByCourse = {};

    students.forEach((student) => {
      student.exams.forEach((exam: any): void => {
        if (exam.score) {
          if (!averageScoresByCourse[exam.course]) {
            averageScoresByCourse[exam.course] = { totalScore: 0, count: 0 };
          }
          averageScoresByCourse[exam.course].totalScore += exam.score;
          averageScoresByCourse[exam.course].count++;
        }
      });
    });

    const averages = {};
    Object.keys(averageScoresByCourse).forEach((course) => {
      averages[course] =
        averageScoresByCourse[course].totalScore / averageScoresByCourse[course].count;
    });
    res.status(200).json({ [className]: averages });
  } catch (error) {
    next(error);
  }
};
