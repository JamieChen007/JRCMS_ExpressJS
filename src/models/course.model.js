const { Schema, model } = require("mongoose");

module.exports = model(
  "Course",
  new Schema(
    {
      _id: {
        alias: "code", //set an alias on mongoose level -> virtual property
        type: String,
        required: true,
        uppercase: true,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        default: "Course description",
      },
      teacher: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
      },
      students: [
        {
          type: Schema.Types.ObjectId,
          ref: "Student",
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);
