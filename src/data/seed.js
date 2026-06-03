/**
 * Datos de ejemplo que cargan los modelos al iniciar el servidor (sin base de datos).
 */

/* Tres hoteles ficticios de San Agustín para probar GET /hoteles */
const hotelesIniciales = [
  {
    id: 1,
    nombre: "Hotel El Dorado San Agustín",
    ubicacion: "Km 3 vía San Agustín - Isnos, San Agustín, Huila",
    precio: 180000,
    descripcion:
      "Hotel campestre con vista a la cordillera, desayuno incluido y acceso a tours arqueológicos.",
    disponibilidad: true,
  },
  {
    id: 2,
    nombre: "Finca Turística La Chaquira",
    ubicacion: "Vereda Alto de los Ídolos, San Agustín, Huila",
    precio: 95000,
    descripcion:
      "Alojamiento rústico rodeado de naturaleza, ideal para viajeros que buscan tranquilidad.",
    disponibilidad: true,
  },
  {
    id: 3,
    nombre: "Hostal Macondo",
    ubicacion: "Calle 5 #12-34, Centro, San Agustín, Huila",
    precio: 65000,
    descripcion:
      "Hostal económico en el centro del pueblo, cerca de restaurantes y agencias de turismo.",
    disponibilidad: false,
  },
];

/* Tres planes turísticos para probar GET /planes */
const planesIniciales = [
  {
    id: 1,
    nombre: "Parque Arqueológico de San Agustín",
    tipo: "Cultural",
    precio: 45000,
    duracion: "1 día",
    descripcion:
      "Recorrido guiado por las estatuas y tumbas precolombinas del parque principal.",
  },
  {
    id: 2,
    nombre: "Cascada del Mortiño y Alto de los Ídolos",
    tipo: "Aventura",
    precio: 120000,
    duracion: "1 día",
    descripcion:
      "Caminata por senderos naturales con visita a cascadas y sitios arqueológicos secundarios.",
  },
  {
    id: 3,
    nombre: "Estrecho del Magdalena y Puracé",
    tipo: "Naturaleza",
    precio: 250000,
    duracion: "2 días",
    descripcion:
      "Tour de dos días que incluye el Estrecho del Magdalena y avistamiento de cóndores.",
  },
];

/* Tres reservas de ejemplo (hotel o plan) para probar GET /reservas */
const reservasIniciales = [
  {
    id: 1,
    nombreCliente: "María González",
    tipoReserva: "hotel",
    reservadoId: 1,
    reservadoNombre: "Hotel El Dorado San Agustín",
    fecha: "2026-06-15",
    cantidadPersonas: 2,
  },
  {
    id: 2,
    nombreCliente: "Carlos Ramírez",
    tipoReserva: "plan",
    reservadoId: 1,
    reservadoNombre: "Parque Arqueológico de San Agustín",
    fecha: "2026-07-20",
    cantidadPersonas: 4,
  },
  {
    id: 3,
    nombreCliente: "Ana Lucía Pérez",
    tipoReserva: "plan",
    reservadoId: 2,
    reservadoNombre: "Cascada del Mortiño y Alto de los Ídolos",
    fecha: "2026-08-10",
    cantidadPersonas: 3,
  },
];

module.exports = {
  hotelesIniciales,
  planesIniciales,
  reservasIniciales,
};
