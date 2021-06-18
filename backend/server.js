import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import {
  notFound,
  errorHandler,
  mongoValidationErrors,
} from './middleware/errorHandlers.js';
dotenv.config();

connectDB();

const app = express();

// express.json() && express.urlencoded are just for POST forms.
// Old days we used body-pass to req.body
app.use(express.json());

// Allow choose [false]: querystring library vs [true]: qs library
// extended: true == { foo: { bar: { baz: 'foobarbaz' }}}
// will disable for now. Basir had enabled, Brad do not.
//app.use(express.urlencoded({ extended: true }));

// Setting route-paths
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // Locks user in production mode to index instead 'api running' message.
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is Running');
  });
}

app.use(mongoValidationErrors);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server in ${process.env.NODE_ENV} mode on ${PORT}`)
);
