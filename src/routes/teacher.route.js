const {
  getAllTeachers,
  addTeacher,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
  addTeacherToCourse,
  removeTeacherFromCourse,
} = require("../controllers/teacher.controller");

const express = require("express");

const teacherRouter = express.Router();

teacherRouter.get("/", getAllTeachers);
teacherRouter.post("/", addTeacher);
teacherRouter.patch("/:id", updateTeacherById);
teacherRouter.get("/:id", getTeacherById);
teacherRouter.delete("/:id", deleteTeacherById);
teacherRouter.post("/:teacherId/course/:courseId", addTeacherToCourse);
teacherRouter.delete("/:teacherId/course/:courseId", removeTeacherFromCourse);

module.exports = teacherRouter;
