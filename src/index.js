const app = require('./express/app');
const sequelize = require('./sequelize');
const PORT = 8080;

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
      await sequelize.authenticate();
      console.log('Database connection OK!');
  } catch (error) {
      console.log('Unable to connect to the database:');
      console.log(error.message);
      process.exit(1);
  }
}

async function startServer() {
  await assertDatabaseConnectionOk();

  await sequelize.sync(); 
  console.log('Tablas sincronizadas correctamente');
   
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

startServer();
