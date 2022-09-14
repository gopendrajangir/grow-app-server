const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../config.env') });

const Employee = require('../models/Employee');

const loadData = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Datebase connected');
    const rawData = fs.readFileSync('employees.json');
    const employeesData = JSON.parse(rawData);
    await Employee.insertMany(employeesData);
    console.log('Data inserted successfully');
  } catch (err) {
    console.log(err);
  }
};

loadData();
