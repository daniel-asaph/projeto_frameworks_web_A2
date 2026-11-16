const express = require('express');
const veiculoRoutes = require('./routes/veiculoRoutes');
const locacaoRoutes = require('./routes/locacaoRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', veiculoRoutes);
app.use('/api', locacaoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor a correr com sucesso na porta ${PORT}`);
});