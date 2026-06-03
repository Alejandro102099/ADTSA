/**
 * Recibe peticiones HTTP de hoteles, valida datos y responde en JSON.
 */

const hotelModel = require("../models/hotelModel");
const { validarCamposRequeridos } = require("../middleware/validate");

/** Convierte :id de la URL a número; null si no es válido */
function parseId(param) {
  const id = parseInt(param, 10);
  return Number.isNaN(id) ? null : id;
}

/** GET /hoteles — Lista todos los hoteles */
function obtenerHoteles(req, res, next) {
  try {
    const hoteles = hotelModel.obtenerTodos();
    res.status(200).json({
      success: true,
      cantidad: hoteles.length,
      data: hoteles,
    });
  } catch (error) {
    next(error);
  }
}

/** GET /hoteles/:id — Un hotel o 404 */
function obtenerHotelPorId(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (id === null) {
      return res.status(400).json({
        success: false,
        mensaje: "El id debe ser un número válido",
      });
    }

    const hotel = hotelModel.obtenerPorId(id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        mensaje: `Hotel con id ${id} no encontrado`,
      });
    }

    res.status(200).json({ success: true, data: hotel });
  } catch (error) {
    next(error);
  }
}

/** POST /hoteles — Crea hotel; responde 201 */
function crearHotel(req, res, next) {
  try {
    validarCamposRequeridos(req.body, hotelModel.CAMPOS_REQUERIDOS);

    const hotel = hotelModel.crear(req.body);
    res.status(201).json({
      success: true,
      mensaje: "Hotel creado exitosamente",
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
}

/** PUT /hoteles/:id — Actualiza hotel existente */
function actualizarHotel(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (id === null) {
      return res.status(400).json({
        success: false,
        mensaje: "El id debe ser un número válido",
      });
    }

    validarCamposRequeridos(req.body, hotelModel.CAMPOS_REQUERIDOS);

    const hotel = hotelModel.actualizar(id, req.body);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        mensaje: `Hotel con id ${id} no encontrado`,
      });
    }

    res.status(200).json({
      success: true,
      mensaje: "Hotel actualizado exitosamente",
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
}

/** DELETE /hoteles/:id — Elimina y devuelve el registro borrado */
function eliminarHotel(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (id === null) {
      return res.status(400).json({
        success: false,
        mensaje: "El id debe ser un número válido",
      });
    }

    const hotel = hotelModel.eliminar(id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        mensaje: `Hotel con id ${id} no encontrado`,
      });
    }

    res.status(200).json({
      success: true,
      mensaje: "Hotel eliminado exitosamente",
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  obtenerHoteles,
  obtenerHotelPorId,
  crearHotel,
  actualizarHotel,
  eliminarHotel,
};
