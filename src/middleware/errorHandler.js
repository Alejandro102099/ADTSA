/**
 * Middleware centralizado para manejo de errores HTTP.
 */

function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
}

function errorHandler(err, req, res, next) {
  console.error("[ADSTA Error]", err.message);

  const statusCode = err.statusCode || 500;
  const mensaje =
    statusCode === 500
      ? "Error interno del servidor"
      : err.message || "Ha ocurrido un error";

  res.status(statusCode).json({
    success: false,
    mensaje,
    ...(process.env.NODE_ENV === "development" && { detalle: err.stack }),
  });
}

module.exports = { notFoundHandler, errorHandler };
