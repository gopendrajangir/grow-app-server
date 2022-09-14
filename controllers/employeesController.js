const { findOneAndUpdate } = require('../models/Employee');
const Employee = require('../models/Employee');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllEmployees = catchAsync(async (req, res, next) => {
  const queryObj = req.query;
  const filtered = Object.assign({}, queryObj);

  const excludedFields = ['page', 'limit'];

  Object.keys(queryObj).forEach((key) => {
    if (excludedFields.includes(key)) {
      delete filtered[key];
    }
  });

  const { page = 1, limit = 10 } = queryObj;

  const employees = await Employee.find(filtered)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort('-createdAt');

  const total = await Employee.find(filtered).count();

  res.status(200).json({
    status: 'success',
    data: {
      employees,
      total,
    },
  });
});

exports.getEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee)
    throw new AppError(`No employee found with id ${req.params}`, 404);

  res.status(200).json({
    status: 'success',
    data: { employee },
  });
});

exports.getTotalEmployeesSize = catchAsync(async (req, res, next) => {
  const total = await Employee.count();

  console.log(total);

  res.status(200).json({
    status: 'success',
    data: {
      total,
    },
  });
});

exports.createEmployee = catchAsync(async (req, res, next) => {
  const { firstname, lastname, dob, dateEnrolled, department } = req.body;

  const employeeData = {
    firstname,
    lastname,
    dob,
    dateEnrolled,
    department,
  };

  if (employeeData.dob) employeeData.dob = new Date(employeeData.dob);
  if (employeeData.dateEnrolled)
    employeeData.dateEnrolled = new Date(employeeData.dateEnrolled);

  const employee = await Employee.create(employeeData);

  res.status(201).json({
    status: 'success',
    data: {
      employee,
    },
  });
});

exports.updateEmployee = catchAsync(async (req, res, next) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!employee)
    throw new AppError(`No employee found with id ${req.params.id}`, 404);

  res.status(204).json({
    status: 'success',
    data: {
      employee,
    },
  });
});

exports.deleteEmployee = catchAsync(async (req, res, next) => {
  const result = await Employee.findByIdAndRemove(req.params.id);

  if (!result) {
    throw new AppError(`No employee found with id ${req.params.id}`, 404);
  }

  res.status(202).json({
    status: 'success',
  });
});
