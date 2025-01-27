import { debugging } from "../config.js";

export var DEFAULT_LANG = 'pt'; 
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
    pt: {},
	de: {}
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
	USER_EMAIL_ALREADY_EXISTS: null,
    USER_CREATED: null,
    USER_NOT_FOUND: null,
    USER_UPDATED: null,
    USER_DELETED: null,
	USER_OR_PASSWORD_INCORRECT: null,

    // Tasks
    NO_TASKS_FOUND: null,
    NO_TASKS_FOR_PROJECT: null,
    TASK_CREATED: null,
    TASK_NOT_FOUND: null,
	TASK_UPDATED: null,
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
	PASSWORD_REQUIREMENTS_NOT_MET: null,
    EMAIL_FIELD: null,
    FIELD_MAX_LENGTH: null,
    FIELD_REQUIRED: null,
    INVALID_EMAIL: null,
	INVALID_ROLE: null,
	LOGGED_IN: null,

	NO_MESSAGE_KEY_PROVIDED: null,
    // Traducción desconocida. Cuando no se encuentra una traducción para una
    // clave en el idioma solicitado ni en el idioma fallback, se utiliza este
    // mensaje. 
    UNKNOWN_TRANSLATION: null
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
var m = "";

m = msg.CONNECTING_TO_DB;
t.en[m] = "Connecting to database...";
t.es[m] = "Conectando a la base de datos...";
t.fr[m] = "Connexion à la base de données...";
t.pt[m] = "Conectando ao banco de dados...";
t.de[m] = "Verbindung zur Datenbank wird hergestellt...";

m = msg.SERVER_RUNNING_ON_PORT;
t.en[m] = (port) => `Server running on port ${port}`;
t.es[m] = (port) => `Servidor corriendo en puerto ${port}`;
t.fr[m] = (port) => `Serveur en cours d'exécution sur le port ${port}`;
t.pt[m] = (port) => `Servidor rodando na porta ${port}`;
t.de[m] = (port) => `Server läuft auf Port ${port}`;

m = msg.INTERNAL_SERVER_ERROR;
t.en[m] = "Internal server error.";
t.es[m] = "Error interno del servidor";
t.fr[m] = "Erreur interne du serveur.";
t.pt[m] = "Erro interno de servidor.";
t.de[m] = "Interner Serverfehler.";

m = msg.NO_TOKEN_PROVIDED;
t.en[m] = "No token provided";
t.es[m] = "No se proporcionó un token";
t.fr[m] = "Aucun jeton fourni";
t.pt[m] = "Nenhum token fornecido";
t.de[m] = "Kein Token bereitgestellt";

m = msg.INVALID_TOKEN;
t.en[m] = "Invalid token";
t.es[m] = "Token inválido";
t.fr[m] = "Jeton invalide";
t.pt[m] = "Token inválido";
t.de[m] = "Ungültiges Token";

// Users

m = msg.NO_USERS_FOUND;
t.en[m] = "No users found";
t.es[m] = "No se encontraron usuarios";
t.fr[m] = "Aucun utilisateur trouvé";
t.pt[m] = "Nenhum usuário encontrado";
t.de[m] = "Keine Benutzer gefunden";

m = msg.USER_EMAIL_ALREADY_EXISTS;
t.en[m] = "A user with that email already exists";
t.es[m] = "Ya existe un usuario con el correo especificado";
t.fr[m] = "Un utilisateur avec l'email spécifié existe déjà";
t.pt[m] = "Já existe um usuário com o email especificado";
t.de[m] = "Ein Benutzer mit dieser E-Mail existiert bereits";

m = msg.USER_CREATED;
t.en[m] = "User created";
t.es[m] = "Usuario creado";
t.fr[m] = "Utilisateur créé";
t.pt[m] = "Usuário criado";
t.de[m] = "Benutzer erstellt";

m = msg.USER_NOT_FOUND;
t.en[m] = (id) => `User ${id} not found.`;
t.es[m] = (id) => `Usuario ${id} no encontrado.`;
t.fr[m] = (id) => `Utilisateur ${id} non trouvé.`;
t.pt[m] = (id) => `Usuário ${id} não encontrado.`;
t.de[m] = (id) => `Benutzer ${id} nicht gefunden.`;

m = msg.USER_UPDATED;
t.en[m] = "User updated";
t.es[m] = "Usuario actualizado";
t.fr[m] = "Utilisateur mis à jour";
t.pt[m] = "Usuário atualizado";
t.de[m] = "Benutzer aktualisiert";

m = msg.USER_DELETED;
t.en[m] = "User deleted";
t.es[m] = "Usuario eliminado";
t.fr[m] = "Utilisateur supprimé";
t.pt[m] = "Usuário excluído";
t.de[m] = "Benutzer gelöscht";

