/**
 * Almacén en memoria de hoteles: lectura, alta, actualización y baja (CRUD).
 */

const { hotelesIniciales } = require("../data/seed");

/* Array mutable; persiste mientras el servidor esté encendido */
let hoteles = [...hotelesIniciales];
let siguienteId = hoteles.length + 1;

/* Campos que el controlador exige en POST y PUT */
const CAMPOS_REQUERIDOS = [
  "nombre",
  "ubicacion",
  "precio",
  "descripcion",
  "disponibilidad",
];

/** Devuelve todos los hoteles */
function obtenerTodos() {
  return hoteles;
}

/** Busca un hotel por id numérico */
function obtenerPorId(id) {
  return hoteles.find((h) => h.id === id);
}

/** Crea un hotel nuevo con id autoincremental */
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

/** Reemplaza campos del hotel; devuelve null si el id no existe */
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

/** Quita el hotel del array; devuelve null si el id no existe */
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
