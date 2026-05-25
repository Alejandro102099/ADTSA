/**
 * Controlador de planes turísticos - lógica de negocio y respuestas HTTP.
 */

const planModel = require("../models/planModel");
const { validarCamposRequeridos } = require("../middleware/validate");

function parseId(param) {
  const id = parseInt(param, 10);
  return Number.isNaN(id) ? null : id;
}

function obtenerPlanes(req, res, next) {
  try {
    const planes = planModel.obtenerTodos();
    res.status(200).json({
      success: true,
      cantidad: planes.length,
      data: planes,
    });
  } catch (error) {
    next(error);
  }
}

function obtenerPlanPorId(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (id === null) {
      return res.status(400).json({
        success: false,
        mensaje: "El id debe ser un número válido",
      });
    }

    const plan = planModel.obtenerPorId(id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        mensaje: `Plan turístico con id ${id} no encontrado`,
      });
    }

    res.status(200).json({ success: true, data: plan });
  } catch (error) {
    next(error);
  }
}

function crearPlan(req, res, next) {
  try {
    validarCamposRequeridos(req.body, planModel.CAMPOS_REQUERIDOS);

    const plan = planModel.crear(req.body);
    res.status(201).json({
      success: true,
      mensaje: "Plan turístico creado exitosamente",
      data: plan,
    });
  } catch (error) {
    next(error);
  }
}

function actualizarPlan(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (id === null) {
      return res.status(400).json({
        success: false,
        mensaje: "El id debe ser un número válido",
      });
    }

    validarCamposRequeridos(req.body, planModel.CAMPOS_REQUERIDOS);

    const plan = planModel.actualizar(id, req.body);
    if (!plan) {
      return res.status(404).json({
        success: false,
        mensaje: `Plan turístico con id ${id} no encontrado`,
      });
    }

    res.status(200).json({
      success: true,
      mensaje: "Plan turístico actualizado exitosamente",
      data: plan,
    });
  } catch (error) {
    next(error);
  }
}

function eliminarPlan(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (id === null) {
      return res.status(400).json({
        success: false,
        mensaje: "El id debe ser un número válido",
      });
    }

    const plan = planModel.eliminar(id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        mensaje: `Plan turístico con id ${id} no encontrado`,
      });
    }

    res.status(200).json({
      success: true,
      mensaje: "Plan turístico eliminado exitosamente",
      data: plan,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  obtenerPlanes,
  obtenerPlanPorId,
  crearPlan,
  actualizarPlan,
  eliminarPlan,
};
