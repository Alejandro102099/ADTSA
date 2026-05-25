/**
 * Modelo en memoria para hoteles de ADSTA.
 */

const { hotelesIniciales } = require("../data/seed");

let hoteles = [...hotelesIniciales];
let siguienteId = hoteles.length + 1;

const CAMPOS_REQUERIDOS = [
  "nombre",
  "ubicacion",
  "precio",
  "descripcion",
  "disponibilidad",
];

function obtenerTodos() {
  return hoteles;
}

function obtenerPorId(id) {
  return hoteles.find((h) => h.id === id);
}

function crear(datos) {
  const nuevoHotel = {
    id: siguienteId++,
    nombre: datos.nombre,
    ubicacion: datos.ubicacion,
    precio: Number(datos.precio),
    descripcion: datos.descripcion,
    disponibilidad: Boolean(datos.disponibilidad),
  };
  hoteles.push(nuevoHotel);
  return nuevoHotel;
}

function actualizar(id, datos) {
  const indice = hoteles.findIndex((h) => h.id === id);
  if (indice === -1) return null;

  hoteles[indice] = {
    ...hoteles[indice],
    nombre: datos.nombre ?? hoteles[indice].nombre,
    ubicacion: datos.ubicacion ?? hoteles[indice].ubicacion,
    precio: datos.precio !== undefined ? Number(datos.precio) : hoteles[indice].precio,
    descripcion: datos.descripcion ?? hoteles[indice].descripcion,
    disponibilidad:
      datos.disponibilidad !== undefined
        ? Boolean(datos.disponibilidad)
        : hoteles[indice].disponibilidad,
  };

  return hoteles[indice];
}

function eliminar(id) {
  const indice = hoteles.findIndex((h) => h.id === id);
  if (indice === -1) return null;
  const [eliminado] = hoteles.splice(indice, 1);
  return eliminado;
}

module.exports = {
  CAMPOS_REQUERIDOS,
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};
