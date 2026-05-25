/**
 * Rutas REST para el módulo de hoteles.
 */

const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

router.get("/", hotelController.obtenerHoteles);
router.get("/:id", hotelController.obtenerHotelPorId);
router.post("/", hotelController.crearHotel);
router.put("/:id", hotelController.actualizarHotel);
router.delete("/:id", hotelController.eliminarHotel);

module.exports = router;
