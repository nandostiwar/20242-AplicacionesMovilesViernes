const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const usuariosRouter = require('./routes/usuarios');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/usuarios', usuariosRouter);

app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:${PORT}');
});