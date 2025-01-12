import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import consts from "./utils/consts.js";
import taskRoute from "./routes/taskRoute.js";

const API_TASK = consts.API_V1 + "task";

const app = express();

app.use(
  cors({ origin: "http://localhost:3000", methods: "GET,POST,PUT,DELETE" })
);

app.use(bodyParser.json()); // TODO3 - ver si es necesario bodyParser.

app.use(bodyParser.urlencoded({ extended: true })); // TODO3 - ver si es necesario URLENCODED.

// usamos /v1 para identificar la versión de la API.
app.use(API_TASK, taskRoute);

app.listen(3001, () => {
  console.log("Server running on port 3001"); // TODO2: Pasar el puerto a una variable de entorno.
});
