/**
 * Recibe peticiones HTTP de reservas; valida que el hotel o plan exista.
 */

const reservaModel = require("../models/reservaModel");
const {
  validarCamposRequeridos,
  validarTipoReserva,
} = require("../middleware/validate");

function parseId(param) {
  const id = parseInt(param, 10);
  return Number.isNaN(id) ? null : id;
}

/** GET /reservas — Lista todas las reservas */
function obtenerReservas(req, res, next) {
  try {
    const reservas = reservaModel.obtenerTodos();
    res.status(200).json({
      success: true,
      cantidad: reservas.length,
      data: reservas,
    });
  } catch (error) {
    next(error);
  }
}

/** GET /reservas/:id — Una reserva o 404 */
function obtenerReservaPorId(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (id === null) {
      return res.status(400).json({
        success: false,
        mensaje: "El id debe ser un número válido",
      });
    }

    const reserva = reservaModel.obtenerPorId(id);
    if (!reserva) {
      return res.status(404).json({
        success: false,
        mensaje: `Reserva con id ${id} no encontrada`,
      });
    }

    res.status(200).json({ success: true, data: reserva });
  } catch (error) {
    next(error);
  }
}

/** POST /reservas — Crea reserva si el hotel/plan referenciado existe */
function crearReserva(req, res, next) {
  try {
    validarCamposRequeridos(req.body, reservaModel.CAMPOS_REQUERIDOS);
    validarTipoReserva(req.body.tipoReserva);

    const reservadoId = Number(req.body.reservadoId);
    if (!reservaModel.validarReservadoExiste(req.body.tipoReserva, reservadoId)) {
      return res.status(404).json({
        success: false,
        mensaje: `No existe ${req.body.tipoReserva} con id ${reservadoId}`,
      });
    }

    const reserva = reservaModel.crear(req.body);
    res.status(201).json({
      success: true,
      mensaje: "Reserva creada exitosamente",
      data: reserva,
    });
  } catch (error) {
    next(error);
  }
}

/** PUT /reservas/:id — Actualiza reserva y revalida hotel/plan */
function actualizarReserva(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (id === null) {
      return res.status(400).json({
        success: false,
        mensaje: "El id debe ser un número válido",
      });
    }

    validarCamposRequeridos(req.body, reservaModel.CAMPOS_REQUERIDOS);
    validarTipoReserva(req.body.tipoReserva);

    const reservadoId = Number(req.body.reservadoId);
    if (!reservaModel.validarReservadoExiste(req.body.tipoReserva, reservadoId)) {
      return res.status(404).json({
        success: false,
        mensaje: `No existe ${req.body.tipoReserva} con id ${reservadoId}`,
      });
    }

    const reserva = reservaModel.actualizar(id, req.body);
    if (!reserva) {
      return res.status(404).json({
        success: false,
        mensaje: `Reserva con id ${id} no encontrada`,
      });
    }

    res.status(200).json({
      success: true,
      mensaje: "Reserva actualizada exitosamente",
      data: reserva,
    });
  } catch (error) {
    next(error);
  }
}

/** DELETE /reservas/:id — Elimina reserva */
function eliminarReserva(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (id === null) {
      return res.status(400).json({
        success: false,
        mensaje: "El id debe ser un número válido",
      });
    }

    const reserva = reservaModel.eliminar(id);
    if (!reserva) {
      return res.status(404).json({
        success: false,
        mensaje: `Reserva con id ${id} no encontrada`,
      });
    }

    res.status(200).json({
      success: true,
      mensaje: "Reserva eliminada exitosamente",
      data: reserva,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  obtenerReservas,
  obtenerReservaPorId,
  crearReserva,
  actualizarReserva,
  eliminarReserva,
};
