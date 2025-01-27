# TP Final - Diplomatura Web Full Stack UTN 2024 🌐

Este repositorio contiene el Trabajo Práctico 4 (TP4) del curso de Desarrollo Full Stack de la UTN.

## Descripción

Este proyecto es una **API REST** desarrollada como trabajo práctico final para la Diplomatura en Desarrollo Web Full Stack de la **UTN**.

Esta API es parte de un sistema de gestión de proyectos y registro de tareas, y permite realizar operaciones CRUD sobre los siguientes modelos: **User**, **Project** y **Task**.

---

## 🛠️ Tecnologías utilizadas

- **Node.js**
- **Express.js**
- **MongoDB** con **Mongoose**
- **jsonwebtoken**
- **bcrypt**
- **dotenv**

---

## 🚀 Cómo correr el proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/dregio/UTN-2024-TP4.git
```

### 2. Instalar dependencias
Accede a la carpeta raíz del proyecto y ejecuta:
```bash
npm i
```

### 3. Configurar variables de entorno
Asegúrate de que el archivo `.env` del proyecto esté configurado con las credenciales correctas para conectar a MongoDB. Un ejemplo del archivo `.env` podría ser:
```
PORT=3001
MONGODB_URI="mongodb://127.0.0.1:27017/RegioTasks"
DEFAULT_LANGUAGE="pt"
SESSION_SECRET="secreto"
```

- PORT: El puerto de la API.
- MONGODB_URI: Debe apuntar a la base de datos MongoDB.
- DEFAULT_LANGUAGE: Indica el idioma a utilizar. Ver los idiomas disponibles en la sección **Internacionalización**.
- SESSION_SECRET: El secreto a utilizar.

#### 3.1 Internacionalización

Este proyecto está realizado con capacidad de multi-idioma.

Los mensajes devueltos por la aplicación se convierten automáticamente al idioma elegido.

En `multiLanguage.js` se define un idioma por defecto. Actualmente es 'pt', a fines de demostración.

Sin embargo, se puede cambiar a los demás idiomas disponibles:
- **en**: inglés
- **es**: español
- **pt**: portugués
- **fr**: francés
- **de**: alemán

Además de adaptarlo en el código, también puede ser configurado en el archivo `.env`, en la variable DEFAULT_LANGUAGE.

Y finalmente, también se puede incluir en el header del request la clave `Accept-Language` y el valor correspondiente  al idioma deseado, que será válido solamente en dicho request.

Si una frase no está traducida al idioma solicitado, se utiliza la traducción en el idioma fallback, que por definición siempre tiene una traducción.


### 4. Configurar la base de datos
1. Abre **MongoDB Compass** u otra herramienta para gestionar MongoDB.
2. Conecta a tu instancia de MongoDB y verifica que la base de datos mencionada en el `.env` esté accesible.

### 5. Iniciar el servidor
Ejecuta el siguiente comando para iniciar el servidor en modo de desarrollo:
```bash
npm run dev
```

Para iniciarlo en modo de producción usar:

```bash
npm run start
```

---

## 📌 Endpoints disponibles

### Versionado de la API

La API está desarrollada para soportar modificaciones importantes a futuro. Para ello, la ruta actual de la API incluye siempre 'v1'. En futuras modificaciones, para no perder la compatibilidad hacia atrás con clientes anteriores, cambios relevantes se podrían implementar como 'v2', etc.

### Protección de las rutas

Todas las rutas que acceden a datos relevantes están protegidas por el token devuelto en el inicio de sesión, excepto `/api/v1/user/create`, para permitir crear el primer usuario e iniciar sesión con él para crear el resto de los objetos.

### **User**
- `GET` - `/api/v1/user/get`  
- `POST` - `/api/v1/user/create`  
- `GET` - `/api/v1/user/get-by-id/:id`  
- `PUT` - `/api/v1/user/update/:id`  
- `DELETE` - `/api/v1/user/delete/:id`  
- `POST` - `/api/v1/user/login`  

### **Project**
- `GET` - `/api/v1/project/get`  
- `POST` - `/api/v1/project/create`  
- `GET` - `/api/v1/project/get-by-id/:id`  
- `PUT` - `/api/v1/project/update/:id`  
- `DELETE` - `/api/v1/project/delete/:id`  

### **Task**
- `GET` - `/api/v1/task/get`  
- `POST` - `/api/v1/task/create`  
- `GET` - `/api/v1/task/get-by-id/:id`  
- `GET` - `/api/v1/task/get-by-project-id/:id`  
- `PUT` - `/api/v1/task/update/:id`  
- `DELETE` - `/api/v1/task/delete/:id`  
- `GET` - `/api/v1/task/status`  
- `GET` - `/api/v1/task/prio`  

---

## 🔧 Ejemplos de datos mock

### **User**
Para probar la creación de un usuario con `POST /api/v1/user/create`, puedes usar el siguiente ejemplo:
```json
{
	"name": "Diego",
	"password": "asdf1234",
	"email": "diego@gmail.com",
	"role": "ADMIN"
}
```

Existen tres tipos de usuario:
- `USER`: usuario normal.
- `PM`: project manager.
- `ADMIN`: administrador del sistema.

Cada uno tendrá acceso a solamente las funcionalidades relevantes. 

**Nota:** esto no está implementado aún.

#### Ejemplos de otros tipos de usuario:

Este usuario es un Project Manager, solamente con los datos básicos:
```json
{
	"name": "Roberto",
	"password": "asdf1234",
	"email": "roberto@gmail.com",
	"role": "PM"
}
```

Y este es un usuario regular, pero se incluyen aquí todos los datos soportados por el modelo:

```json
{
	"name": "Pablo",
	"password": "1234567A",
	"email": "pablo@yahoo.com.ar",
	"role": "USER",
	"_id": "67965b19b367cdb3e1d48d17",
	"createdAt": "2025-01-26T15:56:09.862Z",
	"__v": 0
}
```


### **Project**
Para probar la creación de un proyecto con `POST /api/v1/project/create`, puedes usar el siguiente ejemplo:
```json
{
	"name": "Proyecto A",
	"description": "Descripción breve del proyecto A."
}
```

Y este es un proyecto que incluye todos los datos soportados por el modelo:

```json
{
	"name": "Proyecto B",
	"description": "Descripción breve del proyecto B.",
	"picture": "https://picsum.photos/200",
	"_id": "679661486cc30b9dcbd786d8",
	"__v": 0
}
```

### **Task**
Para probar la creación de una tarea con `POST /api/v1/task/create`, puedes usar el siguiente ejemplo:
```json
{
	"number": 1,
	"title": "Tarea 1",
	"user_id": "67959c19188fd6c1c22dbca0",
	"project_id": "679660ea971163f55f5278db"
}
```
Y finalmente esta es una tarea con todos los datos soportados por el modelo:

```json
{
	"number": 2,
	"title": "Tarea 2",
	"status": "NOT_STARTED",
	"priority": "0",
	"project_id": "679660ea971163f55f5278db",
	"user_id": "67959c19188fd6c1c22dbca0",
	"_id": "67969dfd74506d4cc6acfc78",
	"createdAt": "2025-01-26T20:41:33.245Z",
	"modified_at": "2025-01-26T20:41:33.245Z",
	"__v": 0
}
```

Considerar los siguientes datos en el modelo de Task:

- **number**: es un número de tarea, que debe ser único dentro del proyecto. Una tarea puede ser cambiada a un proyecto distinto, siempre que en el proyecto de destino no exista otra tarea con el mísmo número.
- **status**: tiene los siguientes valores posibles:
    - `NOT_STARTED`: Tarea no iniciada.
    - `STARTED`: Tarea iniciada.
    - `FINISHED`: Tarea finalizada.
- **priority**: indica la prioridad de la tarea, y puede ser uno de los siguientes valores:
    - `0`: Prioridad no especificada.
    - `1`: Prioridad 1.
    - `2`: Prioridad 2.
    - `3`: Prioridad 3.

---

## 🧪 Comandos para probar la aplicación

1. **Iniciar el servidor**:  
	 ```bash
	 npm run dev
	 ```

2. **Probar los endpoints**:  
	 Usa herramientas como **Postman** u otro **cliente** para enviar solicitudes a los endpoints listados anteriormente. Por ejemplo, para obtener todos los usuarios:
	 ```bash
	 http://localhost:3001/api/v1/user/get
	 ```

3. **Probar datos mock**:  
	 Envía los ejemplos de datos JSON mencionados anteriormente en el cuerpo de las solicitudes `POST`.

	 Recuerda que en cada solicitud es posible especificar un idioma en el parámetro `Accept-Language` del encabezado, indicando el código del idioma deseado.