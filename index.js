import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import consts from "./utils/consts.js";
import taskRoute from "./routes/taskRoute.js";
import { connectDB } from "./db.js";
   
// TODO1: Ver video 2:05

const API_TASK = consts.API_V1_ + "task";
const PORT = 3001; // TODO2: Pasar el puerto a una variable de entorno.

const app = express();

app.use(
  cors({ origin: "http://localhost:" + PORT, methods: "GET,POST,PUT,DELETE" })
);

app.use(bodyParser.json()); // TODO3 - ver si es necesario bodyParser.

app.use(bodyParser.urlencoded({ extended: true })); // TODO3 - ver si es necesario URLENCODED.

/* app.use("/", (req, res) => {
  res.send("RegioTasks API");
}); */

// usamos /v1 para identificar la versión de la API.
console.log("API_TASK: " + API_TASK);
app.use(API_TASK, taskRoute);

connectDB().then(() => {
  console.log("DB connected");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
  });
});

