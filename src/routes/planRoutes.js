/**
 * Rutas REST para el módulo de planes turísticos.
 */

const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");

router.get("/", planController.obtenerPlanes);
router.get("/:id", planController.obtenerPlanPorId);
router.post("/", planController.crearPlan);
router.put("/:id", planController.actualizarPlan);
router.delete("/:id", planController.eliminarPlan);

module.exports = router;
