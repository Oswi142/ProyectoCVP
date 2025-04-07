import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import testRoutes from './routes/tests';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', authRoutes);
app.use('/api/tests', testRoutes);

// Ruta de prueba (opcional)
app.get('/', (_, res) => {
  res.send('API funcionando correctamente');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
