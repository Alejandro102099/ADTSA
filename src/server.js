/**
 * Punto de entrada: arranca Express y deja la API escuchando en el puerto 3000.
 */

const app = require("./app");

const PORT = 3000;

/* Inicia el servidor y muestra en consola las URLs principales */
app.listen(PORT, () => {
  console.log("========================================");
  console.log("  ADSTA API - Turismo San Agustín");
  console.log("  Huila, Colombia");
  console.log("========================================");
  console.log(`  Servidor activo en http://localhost:${PORT}`);
  console.log("  Endpoints:");
  console.log(`    GET  http://localhost:${PORT}/hoteles`);
  console.log(`    GET  http://localhost:${PORT}/planes`);
  console.log(`    GET  http://localhost:${PORT}/reservas`);
  console.log("========================================");
});
