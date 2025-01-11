import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors({ origin: 'http://localhost:3000', methods: 'GET,POST,PUT,DELETE' }));

app.use(bodyParser.json()); // TODO - ver si es necesario bodyParser.

app.use(bodyParser.urlencoded({ extended: true })); // TODO - ver si es necesario URLENCODED.

app.listen(3001, () => {
  console.log('Server running on port 3001'); // TODO: Pasar el puerto a una variable de entorno.
});

