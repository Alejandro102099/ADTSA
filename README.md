# ADTSA — Agencia de Turismo en San Agustín

La plataforma de tecnólogia ADTSA esta pensada, para posicionarse como la solución líder en la gestión y promoción turística
de **San Agustín (Huila, Colombia)**. Nuestro proposito es brindar los mejores alojamientos, buena información turistica con una buena experiencia segura, transparente y enriquecedora, para que se sientan conectados con San Agustín, su alegria y magia de las personas, nuestra cultura ancestral y la riqueza natural de este hermoso pueblo.

A través de esta aplicación, los turistas y usuarios pueden:
* **Gestionar hoteles, planes turísticos y reservas en memoria (sin base de datos por el momento)

El objetivo fundamental de ADTSA es transformar la información en una herramienta de hospitalidad, logrando que cada viajero que llegue al municipio se sienta guiado, seguro y motivado a tener unas vacaciones inolvidables. 

**URL base:** `http://localhost:3000`

---

## Tabla de contenidos

1. [Inicio rápido](#inicio-rápido)
2. [Panel web](#panel-web)
3. [Tecnologías](#tecnologías)
4. [Estructura del proyecto](#estructura-del-proyecto)
5. [API REST](#api-rest)
6. [Modelos de datos](#modelos-de-datos)
7. [Códigos HTTP](#códigos-http)
8. [Ejemplos JSON](#ejemplos-json)
9. [Validaciones](#validaciones)
10. [Roadmap](#roadmap)

---

## Inicio rápido

### Requisitos

- [Node.js](https://nodejs.org/) v18+
- npm

### Instalación y ejecución

```bash
cd "c:\adtsa turismo"
npm install
npm run dev
```

| Comando        | Descripción                          |
|----------------|--------------------------------------|
| `npm run dev`  | Desarrollo con nodemon (recomendado) |
| `npm start`    | Producción sin nodemon               |

### Comprobar que funciona

| Recurso        | URL                              |
|----------------|----------------------------------|
| API (bienvenida) | http://localhost:3000        |
| Panel de hoteles | http://localhost:3000/panel  |
| Listado hoteles  | http://localhost:3000/hoteles |

---

## Panel web

Interfaz visual para gestionar hoteles (listar, crear, editar y eliminar) consumiendo la API con `fetch()`.

- **Archivo:** `index.html`
- **Acceso:** http://localhost:3000/panel (con el servidor en ejecución)

> Si abres `index.html` directamente desde el disco (`file://`), puede fallar por CORS. Usa siempre `/panel`.

---

## Tecnologías

- Node.js · Express.js · JavaScript
- REST API · JSON
- Nodemon (desarrollo)
- HTML/CSS/JS puro (panel web)

---

## Estructura del proyecto

```
adsta-api/
├── index.html          # Panel web de hoteles
├── package.json
├── README.md
├── .gitignore
└── src/
    ├── server.js       # Entrada (puerto 3000)
    ├── app.js          # Express, CORS, rutas
    ├── data/
    │   └── seed.js     # 3 registros por módulo
    ├── models/
    ├── controllers/
    ├── routes/
    └── middleware/
```

**Arquitectura:** `Rutas → Controladores → Modelos` (datos en memoria).

---

## API REST

### Hoteles — `/hoteles`

| Método   | Ruta              | Acción        |
|----------|-------------------|---------------|
| `GET`    | `/hoteles`        | Listar todos  |
| `GET`    | `/hoteles/:id`    | Obtener uno   |
| `POST`   | `/hoteles`        | Crear         |
| `PUT`    | `/hoteles/:id`    | Actualizar    |
| `DELETE` | `/hoteles/:id`    | Eliminar      |

### Planes turísticos — `/planes`

| Método   | Ruta              | Acción        |
|----------|-------------------|---------------|
| `GET`    | `/planes`         | Listar todos  |
| `GET`    | `/planes/:id`     | Obtener uno   |
| `POST`   | `/planes`         | Crear         |
| `PUT`    | `/planes/:id`     | Actualizar    |
| `DELETE` | `/planes/:id`     | Eliminar      |

### Reservas — `/reservas`

| Método   | Ruta               | Acción        |
|----------|--------------------|---------------|
| `GET`    | `/reservas`        | Listar todas  |
| `GET`    | `/reservas/:id`    | Obtener una   |
| `POST`   | `/reservas`        | Crear         |
| `PUT`    | `/reservas/:id`    | Actualizar    |
| `DELETE` | `/reservas/:id`    | Eliminar      |

---

## Modelos de datos

### Hotel

| Campo            | Tipo    |
|------------------|---------|
| `id`             | number  |
| `nombre`         | string  |
| `ubicacion`      | string  |
| `precio`         | number  |
| `descripcion`    | string  |
| `disponibilidad` | boolean |

### Plan turístico

| Campo         | Tipo   |
|---------------|--------|
| `id`          | number |
| `nombre`      | string |
| `tipo`        | string |
| `precio`      | number |
| `duracion`    | string |
| `descripcion` | string |

### Reserva

| Campo              | Tipo   | Notas                          |
|--------------------|--------|--------------------------------|
| `id`               | number |                                |
| `nombreCliente`    | string |                                |
| `tipoReserva`      | string | `"hotel"` o `"plan"`           |
| `reservadoId`      | number | ID del hotel o plan            |
| `reservadoNombre`  | string | Se resuelve automáticamente    |
| `fecha`            | string | Ej. `"2026-09-01"`             |
| `cantidadPersonas` | number |                                |

**Datos de ejemplo:** 3 registros por módulo en `src/data/seed.js` (contexto de San Agustín).

---

## Códigos HTTP

| Código | Uso                                      |
|--------|------------------------------------------|
| `200`  | Consulta, actualización o eliminación OK |
| `201`  | Recurso creado                           |
| `400`  | Datos incompletos o id inválido          |
| `404`  | Recurso o ruta no encontrada             |
| `500`  | Error interno del servidor               |

Todas las respuestas incluyen `success: true | false` y, en errores, `mensaje`.

---

## Ejemplos JSON

### Listar hoteles — `GET /hoteles`

```json
{
  "success": true,
  "cantidad": 3,
  "data": [
    {
      "id": 1,
      "nombre": "Hotel El Dorado San Agustín",
      "ubicacion": "Km 3 vía San Agustín - Isnos, Huila",
      "precio": 180000,
      "descripcion": "Hotel campestre con vista a la cordillera...",
      "disponibilidad": true
    }
  ]
}
```

### Crear hotel — `POST /hoteles`

**Request:**

```json
{
  "nombre": "Hotel Nuevo",
  "ubicacion": "Centro, San Agustín",
  "precio": 120000,
  "descripcion": "Hotel boutique en el pueblo",
  "disponibilidad": true
}
```

**Response `201`:**

```json
{
  "success": true,
  "mensaje": "Hotel creado exitosamente",
  "data": { "id": 4, "nombre": "Hotel Nuevo", "...": "..." }
}
```

### Crear reserva — `POST /reservas`

```json
{
  "nombreCliente": "Juan Pérez",
  "tipoReserva": "hotel",
  "reservadoId": 2,
  "fecha": "2026-09-01",
  "cantidadPersonas": 2
}
```

`tipoReserva` puede ser `"hotel"` o `"plan"`. `reservadoId` debe existir en el módulo correspondiente.

### Errores habituales

**`404` — Recurso no encontrado**

```json
{
  "success": false,
  "mensaje": "Hotel con id 999 no encontrado"
}
```

**`400` — Campos incompletos**

```json
{
  "success": false,
  "mensaje": "Campos obligatorios faltantes o vacíos: nombre, precio"
}
```

---

## Validaciones

- Campos obligatorios no pueden ir vacíos ni ausentes.
- En reservas: `tipoReserva` ∈ `hotel` | `plan`.
- `reservadoId` debe apuntar a un hotel o plan existente.
- Los `:id` en la URL deben ser números válidos.

---

## Roadmap

- Geolocalización de sitios turísticos
- Chatbots y reportes turísticos
- Pagos electrónicos
- Base de datos (MongoDB o PostgreSQL)

---

## Licencia

MIT

## Autor

Proyecto desarrollado por **Luis Alejandro Anacona**.
