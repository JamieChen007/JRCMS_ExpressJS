const { Router } = require('express');
// const { getAllStudents } = require("../controllers/student.controllers");

const studentRouter = require('./student.routes.js');
const courseRouter = require('./course.routes');
const authRouter = require('./auth.route.js');
const teacherRouter = require('./teacher.route.js');
const roleGuard = require('../middleware/roleGuard.js');
const authGuard = require('../middleware/authGuard.js');
const v1Router = Router();

v1Router.use('/students', authGuard, studentRouter);
v1Router.use('/courses', courseRouter);
v1Router.use('/auth', authRouter);
v1Router.use('/teachers', teacherRouter);
// v1Router.get("/students", getAllStudents);

module.exports = v1Router;
