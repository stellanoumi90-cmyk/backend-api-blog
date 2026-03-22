const app = require('./app');
require('./config/database');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('==============================================');
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`API disponible sur: http://localhost:${PORT}`);
  console.log(`Documentation Swagger: http://localhost:${PORT}/api-docs`);
  console.log(`Swagger JSON: http://localhost:${PORT}/swagger.json`);
  console.log('==============================================');
});
