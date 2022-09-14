const express = require('express');

const router = express.Router();

const {
  getAllEmployees,
  getEmployee,
  getTotalEmployeesSize,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeesController');

router.route('/').get(getAllEmployees).post(createEmployee);

router.get('/total', getTotalEmployeesSize);

router
  .route('/:id')
  .get(getEmployee)
  .patch(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
