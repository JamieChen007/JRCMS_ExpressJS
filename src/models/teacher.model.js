const { Schema, model } = require("mongoose");
const Joi = require("joi");

const teacherSchema = new Schema({
  firstName: {
    type: String, //type:"string"
    required: true,
  },
  lastName: {
    type: String, //type:"string"
    required: true,
  },
  email: {
    type: String,
    validate: [
      {
        validator: (email) => {
          //regex
          // Joi , yup, validator.js express-validator
          return Joi.string().email().validate(email).error === undefined;
        },
        msg: "Invalid email format",
      },
    ],
  },
  course: {
    type: String,
    ref: "Course",
  },
});

const Teacher = model("Teacher", teacherSchema);

module.exports = Teacher;
