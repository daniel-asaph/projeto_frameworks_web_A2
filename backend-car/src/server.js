const express = require('express');
const veiculoRoutes = require('./routes/veiculoRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', veiculoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor a correr com sucesso na porta ${PORT} 🚀`);
  console.log(`Testa no Thunder Client: http://localhost:${PORT}/api/veiculos`);
});