/**
 * Enrutador de hoteles: asocia cada método HTTP con una función del controlador.
 */

const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

router.get("/", hotelController.obtenerHoteles);           /* GET /hoteles */
router.get("/:id", hotelController.obtenerHotelPorId);     /* GET /hoteles/1 */
router.post("/", hotelController.crearHotel);              /* POST /hoteles */
router.put("/:id", hotelController.actualizarHotel);       /* PUT /hoteles/1 */
router.delete("/:id", hotelController.eliminarHotel);     /* DELETE /hoteles/1 */

module.exports = router;