m = msg.USER_OR_PASSWORD_INCORRECT;
t.en[m] = "User or password incorrect";
t.es[m] = "Usuario o contraseña incorrectos";
t.fr[m] = "Utilisateur ou mot de passe incorrect";
t.pt[m] = "Usuário ou senha incorretos";
t.de[m] = "Benutzer oder Passwort falsch";


// Tasks

m = msg.NO_TASKS_FOUND;
t.en[m] = "No tasks found";
t.es[m] = "No se encontraron tareas";
t.fr[m] = "Aucune tâche trouvée";
t.pt[m] = "Nenhuma tarefa encontrada";
t.de[m] = "Keine Aufgaben gefunden";

m = msg.NO_TASKS_FOR_PROJECT;
t.en[m] = "No tasks found for this project";
t.es[m] = "No se encontraron tareas para este proyecto";
t.fr[m] = "Aucune tâche trouvée pour ce projet";
t.pt[m] = "Nenhuma tarefa encontrada para este projeto";
t.de[m] = "Keine Aufgaben für dieses Projekt gefunden";

m = msg.TASK_CREATED;
t.en[m] = "Task created";
t.es[m] = "Tarea creada";
t.fr[m] = "Tâche créée";
t.pt[m] = "Tarefa criada";
t.de[m] = "Aufgabe erstellt";

m = msg.TASK_NOT_FOUND;
t.en[m] = (id) => `Task ${id} not found.`;
t.es[m] = (id) => `Tarea ${id} no encontrada.`;
t.fr[m] = (id) => `Tâche ${id} non trouvée.`;
t.pt[m] = (id) => `Tarefa ${id} não encontrada.`;
t.de[m] = (id) => `Aufgabe ${id} nicht gefunden.`;

m = msg.TASK_UPDATED;
t.en[m] = "Task updated";
t.es[m] = "Tarea actualizada";
t.fr[m] = "Tâche mise à jour";
t.pt[m] = "Tarefa atualizada";
t.de[m] = "Aufgabe aktualisiert";

m = msg.TASK_DELETED;
t.en[m] = "Task deleted";
t.es[m] = "Tarea eliminada";
t.fr[m] = "Tâche supprimée";
t.pt[m] = "Tarefa excluída";
t.de[m] = "Aufgabe gelöscht";

m = msg.TASK_NUMBER_ALREADY_EXISTS;
t.en[m] = (number) => `A task with number ${number} already exists in the specified project.`;
t.es[m] = (number) => `Ya existe una tarea con el número ${number} en el proyecto especificado.`;
t.fr[m] = (number) => `Une tâche avec le numéro ${number} existe déjà dans le projet spécifié.`;
t.pt[m] = (number) => `Já existe uma tarefa com o número ${number} no projeto especificado.`;
t.de[m] = (number) => `Eine Aufgabe mit der Nummer ${number} existiert bereits im angegebenen Projekt.`;

// Projects

m = msg.PROJECT_NOT_FOUND;
t.en[m] = (id) => `Project ${id} not found.`;
t.es[m] = (id) => `Proyecto ${id} no encontrado.`;
t.fr[m] = (id) => `Projet ${id} non trouvé.`;
t.pt[m] = (id) => `Projeto ${id} não encontrado.`;
t.de[m] = (id) => `Projekt ${id} nicht gefunden.`;

m = msg.NO_PROJECTS_FOUND;
t.en[m] = "No projects found";
t.es[m] = "No se encontraron proyectos";
t.fr[m] = "Aucun projet trouvé";
t.pt[m] = "Nenhum projeto encontrado";
t.de[m] = "Keine Projekte gefunden";

m = msg.PROJECT_ALREADY_EXISTS;
t.en[m] = "A project with that name already exists";
t.es[m] = "Ya existe un proyecto con ese nombre";
t.fr[m] = "Un projet avec ce nom existe déjà";
t.pt[m] = "Já existe um projeto com esse nome";
t.de[m] = "Ein Projekt mit diesem Namen existiert bereits";

m = msg.PROJECT_CREATED;
t.en[m] = "Project created";
t.es[m] = "Proyecto creado";
t.fr[m] = "Projet créé";
t.pt[m] = "Projeto criado";
t.de[m] = "Projekt erstellt";

m = msg.PROJECT_UPDATED;
t.en[m] = "Project updated";
t.es[m] = "Proyecto actualizado";
t.fr[m] = "Projet mis à jour";
t.pt[m] = "Projeto atualizado";
t.de[m] = "Projekt aktualisiert";

m = msg.PROJECT_DELETED;
t.en[m] = "Project deleted";
t.es[m] = "Proyecto eliminado";
t.fr[m] = "Projet supprimé";
t.pt[m] = "Projeto excluído";
t.de[m] = "Projekt gelöscht";

