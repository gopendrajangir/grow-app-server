const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');

dotenv.config({ path: path.join(__dirname, './config.env') });

const port = process.env.PORT || 8080;

const boot = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Database connected successfully');
    await app.listen(port);
    console.log(`Server listening on port ${port}`);
  } catch (err) {
    console.log('Error occured', err);
  }
};

boot();
