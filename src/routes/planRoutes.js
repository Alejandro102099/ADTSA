/**
 * Enrutador de planes turísticos: CRUD bajo el prefijo /planes.
 */

const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");

router.get("/", planController.obtenerPlanes);             /* GET /planes */
router.get("/:id", planController.obtenerPlanPorId);       /* GET /planes/1 */
router.post("/", planController.crearPlan);                /* POST /planes */
router.put("/:id", planController.actualizarPlan);         /* PUT /planes/1 */
router.delete("/:id", planController.eliminarPlan);        /* DELETE /planes/1 */

module.exports = router;
