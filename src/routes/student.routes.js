const { Router } = require('express');
const {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudentById,
  deleteStudentById,
  addStudentToCourse,
  removeStudentFromCourse,
} = require('../controllers/student.controllers');

const studentRouter = Router();

studentRouter.get('/', getAllStudents);
studentRouter.get('/:id', getStudentById);
studentRouter.post('/', addStudent);
studentRouter.patch('/:id', updateStudentById);
studentRouter.delete('/:id', deleteStudentById);
studentRouter.post('/:studentId/course/:courseId', addStudentToCourse);
studentRouter.delete('/:studentId/course/:courseId', removeStudentFromCourse);

module.exports = studentRouter;
