export var DEFAULT_LANG = 'es'; 
// Este es el idioma por defecto. Se puede cambiar en el código a cualquiera
// de los valores posibles (ver translations, abajo).
//
// El idioma se configura en el archivo .env, en la variable DEFAULT_LANG.
//
// En cada request se puede cambiar este idioma por otro, indicando en el
// header del request la clave 'accept-language' y el valor correspondiente 
// al idioma deseado, que será válido solamente en dicho request.
//
// Si una frase no está traducida al idioma solicitado, se utiliza la 
// traducción en el idioma fallback, que por definición siempre debería tener
// una traducción.

export function setDefaultLang(lang) {
	DEFAULT_LANG = lang;
}

const FALLBACK_LANG = 'en';

const translations = {
    en: {},
    es: {},
    fr: {},
    pt: {}
};

export const msg = {
    // General
    CONNECTING_TO_DB: null,
    SERVER_RUNNING_ON_PORT: null,
    INTERNAL_SERVER_ERROR: null,
	NO_TOKEN_PROVIDED: null,
	INVALID_TOKEN: null,
    
    // Users   
    NO_USERS_FOUND: null,
    USER_ALREADY_EXISTS: null,
    USER_CREATED: null,
    USER_NOT_FOUND: null,
    USER_UPDATED: null,
    USER_DELETED: null,

    // Tasks
    NO_TASKS_FOUND: null,
    NO_TASKS_FOR_PROJECT: null,
    TASK_CREATED: null,
    TASK_NOT_FOUND: null,
    TASK_DELETED: null,
    TASK_NUMBER_ALREADY_EXISTS: null,
    
    // Projects
    PROJECT_NOT_FOUND: null,
    NO_PROJECTS_FOUND: null,
    PROJECT_ALREADY_EXISTS: null,
    PROJECT_CREATED: null,
    PROJECT_UPDATED: null,
    PROJECT_DELETED: null,

    // Schemas
    USERNAME_FIELD: null,
    PASSWORD_FIELD: null,
	INVALID_PASSWORD: null,
    EMAIL_FIELD: null,
    FIELD_MAX_LENGTH: null,
    FIELD_REQUIRED: null,
    INVALID_EMAIL: null,
	INVALID_ROLE: null,
	LOGGED_IN: null,

    // Traducción desconocida. Cuando no se encuentra una traducción para una
    // clave en el idioma solicitado ni en el idioma fallback, se utiliza este
    // mensaje. Importante: éste tiene que ser el último elemento de la lista,
    // para que sea el devuelto cuando no se encuentra el buscado.
    UNKNOWN_TRANSLATION: null
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
var m = "";

m = msg.CONNECTING_TO_DB;
t.en[m] = "Connecting to database...";
t.es[m] = "Conectando a la base de datos...";
t.fr[m] = "Connexion à la base de données...";
t.pt[m] = "Conectando ao banco de dados...";

m = msg.SERVER_RUNNING_ON_PORT;
t.en[m] = (port) => `Server running on port ${port}`;
t.es[m] = (port) => `Servidor corriendo en puerto ${port}`;
t.fr[m] = (port) => `Serveur en cours d'exécution sur le port ${port}`;
t.pt[m] = (port) => `Servidor rodando na porta ${port}`;

m = msg.INTERNAL_SERVER_ERROR;
t.en[m] = "Internal server error.";
t.es[m] = "Error interno del servidor";
t.fr[m] = "Erreur interne du serveur.";
t.pt[m] = "Erro interno de servidor.";

m = msg.NO_TOKEN_PROVIDED;
t.en[m] = "No token provided";
t.es[m] = "No se proporcionó un token";
t.fr[m] = "Aucun jeton fourni";
t.pt[m] = "Nenhum token fornecido";

m = msg.INVALID_TOKEN;
t.en[m] = "Invalid token";
t.es[m] = "Token inválido";
t.fr[m] = "Jeton invalide";
t.pt[m] = "Token inválido";

// Users

m = msg.NO_USERS_FOUND;
t.en[m] = "No users found";
t.es[m] = "No se encontraron usuarios";
t.fr[m] = "Aucun utilisateur trouvé";
t.pt[m] = "Nenhum usuário encontrado";

m = msg.USER_ALREADY_EXISTS;
t.en[m] = "A user with that email already exists";
t.es[m] = "Ya existe un usuario con el correo especificado";
t.fr[m] = "Un utilisateur avec l'email spécifié existe déjà";
t.pt[m] = "Já existe um usuário com o email especificado";

m = msg.USER_CREATED;
t.en[m] = "User created";
t.es[m] = "Usuario creado";
t.fr[m] = "Utilisateur créé";
t.pt[m] = "Usuário criado";

m = msg.USER_NOT_FOUND;
t.en[m] = (id) => `User ${id} not found.`;
t.es[m] = (id) => `Usuario ${id} no encontrado.`;
t.fr[m] = (id) => `Utilisateur ${id} non trouvé.`;
t.pt[m] = (id) => `Usuário ${id} não encontrado.`;

m = msg.USER_UPDATED;
t.en[m] = "User updated";
t.es[m] = "Usuario actualizado";
t.fr[m] = "Utilisateur mis à jour";
t.pt[m] = "Usuário atualizado";

m = msg.USER_DELETED;
t.en[m] = "User deleted";
t.es[m] = "Usuario eliminado";
t.fr[m] = "Utilisateur supprimé";
t.pt[m] = "Usuário excluído";

// Tasks

m = msg.NO_TASKS_FOUND;
t.en[m] = "No tasks found";
t.es[m] = "No se encontraron tareas";
t.fr[m] = "Aucune tâche trouvée";
t.pt[m] = "Nenhuma tarefa encontrada";

m = msg.NO_TASKS_FOR_PROJECT;
t.en[m] = "No tasks found for this project";
t.es[m] = "No se encontraron tareas para este proyecto";
t.fr[m] = "Aucune tâche trouvée pour ce projet";
t.pt[m] = "Nenhuma tarefa encontrada para este projeto";

m = msg.TASK_CREATED;
t.en[m] = "Task created";
t.es[m] = "Tarea creada";
t.fr[m] = "Tâche créée";
t.pt[m] = "Tarefa criada";

m = msg.TASK_NOT_FOUND;
t.en[m] = (id) => `Task ${id} not found.`;
t.es[m] = (id) => `Tarea ${id} no encontrada.`;
t.fr[m] = (id) => `Tâche ${id} non trouvée.`;
t.pt[m] = (id) => `Tarefa ${id} não encontrada.`;

m = msg.TASK_UPDATED;
t.en[m] = "Task updated";
t.es[m] = "Tarea actualizada";
t.fr[m] = "Tâche mise à jour";
t.pt[m] = "Tarefa atualizada";

m = msg.TASK_DELETED;
t.en[m] = "Task deleted";
t.es[m] = "Tarea eliminada";
t.fr[m] = "Tâche supprimée";
t.pt[m] = "Tarefa excluída";

m = msg.TASK_NUMBER_ALREADY_EXISTS;
t.en[m] = (number) => `A task with number ${number} already exists.`;
t.es[m] = (number) => `Ya existe una tarea con el número ${number}.`;
t.fr[m] = (number) => `Une tâche avec le numéro ${number} existe déjà.`;
t.pt[m] = (number) => `Já existe uma tarefa com o número ${number}.`;

// Projects

m = msg.PROJECT_NOT_FOUND;
t.en[m] = (id) => `Project ${id} not found.`;
t.es[m] = (id) => `Proyecto ${id} no encontrado.`;
t.fr[m] = (id) => `Projet ${id} non trouvé.`;
t.pt[m] = (id) => `Projeto ${id} não encontrado.`;

m = msg.NO_PROJECTS_FOUND;
t.en[m] = "No projects found";
t.es[m] = "No se encontraron proyectos";
t.fr[m] = "Aucun projet trouvé";
t.pt[m] = "Nenhum projeto encontrado";

m = msg.PROJECT_ALREADY_EXISTS;
t.en[m] = "A project with that name already exists";
t.es[m] = "Ya existe un proyecto con ese nombre";
t.fr[m] = "Un projet avec ce nom existe déjà";
t.pt[m] = "Já existe um projeto com esse nome";

m = msg.PROJECT_CREATED;
t.en[m] = "Project created";
t.es[m] = "Proyecto creado";
t.fr[m] = "Projet créé";
t.pt[m] = "Projeto criado";

m = msg.PROJECT_UPDATED;
t.en[m] = "Project updated";
t.es[m] = "Proyecto actualizado";
t.fr[m] = "Projet mis à jour";
t.pt[m] = "Projeto atualizado";

m = msg.PROJECT_DELETED;
t.en[m] = "Project deleted";
t.es[m] = "Proyecto eliminado";
t.fr[m] = "Projet supprimé";
t.pt[m] = "Projeto excluído";

// Schemas
m = msg.FIELD_REQUIRED;
t.en[m] = (field) => `The field ${field} is required.`;
t.es[m] = (field) => `El campo ${field} es requerido.`;
t.fr[m] = (field) => `Le champ ${field} est requis.`;
t.pt[m] = (field) => `O campo ${field} é obrigatório.`;

m = msg.USERNAME_FIELD;
t.en[m] = "User name";
t.es[m] = "Nombre de usuario";
t.fr[m] = "Nom d'utilisateur";
t.pt[m] = "Nome de usuário";

m = msg.PASSWORD_FIELD;
t.en[m] = "Password";
t.es[m] = "Contraseña";
t.fr[m] = "Mot de passe";
t.pt[m] = "Senha";

m = msg.INVALID_PASSWORD;
t.en[m] = "Invalid password. It must have at least 8 characters, including a letter and a number.";
t.es[m] = "Contraseña inválida. Debe tener al menos 8 caracteres, incluyendo una letra y un número.";
t.fr[m] = "Mot de passe invalide. Il doit comporter au moins 8 caractères, dont une lettre et un chiffre.";
t.pt[m] = "Senha inválida. Deve ter pelo menos 8 caracteres, incluindo uma letra e um número.";

m = msg.EMAIL_FIELD;
t.en[m] = "Email";
t.es[m] = "Correo electrónico";
t.fr[m] = "Email";
t.pt[m] = "Email";

m = msg.FIELD_MAX_LENGTH;
t.en[m] = (field, length) => `The field ${field} cannot be more than ${length} characters.`;
t.es[m] = (field, length) => `El campo ${field} no puede tener más de ${length} caracteres.`;
t.fr[m] = (field, length) => `Le champ ${field} ne peut pas dépasser ${length} caractères.`;
t.pt[m] = (field, length) => `O campo ${field} não pode ter mais de ${length} caracteres.`;

m = msg.INVALID_EMAIL;
t.en[m] = "Invalid email";
t.es[m] = "Correo electrónico inválido";
t.fr[m] = "Email invalide";
t.pt[m] = "Email inválido";

m = msg.INVALID_ROLE;
t.en[m] = "Invalid role";
t.es[m] = "Rol inválido";
t.fr[m] = "Rôle invalide";
t.pt[m] = "Função inválida";

m = msg.LOGGED_IN;
t.en[m] = "Logged in";
t.es[m] = "Sesión iniciada";
t.fr[m] = "Connecté";
t.pt[m] = "Conectado";

m = msg.UNKNOWN_TRANSLATION;
t.en[m] = "Unknown translation";
t.es[m] = "Traducción desconocida";
t.fr[m] = "Traduction inconnue";
t.pt[m] = "Tradução desconhecida";



export function LangFromReq(req) {
    var language = req.headers['accept-language'];
    if (!language || !translations[language]) {
        language = DEFAULT_LANG;
    }
    return new MultiLanguage(language);
}

class MultiLanguage {
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

    // Este método se usa para abreviar el llamado a errorObj en los Controllers
    // para el tipo de error más usado (INTERNAL_SERVER_ERROR).
    internalServerErrorObj(error) { 
        return this.errorObj(error, msg.INTERNAL_SERVER_ERROR);
    }

    // Este método se usa para abreviar el llamado a
    resMsjObj(data, key, ...args) {
        return {
            message: this.tr(key, ...args),
            data
        }
    }
    
}

export default MultiLanguage;