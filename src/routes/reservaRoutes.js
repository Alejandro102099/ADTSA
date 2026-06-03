/**
 * Enrutador de reservas: CRUD bajo el prefijo /reservas.
 */

const express = require("express");
const router = express.Router();
const reservaController = require("../controllers/reservaController");

router.get("/", reservaController.obtenerReservas);        /* GET /reservas */
router.get("/:id", reservaController.obtenerReservaPorId); /* GET /reservas/1 */
router.post("/", reservaController.crearReserva);            /* POST /reservas */
router.put("/:id", reservaController.actualizarReserva);     /* PUT /reservas/1 */
router.delete("/:id", reservaController.eliminarReserva);    /* DELETE /reservas/1 */

module.exports = router;
