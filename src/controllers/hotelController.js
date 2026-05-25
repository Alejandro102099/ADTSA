/**
 * Controlador de hoteles - lógica de negocio y respuestas HTTP.
 */

const hotelModel = require("../models/hotelModel");
const { validarCamposRequeridos } = require("../middleware/validate");

function parseId(param) {
  const id = parseInt(param, 10);
  return Number.isNaN(id) ? null : id;
}

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
