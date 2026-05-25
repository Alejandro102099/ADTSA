/**
 * Modelo en memoria para planes turísticos de ADSTA.
 */

const { planesIniciales } = require("../data/seed");

let planes = [...planesIniciales];
let siguienteId = planes.length + 1;

const CAMPOS_REQUERIDOS = [
  "nombre",
  "tipo",
  "precio",
  "duracion",
  "descripcion",
];

function obtenerTodos() {
  return planes;
}

function obtenerPorId(id) {
  return planes.find((p) => p.id === id);
}

function crear(datos) {
  const nuevoPlan = {
    id: siguienteId++,
    nombre: datos.nombre,
    tipo: datos.tipo,
    precio: Number(datos.precio),
    duracion: datos.duracion,
    descripcion: datos.descripcion,
  };
  planes.push(nuevoPlan);
  return nuevoPlan;
}

function actualizar(id, datos) {
  const indice = planes.findIndex((p) => p.id === id);
  if (indice === -1) return null;

  planes[indice] = {
    ...planes[indice],
    nombre: datos.nombre ?? planes[indice].nombre,
    tipo: datos.tipo ?? planes[indice].tipo,
    precio: datos.precio !== undefined ? Number(datos.precio) : planes[indice].precio,
    duracion: datos.duracion ?? planes[indice].duracion,
    descripcion: datos.descripcion ?? planes[indice].descripcion,
  };

  return planes[indice];
}

function eliminar(id) {
  const indice = planes.findIndex((p) => p.id === id);
  if (indice === -1) return null;
  const [eliminado] = planes.splice(indice, 1);
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
