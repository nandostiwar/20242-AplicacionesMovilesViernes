const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000; 
const routes = require('./routes/parcial.routes.js');


// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/', routes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
