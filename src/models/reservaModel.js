/**
 * Modelo en memoria para reservas de ADSTA.
 * Una reserva puede asociarse a un hotel o a un plan turístico.
 */

const { reservasIniciales } = require("../data/seed");
const hotelModel = require("./hotelModel");
const planModel = require("./planModel");

let reservas = [...reservasIniciales];
let siguienteId = reservas.length + 1;

const CAMPOS_REQUERIDOS = [
  "nombreCliente",
  "tipoReserva",
  "reservadoId",
  "fecha",
  "cantidadPersonas",
];

/**
 * Resuelve el nombre del hotel o plan según tipo e id.
 */
function resolverNombreReservado(tipoReserva, reservadoId) {
  if (tipoReserva === "hotel") {
    const hotel = hotelModel.obtenerPorId(reservadoId);
    return hotel ? hotel.nombre : null;
  }
  if (tipoReserva === "plan") {
    const plan = planModel.obtenerPorId(reservadoId);
    return plan ? plan.nombre : null;
  }
  return null;
}

function validarReservadoExiste(tipoReserva, reservadoId) {
  if (tipoReserva === "hotel") {
    return hotelModel.obtenerPorId(reservadoId) !== undefined;
  }
  if (tipoReserva === "plan") {
    return planModel.obtenerPorId(reservadoId) !== undefined;
  }
  return false;
}

function obtenerTodos() {
  return reservas;
}

function obtenerPorId(id) {
  return reservas.find((r) => r.id === id);
}

function crear(datos) {
  const reservadoNombre =
    datos.reservadoNombre ||
    resolverNombreReservado(datos.tipoReserva, Number(datos.reservadoId));

  const nuevaReserva = {
    id: siguienteId++,
    nombreCliente: datos.nombreCliente,
    tipoReserva: datos.tipoReserva,
    reservadoId: Number(datos.reservadoId),
    reservadoNombre: reservadoNombre || "Sin nombre",
    fecha: datos.fecha,
    cantidadPersonas: Number(datos.cantidadPersonas),
  };

  reservas.push(nuevaReserva);
  return nuevaReserva;
}

function actualizar(id, datos) {
  const indice = reservas.findIndex((r) => r.id === id);
  if (indice === -1) return null;

  const tipoReserva = datos.tipoReserva ?? reservas[indice].tipoReserva;
  const reservadoId =
    datos.reservadoId !== undefined
      ? Number(datos.reservadoId)
      : reservas[indice].reservadoId;

  const reservadoNombre =
    datos.reservadoNombre ||
    resolverNombreReservado(tipoReserva, reservadoId) ||
    reservas[indice].reservadoNombre;

  reservas[indice] = {
    ...reservas[indice],
    nombreCliente: datos.nombreCliente ?? reservas[indice].nombreCliente,
    tipoReserva,
    reservadoId,
    reservadoNombre,
    fecha: datos.fecha ?? reservas[indice].fecha,
    cantidadPersonas:
      datos.cantidadPersonas !== undefined
        ? Number(datos.cantidadPersonas)
        : reservas[indice].cantidadPersonas,
  };

  return reservas[indice];
}

function eliminar(id) {
  const indice = reservas.findIndex((r) => r.id === id);
  if (indice === -1) return null;
  const [eliminada] = reservas.splice(indice, 1);
  return eliminada;
}

module.exports = {
  CAMPOS_REQUERIDOS,
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  validarReservadoExiste,
};
