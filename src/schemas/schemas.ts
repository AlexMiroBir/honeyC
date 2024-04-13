import * as mongoose from 'mongoose';
import moment from 'moment';
import { CLASSES, COURSES, DATE_FORMAT, EXAM_TYPES } from '../constants/constants';

export interface IExam {
  _id?: string;
  examId: string;
  studentId: mongoose.Types.ObjectId;
  course: string;
  type: string;
  date: string;
  score: number;
}

const examSchema = new mongoose.Schema<IExam>({
  examId: { type: String, required: true },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  course: { type: String, enum: COURSES, required: true },
  type: { type: String, enum: EXAM_TYPES, required: true },
  date: {
    type: String,
    get(val: string) {
      return moment(val).format(DATE_FORMAT);
    },
    set(val: string) {
      if (!moment(val).isValid()) throw new Error('Invalid Date Format');
      return moment(val).format(DATE_FORMAT);
    },
    required: true,
  },
  score: { type: Number, required: true },
});

export interface IStudent {
  _id?: string;
  studentId: string;
  class: string;
  firstName: string;
  lastName: string;
  exams: mongoose.Types.ObjectId[];
}

const studentSchema = new mongoose.Schema<IStudent>({
  studentId: { type: String, unique: true, required: true },
  class: { type: String, enum: CLASSES, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  exams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }],
});

export interface ITeacher {
  _id?: string;
  teacherId: string;
  class: string;
  firstName: string;
  lastName: string;
}

const teacherSchema = new mongoose.Schema<ITeacher>({
  teacherId: { type: String, unique: true, required: true },
  class: { type: String, enum: CLASSES, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// export const Course = mongoose.model('Course', courseSchema);
export const Exam = mongoose.model('Exam', examSchema);
export const Student = mongoose.model('Student', studentSchema);
export const Teacher = mongoose.model('Teacher', teacherSchema);
