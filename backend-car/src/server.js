const cors = require('cors');
require('dotenv').config();

const express = require('express');
const veiculoRoutes = require('./routes/veiculoRoutes');
const locacaoRoutes = require('./routes/locacaoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/api', veiculoRoutes);
app.use('/api', locacaoRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor a correr com sucesso na porta ${PORT} 🚀`);
  console.log(`Veículos: http://localhost:${PORT}/api/veiculos`);
  console.log(`Cadastro: http://localhost:${PORT}/api/auth/register`);
});
