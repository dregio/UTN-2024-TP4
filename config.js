import dotenv from "dotenv";
import lang from "./src/utils/multiLanguage.js";

dotenv.config();

export const PORT = process.env.PORT || 3001; // Puerto de la API definida
// por este proyecto.

export const MONGODB_URI = process.env.MONGODB_URI;

// OTRAS CONSTANTES A NIVEL DE PROYECTO
export const API_V1_ = "/api/v1/"; 

export const SESSION_SECRET = process.env.SESSION_SECRET

// DEFAULT_LANG se carga aquí, pero se declara en src/utils/lang.js,para
// que cualquier módulo que necesite los recursos de lang.js no necesite
// importar también este archivo.

lang.DEFAULT_LANG = process.env.DEFAULT_LANGUAGE || lang.DEFAULT_LANG;