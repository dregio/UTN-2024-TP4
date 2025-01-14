const DEFAULT_LANG = 'en'; // Se usa este idioma si la traducción no está disponible
// en el idioma solicitado, o bien, si en un header de un request no se especifica
// el idioma.

const translations = {
    en: {},
    es: {},
    fr: {},
    pt: {}
};

export const msg = {
    TASK_CREATED: null,
    NO_TASKS_FOUND: null,
    TASK_NOT_FOUND: null,
    INTERNAL_SERVER_ERROR: null,
    TASK_DELETED: null,
    // Add more keys as needed
};

// Asigna a cada valor de msg su propia clave. Esto permite una forma práctica 
// de acceder luego a los valores de translations utilizando una constante
// (como msg.TASK_CREATED) en vez de un string literal (como "TASK_CREATED").
for (const key in msg) {
    if (Object.hasOwnProperty.call(msg, key)) { // Evita asignar propiedades heredadas.
        msg[key] = key;
    }
}

const t = translations;
t.en[msg.TASK_CREATED] = "Task created";
t.es[msg.TASK_CREATED] = "Tarea creada";
t.fr[msg.TASK_CREATED] = "Tâche créée";
t.pt[msg.TASK_CREATED] = "Tarefa criada";

t.en[msg.NO_TASKS_FOUND] = "No tasks found";
t.es[msg.NO_TASKS_FOUND] = "No se encontraron tareas";
t.fr[msg.NO_TASKS_FOUND] = "Aucune tâche trouvée";
t.pt[msg.NO_TASKS_FOUND] = "Nenhuma tarefa encontrada";

t.en[msg.TASK_NOT_FOUND] = (id) => `Task ${id} not found.`;
t.es[msg.TASK_NOT_FOUND] = (id) => `Tarea ${id} no encontrada.`;
t.fr[msg.TASK_NOT_FOUND] = (id) => `Tâche ${id} non trouvée.`;
t.pt[msg.TASK_NOT_FOUND] = (id) => `Tarefa ${id} não encontrada.`;

t.en[msg.INTERNAL_SERVER_ERROR] = (m) => `Internal server error. Message: ${m}`;
t.es[msg.INTERNAL_SERVER_ERROR] = (m) => `Error interno del servidor. Mensaje: ${m}`;
t.fr[msg.INTERNAL_SERVER_ERROR] = (m) => `Erreur interne du serveur. Message: ${m}`;
t.pt[msg.INTERNAL_SERVER_ERROR] = (m) => `Erro interno de servidor. Mensagem: ${m}`;

t.en[msg.TASK_DELETED] = "Task deleted";
t.es[msg.TASK_DELETED] = "Tarea eliminada";
t.fr[msg.TASK_DELETED] = "Tâche supprimée";
t.pt[msg.TASK_DELETED] = "Tarefa excluída";

export function LangFromReq(req) {
    return new Lang(req.headers['accept-language'] || DEFAULT_LANG);
}

class Lang {
    constructor(lang = DEFAULT_LANG) {
        this.lang = lang;
    }

    tr(key, ...args) {
        const message = translations[this.lang][key];
        return typeof message === 'function' ? message(...args) : message;
    }
}

export default Lang;