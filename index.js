/*
  PENDIENTE:

  1. Ver qué más falta.
  1. testear un poco la API con postman.
  2. agregar login y autenticación.
  3. testear la API con postman.
  4. agregar el readme.
  5. Ver los TODOS.
  6. terminar de traducir lo que falta.
  7. publicar en github.

*/

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./db.js";
import userRoute from "./src/routes/userRoute.js";
import taskRoute from "./src/routes/taskRoute.js";
import projectRoute from "./src/routes/projectRoute.js";
import { API_V1_, PORT } from "./config.js";
import Lang, { msg } from "./src/utils/lang.js";
   
const lang = new Lang();

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:" + PORT,
    methods: "GET,POST,PUT,DELETE" })
);

app.use(bodyParser.json()); // TODO3 - ver si es necesario bodyParser.

app.use(bodyParser.urlencoded({ extended: true })); // TODO3 - ver si es necesario URLENCODED.

/* app.use("/", (req, res) => {
  res.send("RegioTasks API");
}); */

// usamos /v1 para identificar la versión de la API.
app.use(API_V1_ + "user", userRoute);
app.use(API_V1_ + "task", taskRoute);
app.use(API_V1_ + "project", projectRoute);

console.log(lang.tr(msg.CONNECTING_TO_DB));
connectDB();

app.listen(PORT, () => {
    console.log(lang.tr(msg.SERVER_RUNNING_ON_PORT, PORT)); 
});

