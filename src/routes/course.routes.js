const express = require('express');
const {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourseById,
  deleteCourseById,
} = require('../controllers/course.controllers');
const authGuard = require('../middleware/authGuard');
const roleGuard = require('../middleware/roleGuard');

const courseRouter = express.Router();

courseRouter.get('/', authGuard, getAllCourses);
courseRouter.get('/:id', getCourseById);
courseRouter.post('/', roleGuard('admin'), addCourse);
courseRouter.patch('/:id', updateCourseById);
courseRouter.delete('/:id', deleteCourseById);

module.exports = courseRouter;
