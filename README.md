# ADSTA API — Turismo en San Agustín

API REST para **ADSTA**, plataforma turística orientada a modernizar el turismo en **San Agustín (Huila, Colombia)**. Centraliza reservas de hoteles, planes turísticos y, en futuras versiones, geolocalización, chatbots, reportes y pagos electrónicos.

## Tecnologías utilizadas

- Node.js
- Express.js
- Nodemom
- JavaScript
- REST API
- JSON

## Estructura de carpetas

```
adsta-api/
├── package.json
├── README.md
├── .gitignore
└── src/
    ├── server.js              # Punto de entrada (puerto 3000)
    ├── app.js                 # Configuración Express
    ├── data/
    │   └── seed.js            # Datos precargados en memoria
    ├── models/
    │   ├── hotelModel.js
    │   ├── planModel.js
    │   └── reservaModel.js
    ├── controllers/
    │   ├── hotelController.js
    │   ├── planController.js
    │   └── reservaController.js
    ├── routes/
    │   ├── hotelRoutes.js
    │   ├── planRoutes.js
    │   └── reservaRoutes.js
    └── middleware/
        ├── errorHandler.js
        └── validate.js
```

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm (incluido con Node.js)

## Cómo ejecutar el proyecto (paso a paso)

### 1. Abrir la terminal en la carpeta del proyecto

```bash
cd "c:\adtsa turismo"
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar en modo desarrollo (con nodemon)

```bash
npm run dev
```

### 4. Verificar que el servidor está activo

Abre en el navegador o con curl:

```
http://localhost:3000
```

Deberías ver un JSON de bienvenida con los endpoints disponibles.

### 5. Probar los endpoints

Usa Postman, Insomnia, Thunder Client o `curl` para probar las rutas descritas abajo.

**Modo producción (sin nodemon):**

```bash
npm start
```

---

## Endpoints

| Módulo   | Método | Ruta              | Descripción              |
|----------|--------|-------------------|--------------------------|
| Hoteles  | GET    | `/hoteles`        | Listar todos             |
| Hoteles  | GET    | `/hoteles/:id`    | Obtener uno              |
| Hoteles  | POST   | `/hoteles`        | Crear                    |
| Hoteles  | PUT    | `/hoteles/:id`    | Actualizar               |
| Hoteles  | DELETE | `/hoteles/:id`    | Eliminar                 |
| Planes   | GET    | `/planes`         | Listar todos             |
| Planes   | GET    | `/planes/:id`     | Obtener uno              |
| Planes   | POST   | `/planes`         | Crear                    |
| Planes   | PUT    | `/planes/:id`     | Actualizar               |
| Planes   | DELETE | `/planes/:id`     | Eliminar                 |
| Reservas | GET    | `/reservas`       | Listar todas             |
| Reservas | GET    | `/reservas/:id`   | Obtener una              |
| Reservas | POST   | `/reservas`       | Crear                    |
| Reservas | PUT    | `/reservas/:id`   | Actualizar               |
| Reservas | DELETE | `/reservas/:id`   | Eliminar                 |

## Códigos HTTP utilizados

| Código | Significado              | Cuándo se usa                          |
|--------|--------------------------|----------------------------------------|
| 200    | OK                       | Consultas y actualizaciones exitosas  |
| 201    | Created                  | Recurso creado correctamente           |
| 400    | Bad Request              | Datos incompletos o id inválido        |
| 404    | Not Found                | Recurso o ruta no encontrada           |
| 500    | Internal Server Error    | Error inesperado del servidor          |

---

## Ejemplos de respuestas JSON

### GET /hoteles — 200 OK

```json
{
  "success": true,
  "cantidad": 3,
  "data": [
    {
      "id": 1,
      "nombre": "Hotel El Dorado San Agustín",
      "ubicacion": "Km 3 vía San Agustín - Isnos, San Agustín, Huila",
      "precio": 180000,
      "descripcion": "Hotel campestre con vista a la cordillera...",
      "disponibilidad": true
    }
  ]
}
```

### GET /hoteles/1 — 200 OK

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Hotel El Dorado San Agustín",
    "ubicacion": "Km 3 vía San Agustín - Isnos, San Agustín, Huila",
    "precio": 180000,
    "descripcion": "Hotel campestre con vista a la cordillera...",
    "disponibilidad": true
  }
}
```

### POST /hoteles — 201 Created

**Cuerpo de la petición:**

```json
{
  "nombre": "Hotel Nuevo",
  "ubicacion": "Centro, San Agustín",
  "precio": 120000,
  "descripcion": "Hotel boutique en el pueblo",
  "disponibilidad": true
}
```

**Respuesta:**

```json
{
  "success": true,
  "mensaje": "Hotel creado exitosamente",
  "data": {
    "id": 4,
    "nombre": "Hotel Nuevo",
    "ubicacion": "Centro, San Agustín",
    "precio": 120000,
    "descripcion": "Hotel boutique en el pueblo",
    "disponibilidad": true
  }
}
```

### GET /planes — 200 OK

```json
{
  "success": true,
  "cantidad": 3,
  "data": [
    {
      "id": 1,
      "nombre": "Parque Arqueológico de San Agustín",
      "tipo": "Cultural",
      "precio": 45000,
      "duracion": "1 día",
      "descripcion": "Recorrido guiado por las estatuas..."
    }
  ]
}
```

### POST /reservas — 201 Created

**Cuerpo (reserva de hotel):**

```json
{
  "nombreCliente": "Juan Pérez",
  "tipoReserva": "hotel",
  "reservadoId": 2,
  "fecha": "2026-09-01",
  "cantidadPersonas": 2
}
```

**Respuesta:**

```json
{
  "success": true,
  "mensaje": "Reserva creada exitosamente",
  "data": {
    "id": 4,
    "nombreCliente": "Juan Pérez",
    "tipoReserva": "hotel",
    "reservadoId": 2,
    "reservadoNombre": "Finca Turística La Chaquira",
    "fecha": "2026-09-01",
    "cantidadPersonas": 2
  }
}
```

**Cuerpo (reserva de plan):**

```json
{
  "nombreCliente": "Laura Méndez",
  "tipoReserva": "plan",
  "reservadoId": 3,
  "fecha": "2026-10-15",
  "cantidadPersonas": 5
}
```

### GET /hoteles/999 — 404 Not Found

```json
{
  "success": false,
  "mensaje": "Hotel con id 999 no encontrado"
}
```

### POST /hoteles (datos incompletos) — 400 Bad Request

```json
{
  "success": false,
  "mensaje": "Campos obligatorios faltantes o vacíos: nombre, precio"
}
```

### Ruta inexistente — 404 Not Found

```json
{
  "success": false,
  "mensaje": "Ruta no encontrada: GET /api/v1/test"
}
```

---

## Validaciones

- No se permiten registros con campos obligatorios vacíos o ausentes.
- En reservas, `tipoReserva` debe ser `"hotel"` o `"plan"`.
- `reservadoId` debe corresponder a un hotel o plan existente.
- Los ids en la URL deben ser números válidos.

## Datos precargados

Cada módulo incluye **3 registros** de ejemplo en `src/data/seed.js`, con contexto real de San Agustín (hoteles, parque arqueológico, cascadas, etc.).

## Próximas funcionalidades (roadmap ADSTA)

- Geolocalización de sitios turísticos
- Integración con chatbots
- Reportes turísticos
- Pagos electrónicos
- Persistencia en base de datos (MongoDB o PostgreSQL)

## Licencia

MIT
## Autor
proyecto desarrollado por Luis Alejandro Anacona 