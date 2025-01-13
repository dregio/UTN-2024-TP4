import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import taskRoute from "./routes/taskRoute.js";
import { connectDB } from "./db.js";
import userRoute from "./routes/userRoute.js";
import { API_V1_, PORT } from "./config.js";
   
// TODO1: Ver video 2:05

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
app.use(API_V1_ + "task", taskRoute);
app.use(API_V1_ + "user", userRoute);

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
});

