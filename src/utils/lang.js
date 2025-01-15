const DEFAULT_LANG = 'es';
// Este es el idioma por defecto. Se puede cambiar en el código a cualquiera
// de los valores posibles (ver translations, abajo).
//
// En cada request se puede cambiar este idioma por otro, indicando en el
// header del request la clave 'accept-language' y el valor correspondiente 
// al idioma deseado, que será válido solamente en dicho request.
//
// Si una frase no está traducida al idioma solicitado, se utiliza la 
// traducción en el idioma fallback, que por definición siempre debería tener
// una traducción.

const FALLBACK_LANG = 'en';

const translations = {
    en: {},
    es: {},
    fr: {},
    pt: {}
};

export const msg = {
    INTERNAL_SERVER_ERROR: null,
    TASK_CREATED: null,
    NO_TASKS_FOUND: null,
    TASK_NOT_FOUND: null,
    TASK_DELETED: null,
    SERVER_RUNNING_ON_PORT: null
    // Add more keys as needed
};
// TODO3: Permitir agregar más mensajes sin tener que hacerlo por separado
// en msg y en translations.

// Asigna a cada valor de msg su propia clave. Esto permite una forma práctica 
// de acceder luego a los valores de translations utilizando una constante
// (como msg.TASK_CREATED) en vez de un string literal (como "TASK_CREATED").
for (const key in msg) {
    if (Object.hasOwnProperty.call(msg, key)) { // Evita asignar propiedades heredadas.
        msg[key] = key;
    }
}

const t = translations;
var m = msg.TASK_CREATED;
t.en[m] = "Task created";
t.es[m] = "Tarea creada";
t.fr[m] = "Tâche créée";
t.pt[m] = "Tarefa criada";

m = msg.NO_TASKS_FOUND;
t.en[m] = "No tasks found";
t.es[m] = "No se encontraron tareas";
t.fr[m] = "Aucune tâche trouvée";
t.pt[m] = "Nenhuma tarefa encontrada";

m = msg.TASK_NOT_FOUND;
t.en[m] = (id) => `Task ${id} not found.`;
t.es[m] = (id) => `Tarea ${id} no encontrada.`;
t.fr[m] = (id) => `Tâche ${id} non trouvée.`;
t.pt[m] = (id) => `Tarefa ${id} não encontrada.`;

m = msg.INTERNAL_SERVER_ERROR;
t.en[m] = "Internal server error.";
t.es[m] = "Error interno del servidor";
t.fr[m] = "Erreur interne du serveur.";
t.pt[m] = "Erro interno de servidor.";

m = msg.TASK_DELETED;
t.en[m] = "Task deleted";
t.es[m] = "Tarea eliminada";
t.fr[m] = "Tâche supprimée";
t.pt[m] = "Tarefa excluída";

m = msg.SERVER_RUNNING_ON_PORT;
t.en[m] = (port) => `Server running on port ${port}`;
t.es[m] = (port) => `Servidor corriendo en puerto ${port}`;
t.fr[m] = (port) => `Serveur en cours d'exécution sur le port ${port}`;
t.pt[m] = (port) => `Servidor rodando na porta ${port}`;

export function LangFromReq(req) {
    var language = req.headers['accept-language'];
    if (!language || !translations[language]) {
        language = DEFAULT_LANG;
    }
    return new Lang(language);
}

class Lang {
    constructor(lang = DEFAULT_LANG) {
        this.lang = lang;
    }

    tr(key, ...args) {
        var translation = translations[this.lang][key];
        if (!translation) {
            translation = translations[FALLBACK_LANG][key];
        }
        return typeof translation === 'function' ? translation(...args) : translation;
    }

    /*  errorObj(error, key, ...args)
        
        error: Error de try..catch.
        key: Clave de mensaje de traducción.
        args: Argumentos opcionales para el mensaje de traducción.
    
    Se usa en los Controllers para generar el objeto que se envía en los 
    catch de los requests.
    Ventajas: incluye el mensaje de error traducido; 
    incluye el mensaje de error; incluye el volcado de stack. 
    */
    errorObj(error, key, ...args) {
        return {
            message: this.tr(key, ...args),
            error: error.message,
            stack: error.stack  // TODO3: Hacerlo condicional, para no enviar el stack en producción.
        };
    }
}

export default Lang;