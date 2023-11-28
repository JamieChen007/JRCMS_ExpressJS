const NotFoundException = require("../exceptions/NotFoundExceptions");
const Teacher = require("../models/teacher.model");
const Course = require("../models/course.model");

const getAllTeachers = async (req, res) => {
  const teacher = await Teacher.find().exec();
  res.json(teacher);
};

const addTeacher = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const teacher = new Teacher({ firstName, lastName, email });
  await teacher.save();
  res.json(teacher);
};

const getTeacherById = async (req, res) => {
  const { id } = req.params;
  const teacher = await Teacher.findById(id);
  if (!teacher) {
    throw new NotFoundException("Teacher not found exception");
  }
  res.json(teacher);
};

const updateTeacherById = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  const teacher = await Teacher.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!teacher) {
    throw new NotFoundException("Teacher not found exception");
  }
  res.json(teacher);
};

const deleteTeacherById = async (req, res) => {
  const { id } = req.params;
  const teacher = await Teacher.findByIdAndDelete(id);
  if (!teacher) {
    throw new NotFoundException("Teacher not found exception");
  }
  res.sendStatus(204);
};

const addTeacherToCourse = async (req, res) => {
  const { teacherId, courseId } = req.params;
  const teacher = await Teacher.findById(teacherId);
  const course = await Course.findById(courseId);
  if (!teacher || !course) {
    res.status(404).json({ error: "Teacher or course not found" });
    return;
  }
  course.teacher = teacherId;
  teacher.course = courseId;

  await teacher.save();
  await course.save();
  res.json(teacher);
};

const removeTeacherFromCourse = async (req, res) => {
  const { teacherId, courseId } = req.params;
  const teacher = await Teacher.findById(teacherId);
  const course = await Course.findById(courseId);
  if (!teacher || !course) {
    res.status(404).json({ error: "Teacher or course not found" });
    return;
  }

  //update teacher field in course document to null
  await Course.findByIdAndUpdate(courseId, { $unset: { teacher: "" } });

  teacher.course = "";
  await teacher.save();

  res.json(teacher);
};

module.exports = {
  getAllTeachers,
  addTeacher,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
  addTeacherToCourse,
  removeTeacherFromCourse,
};