// Schemas
m = msg.FIELD_REQUIRED;
t.en[m] = (field) => `The field ${field} is required.`;
t.es[m] = (field) => `El campo ${field} es requerido.`;
t.fr[m] = (field) => `Le champ ${field} est requis.`;
t.pt[m] = (field) => `O campo ${field} é obrigatório.`;
t.de[m] = (field) => `Das Feld ${field} ist erforderlich.`;

m = msg.USERNAME_FIELD;
t.en[m] = "User name";
t.es[m] = "Nombre de usuario";
t.fr[m] = "Nom d'utilisateur";
t.pt[m] = "Nome de usuário";
t.de[m] = "Benutzername";

m = msg.PASSWORD_FIELD;
t.en[m] = "Password";
t.es[m] = "Contraseña";
t.fr[m] = "Mot de passe";
t.pt[m] = "Senha";
t.de[m] = "Passwort";

m = msg.PASSWORD_REQUIREMENTS_NOT_MET;
t.en[m] = (minlen, maxlen) => `Invalid password. It must be between ${minlen} and ${maxlen} characters, and must include at least a letter and a number.`;
t.es[m] = (minlen, maxlen) => `Contraseña inválida. Debe tener entre ${minlen} y ${maxlen} caracteres, y debe incluir al menos una letra y un número.`;
t.fr[m] = (minlen, maxlen) => `Mot de passe invalide. Il doit contenir entre ${minlen} et ${maxlen} caractères, et doit inclure au moins une lettre et un chiffre.`;
t.pt[m] = (minlen, maxlen) => `Senha inválida. Deve ter entre ${minlen} e ${maxlen} caracteres, e deve incluir pelo menos uma letra e um número.`;
t.de[m] = (minlen, maxlen) => `Ungültiges Passwort. Es muss zwischen ${minlen} und ${maxlen} Zeichen lang sein und muss mindestens einen Buchstaben und eine Zahl enthalten.`;

m = msg.EMAIL_FIELD;
t.en[m] = "Email";
t.es[m] = "Correo electrónico";
t.fr[m] = "Email";
t.pt[m] = "Email";
t.de[m] = "Email";

m = msg.FIELD_MAX_LENGTH;
t.en[m] = (field, length) => `The field ${field} cannot be more than ${length} characters.`;
t.es[m] = (field, length) => `El campo ${field} no puede tener más de ${length} caracteres.`;
t.fr[m] = (field, length) => `Le champ ${field} ne peut pas dépasser ${length} caractères.`;
t.pt[m] = (field, length) => `O campo ${field} não pode ter mais de ${length} caracteres.`;
t.de[m] = (field, length) => `Das Feld ${field} darf nicht mehr als ${length} Zeichen enthalten.`;

m = msg.INVALID_EMAIL;
t.en[m] = "Invalid email";
t.es[m] = "Correo electrónico inválido";
t.fr[m] = "Email invalide";
t.pt[m] = "Email inválido";
t.de[m] = "Ungültige E-Mail";

m = msg.INVALID_ROLE;
t.en[m] = "Invalid role";
t.es[m] = "Rol inválido";
t.fr[m] = "Rôle invalide";
t.pt[m] = "Função inválida";
t.de[m] = "Ungültige Rolle";

m = msg.LOGGED_IN;
t.en[m] = "Logged in";
t.es[m] = "Sesión iniciada";
t.fr[m] = "Connecté";
t.pt[m] = "Conectado";
t.de[m] = "Eingeloggt";

m = msg.NO_MESSAGE_KEY_PROVIDED;
t.en[m] = "System error. No message key provided.";
t.es[m] = "Error del sistema. No se proporcionó una clave de mensaje.";
t.fr[m] = "Erreur système. Aucune clé de message fournie.";
t.pt[m] = "Erro do sistema. Nenhuma chave de mensagem fornecida.";
t.de[m] = "Systemfehler. Kein Nachrichtenschlüssel bereitgestellt.";

m = msg.UNKNOWN_TRANSLATION;
t.en[m] = "Unknown translation";
t.es[m] = "Traducción desconocida";
t.fr[m] = "Traduction inconnue";
t.pt[m] = "Tradução desconhecida";
t.de[m] = "Unbekannte Übersetzung";


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

    tr(key = msg.NO_MESSAGE_KEY_PROVIDED, ...args) {
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
    Ventajas: 
	- incluye el mensaje de error traducido; 
	- incluye el volcado de stack (sólo si debugging=true).
	- es más conciso que escribir el objeto a mano.
    */
    errorObj(error, key, ...args) {
		if (debugging) {
			return {
				message: this.tr(key, ...args), error: error.message,
				stack: error.stack  // El stack se envía solamente en depuración.
			}
		} else {
			return {
				message: this.tr(key, ...args), error: error.message
		}}
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