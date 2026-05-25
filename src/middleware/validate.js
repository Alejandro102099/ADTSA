/**
 * Utilidades de validación para evitar registros incompletos.
 */

function validarCamposRequeridos(body, camposRequeridos) {
  const camposFaltantes = camposRequeridos.filter((campo) => {
    const valor = body[campo];
    return (
      valor === undefined ||
      valor === null ||
      (typeof valor === "string" && valor.trim() === "")
    );
  });

  if (camposFaltantes.length > 0) {
    const error = new Error(
      `Campos obligatorios faltantes o vacíos: ${camposFaltantes.join(", ")}`
    );
    error.statusCode = 400;
    throw error;
  }
}

function validarTipoReserva(tipoReserva) {
  const tiposValidos = ["hotel", "plan"];
  if (!tiposValidos.includes(tipoReserva)) {
    const error = new Error(
      `tipoReserva debe ser "hotel" o "plan". Recibido: ${tipoReserva}`
    );
    error.statusCode = 400;
    throw error;
  }
}

module.exports = { validarCamposRequeridos, validarTipoReserva };
