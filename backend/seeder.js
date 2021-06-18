import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Data
import users from './data/users.js';
import products from './data/products.js';

// Models
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

// call from root folder using:
// npm run data:import OR npm run data:delete to avoid .env errors.
dotenv.config();

connectDB();

const importData = async () => {
  try {
    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;
    console.log('ADMIN USER: ', adminUser);
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
};

const deleteData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Deleted!');
    process.exit();
  } catch (err) {
    console.error(`ERROR: ${err}`);
  }
};

// RUN this as npm run data:import / npm run data:delete
// using package.json calls from root folder of the project.
const option = process.argv[2] || '';
switch (option) {
  case '-i':
    importData();
    console.log('Importing data...');
    break;
  case '-d':
    deleteData();
    console.log('Deleting data...');
    break;
  default:
    console.log(
      `-> Please select option -i or -d
        -i import data
        -d delete data
      `
    );
    break;
}
