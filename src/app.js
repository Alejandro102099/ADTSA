/**
 * Configuración de Express: middlewares, rutas de la API y panel web.
 */

const express = require("express");
const path = require("path");
const hotelRoutes = require("./routes/hotelRoutes");
const planRoutes = require("./routes/planRoutes");
const reservaRoutes = require("./routes/reservaRoutes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const app = express();

/* Permite que el navegador (index.html) llame a la API sin bloqueo CORS */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

/* Convierte el cuerpo de las peticiones POST/PUT de texto JSON a objeto */
app.use(express.json());

/* Sirve el dashboard de hoteles en http://localhost:3000/panel */
app.get("/panel", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

/* Respuesta de bienvenida con lista de endpoints disponibles */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    mensaje: "Bienvenido a ADSTA API - Turismo en San Agustín, Huila",
    version: "1.0.0",
    endpoints: {
      hoteles: "/hoteles",
      planes: "/planes",
      reservas: "/reservas",
    },
    contexto:
      "Plataforma para reservas de hoteles, planes turísticos, geolocalización, chatbots, reportes y pagos electrónicos.",
  });
});

/* Enlaza cada prefijo de URL con su archivo de rutas */
app.use("/hoteles", hotelRoutes);
app.use("/planes", planRoutes);
app.use("/reservas", reservaRoutes);

/* Al final: rutas inexistentes (404) y errores no capturados (500) */
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
