/**
 * Respuestas uniformes cuando la ruta no existe o ocurre un error en la API.
 */

/** Devuelve 404 si la URL o el método HTTP no están definidos en la app */
function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
}

/** Captura errores lanzados en controladores; usa statusCode del error o 500 por defecto */
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
