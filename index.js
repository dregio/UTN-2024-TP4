/*
	PENDIENTE:

  1. Ver qué más falta.
    5. Encriptar las contraseñas de los usuarios al guardarlas en la base de datos. (opcional)
      Utilizar un módulo de encriptación (bcrypt).
    6. Implementar una ruta de inicio de sesión que utilice JWT para autenticar a los usuarios. (Opcional)
    - authController.js
    9. Rutas protegidas con middleware.
    - middleware (opcional)
    - utils/
      - verifyToken.js (opcional)
      - validators.js (opcional)

  2. agregar login y autenticación.
  3. testear la API con postman.
  5. Ver los TODOS.
  4. agregar el readme.
    - Presentar el proyecto en readme. Necesario en el readme: título del proyecto, descripción, listado de tecnologías y como correr el proyecto. Además incluir instrucciones claras sobre cómo ejecutar, cuales son los endpoints y comandos para probar la aplicación.
    - Ejemplos de datos mock para POST en el readme.
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
import { API_V1_, PORT, SESSION_SECRET } from "./config.js";
import MultiLanguage, { msg } from "./src/utils/multiLanguage.js";
import session from "express-session";

const lang = new MultiLanguage();

console.log(lang.tr(msg.CONNECTING_TO_DB));
connectDB();

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

app.use( session({
	secret: SESSION_SECRET, //clave secreta para firmar la cookie de la sesion
	resave: false, //evita que se guarde la sesion si no ha sido modificada
	saveUninitialized: false, //evita que se guarde la sesion si no ha sido inicializada
}) )

app.listen(PORT, () => {
    console.log(lang.tr(msg.SERVER_RUNNING_ON_PORT, PORT)); 
});

