/**
 * Configuración principal de la aplicación Express - ADSTA API.
 * Plataforma turística para San Agustín, Huila, Colombia.
 */

const express = require("express");
const path = require("path");
const hotelRoutes = require("./routes/hotelRoutes");
const planRoutes = require("./routes/planRoutes");
const reservaRoutes = require("./routes/reservaRoutes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const app = express();

// CORS para permitir el panel web (index.html) desde el navegador
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Panel visual de hoteles
app.get("/panel", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// Ruta de bienvenida e información de la API
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

// Registro de rutas por módulo
app.use("/hoteles", hotelRoutes);
app.use("/planes", planRoutes);
app.use("/reservas", reservaRoutes);

// Manejo de rutas no encontradas y errores globales
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
