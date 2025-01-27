import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./db/db.js";
import userRoute from "./routes/userRoute.js";
import taskRoute from "./routes/taskRoute.js";
import projectRoute from "./routes/projectRoute.js";
import { API_V1_, debugging, PORT, SESSION_SECRET, setDebugging } from "./config.js";
import MultiLanguage, { msg } from "./utils/multiLanguage.js";
import session from "express-session";

setDebugging(true); 
debugging && console.log("*** DEBUGGING IS ON *** --> comment the line setDebugging(true) in index.js to turn off");
const lang = new MultiLanguage(); 

debugging && console.log(lang.tr(msg.CONNECTING_TO_DB));
connectDB();

const app = express();

app.use( 
	cors({ 
		origin: "http://127.0.0.1:" + PORT,
		methods: "GET,POST,PUT,DELETE" })
);

app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ extended: true }));

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

