// TODO3: evaluar mover este archivo a una carpeta DB o similar.

import mg from "mongoose";

export const connectDB = async () => {
  try {
    console.log(`MongoDB por conectar`);
    mg.set('bufferCommands', false);
    const conn = await mg.connect("mongodb://127.0.0.1:27017/RegioTasks");
    /* TODO1: pasar lo anterior a env, quizás algo así:
    const conn = await mg.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }); */
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`, error);
    process.exit(1);
  }
}