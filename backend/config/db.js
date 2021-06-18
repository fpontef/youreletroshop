import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    // Estabilished connection error handling:
    // https://mongoosejs.com/docs/connections.html#error-handling
    conn.connection.on('error', (err) => {
      console.log(`Mongoose error: ${err}`);
    });

    process.on('SIGINT', () => {
      conn.connection.close(() => {
        console.log('Mongoose disconnected through app termination.');
        process.exit(0);
      });
    });

    console.log(`Mongoose connection: ${conn.connection.host}`);
  } catch (err) {
    // Initial connection error handling:
    console.log(`Mongoose connection Error: ${err}`);
    // Pode ser necessario remover o exit abaixo pro erro de validacao passar
    // e poder ser tratado no errorHandling.
    process.exit(1);
  }
};

export default connectDB;
