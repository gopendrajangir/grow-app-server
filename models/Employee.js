const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
    },
    dob: {
      type: Date,
      trim: true,
      required: true,
      max: Date.now(),
    },
    dateEnrolled: {
      type: Date,
      trim: true,
      required: true,
      max: Date.now(),
    },
    department: {
      type: String,
      enum: ['hr', 'manufacturing', 'quality', 'purchase', 'salesmarketing'],
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('employee', employeeSchema);
