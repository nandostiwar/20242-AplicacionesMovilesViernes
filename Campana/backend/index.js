// backend/index.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Importar las rutas
const userRoutes = require('./routes/userRoutes');
const premioRoutes = require('./routes/premioRoutes');

// Usar las rutas
app.use('/api/users', userRoutes);
app.use('/api/premios', premioRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
