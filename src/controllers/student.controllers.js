const Student = require('../models/student.model');
const Course = require('../models/course.model');
const NotFoundException = require('../exceptions/NotFoundExceptions');

const addStudent = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  //data validation
  const student = new Student({ firstName, lastName, email });

  //   try {
  await student.save();
  res.status(201).json(student);
  //   } catch (error) {

  //   }
};

const getAllStudents = async (req, res) => {
  // db.students.find()
  const students = await Student.find().exec();
  res.json(students);
};

const getStudentById = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id).exec();
  if (!student) {
    throw new NotFoundException('Student not found exception');
    // res.status(404).json({ error: "Student not found" });
    // return;
  }
  res.json(student);
};

const updateStudentById = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  const student = await Student.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      email,
    },
    { new: true }
  ).exec();
  if (!student) {
    res.status(404).json({ error: 'Student not found' });
    return;
  }
  res.json(student);
};

const deleteStudentById = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id).exec();
  if (!student) {
    res.status(404).json({ error: 'Student not found' });
    return;
  }

  await Course.updateMany(
    {
      students: student._id,
    },
    {
      $pull: {
        students: student._id,
      },
    }
  );
  res.sendStatus(204);
};

// POST /v1/students/:studentId/course/:courseId
const addStudentToCourse = async (req, res) => {
  const { studentId, courseId } = req.params;
  const student = await Student.findById(studentId).exec();
  const course = await Course.findById(courseId).exec();

  if (!student || !course) {
    return res.status(404).json({ error: 'Student or course not found' });
  }

  course.students.addToSet(studentId);
  student.courses.addToSet(courseId);

  await student.save();
  await course.save();

  res.json(student);
};

// DELETE /v1/students/:studentId/course/:courseId
const removeStudentFromCourse = async (req, res) => {
  const { studentId, courseId } = req.params;

  const student = await Student.findById(studentId).exec();
  const course = await Course.findById(courseId).exec();

  if (!student || !course) {
    return res.status(404).json({ error: 'Student or course not found' });
  }

  student.courses.pull(courseId);
  course.students.pull(studentId);

  await student.save();
  await course.save();

  res.sendStatus(204);
};

module.exports = {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  addStudentToCourse,
  removeStudentFromCourse,
};
