import type { Request, Response, NextFunction } from 'express';
import { type IStudent, type ITeacher, Student, Teacher } from '../schemas/schemas';
import { validateUserExists } from '../helpers/helpers';

export const createTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(200).json(teacher);
  } catch (error) {
    next(error);
  }
};

export const getTeacherStudentsResults = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { teacherId } = req.params;
    const teacher = await Teacher.findOne({ teacherId });
    validateUserExists(teacher as ITeacher, 'Teacher');
    let students: any = [];
    if (teacher) {
      students = await Student.find(
        { class: teacher.class },
        {
          firstName: 1,
          lastName: 1,
          _id: 0,
        }
      ).populate('exams', {
        course: 1,
        score: 1,
        type: 1,
        date: 1,
        examId: 1,
        _id: 0,
      });
    }
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

export const getTeacherStudentsAverageResults = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { teacherId } = req.params;
    const teacher = await Teacher.findOne({ teacherId });
    validateUserExists(teacher as ITeacher, 'Teacher');
    let students: IStudent[] = [];
    if (teacher) {
      students = await Student.find({ class: teacher.class });
    }
    let averages = [];
    if (students.length > 0) {
      const studentIds = students.map((student) => student._id);
      averages = await Student.aggregate([
        { $match: { _id: { $in: studentIds } } },
        {
          $lookup: {
            from: 'exams',
            localField: '_id',
            foreignField: 'studentId',
            as: 'exams',
          },
        },
        { $unwind: '$exams' },
        {
          $group: {
            _id: {
              firstName: '$firstName',
              lastName: '$lastName',
              course: '$exams.course',
            },
            averageScore: { $avg: '$exams.score' },
          },
        },
        {
          $group: {
            courses: {
              $push: {
                course: '$_id.course',
                averageScore: { $round: ['$averageScore', 2] },
              },
            },
            _id: { firstName: '$_id.firstName', lastName: '$_id.lastName' },
          },
        },
        {
          $project: {
            _id: 0,
            courses: 1,
            firstName: '$_id.firstName',
            lastName: '$_id.lastName',
          },
        },
      ]);
    }

    res.status(200).json(averages);
  } catch (error) {
    next(error);
  }
};
