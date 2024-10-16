const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const router = require('./routes/signos.routes.js');

// Conectar a MongoDB
mongoose.connect('mongodb+srv://dbUser:db123User@clusteru.sevud.mongodb.net/?retryWrites=true&w=majority&appName=ClusterU', {
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.log('Error al conectar a MongoDB:', err));

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(4000, () => {
    console.log('Servidor corriendo en el puerto 4000');
});
