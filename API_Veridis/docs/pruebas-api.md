# Pruebas de la API Véridis

Este documento sirve para probar la API REST del proyecto Véridis durante el desarrollo.

La API está hecha con Spring Boot y JPA. Para las pruebas se puede usar Postman, Bruno, Insomnia o el navegador en los endpoints `GET`.

## 1. Cómo arrancar la API

1. Abrir el proyecto en IntelliJ IDEA.
2. Comprobar que MySQL está arrancado.
3. Comprobar que la base de datos `veridis` existe y tiene las tablas importadas desde `veridis.sql`.
4. Revisar el archivo `src/main/resources/application.properties`.
5. Ejecutar la clase principal:

```text
VeridisApiApplication
```

Si arranca correctamente, en la consola debe aparecer algo parecido a:

```text
Tomcat started on port 8081
Started VeridisApiApplication
```

La URL base de la API es:

```text
http://localhost:8081
```

## 2. Cómo comprobar que funciona

Primero se puede probar este endpoint:

```http
GET http://localhost:8081/api
```

Si responde correctamente, la API está recibiendo peticiones.

## 3. Orden recomendado de pruebas

Este orden ayuda a probar primero las tablas base y después las que dependen de otras:

1. Familias
2. Plantas
3. Síntomas
4. Usuario
5. Localización
6. Ubicación
7. Planta usuario
8. Historial
9. Recordatorio
10. Foto
11. Cuestionario
12. Respuesta
13. Recomendación
14. Login

## 4. Ejemplos de JSON para POST y PUT

### Registro de usuario

```http
POST http://localhost:8081/api/auth/registro
```

```json
{
  "nombre": "Lucia",
  "email": "lucia@test.com",
  "contrasena": "1234"
}
```

### Login

```http
POST http://localhost:8081/api/auth/login
```

```json
{
  "email": "lucia@test.com",
  "contrasena": "1234"
}
```

### Crear usuario

```http
POST http://localhost:8081/api/usuarios
```

```json
{
  "nombre": "Lucia",
  "email": "lucia2@test.com",
  "contrasena": "1234",
  "localizacionDefault": {
    "idLocalizacion": 1
  }
}
```

### Modificar usuario

```http
PUT http://localhost:8081/api/usuarios/1
```

```json
{
  "nombre": "Lucia Garcia",
  "email": "lucia2@test.com",
  "contrasena": "1234",
  "localizacionDefault": {
    "idLocalizacion": 1
  }
}
```

### Crear localización

```http
POST http://localhost:8081/api/localizaciones
```

```json
{
  "pais": "España",
  "provincia": "Madrid",
  "ciudad": "Madrid",
  "latitud": 40.4168,
  "longitud": -3.7038,
  "fechaActualizacion": "2026-05-16T12:00:00"
}
```

### Modificar localización

```http
PUT http://localhost:8081/api/localizaciones/1
```

```json
{
  "pais": "España",
  "provincia": "Madrid",
  "ciudad": "Alcorcón",
  "latitud": 40.3458,
  "longitud": -3.8249,
  "fechaActualizacion": "2026-05-16T12:30:00"
}
```

### Crear ubicación

```http
POST http://localhost:8081/api/ubicaciones
```

```json
{
  "usuario": {
    "idUsuario": 1
  },
  "localizacion": {
    "idLocalizacion": 1
  },
  "nombre": "Salón",
  "descripcion": "Zona luminosa",
  "luz": "luz_indirecta",
  "humedad": "media",
  "esExterior": false
}
```

### Modificar ubicación

```http
PUT http://localhost:8081/api/ubicaciones/1
```

```json
{
  "usuario": {
    "idUsuario": 1
  },
  "localizacion": {
    "idLocalizacion": 1
  },
  "nombre": "Terraza",
  "descripcion": "Zona exterior",
  "luz": "sol_directo",
  "humedad": "baja",
  "esExterior": true
}
```

### Crear planta de usuario

```http
POST http://localhost:8081/api/plantas-usuario
```

```json
{
  "idUsuario": 1,
  "idPlanta": 1,
  "idUbicacion": 1,
  "nombrePersonalizado": "Mi poto",
  "notas": "Comprada en vivero",
  "fechaAdquisicion": "2026-05-16",
  "estadoSalud": "buena"
}
```

### Modificar planta de usuario

```http
PUT http://localhost:8081/api/plantas-usuario/1
```

```json
{
  "idUsuario": 1,
  "idPlanta": 1,
  "idUbicacion": 1,
  "nombrePersonalizado": "Poto salón",
  "notas": "Está creciendo bien",
  "fechaAdquisicion": "2026-05-16",
  "estadoSalud": "buena"
}
```

### Crear historial de cuidado

```http
POST http://localhost:8081/api/historial-cuidados
```

```json
{
  "idUsuarioPlanta": 1,
  "tipoCuidado": "riego",
  "fecha": "2026-05-16T14:30:00",
  "notas": "Riego normal"
}
```

### Crear recordatorio

```http
POST http://localhost:8081/api/recordatorios
```

```json
{
  "idUsuarioPlanta": 1,
  "tipo": "riego",
  "fechaProximo": "2026-05-20",
  "activo": true,
  "notificationId": "riego-1"
}
```

### Crear foto

```http
POST http://localhost:8081/api/fotos
```

```json
{
  "idUsuarioPlanta": 1,
  "urlImagen": "https://ejemplo.com/foto.jpg",
  "fecha": "2026-05-16T15:00:00",
  "descripcion": "Foto inicial"
}
```

### Crear cuestionario

```http
POST http://localhost:8081/api/cuestionarios
```

```json
{
  "idUsuarioPlanta": 1,
  "fecha": "2026-05-16T16:00:00",
  "observacionesUsuario": "La planta tiene hojas amarillas"
}
```

### Crear respuesta de cuestionario

```http
POST http://localhost:8081/api/respuestas-cuestionario
```

```json
{
  "idCuestionario": 1,
  "idSintoma": 1
}
```

### Crear recomendación

```http
POST http://localhost:8081/api/recomendaciones
```

```json
{
  "idSintoma": 1,
  "idPlanta": 1,
  "posibleCausa": "Exceso de riego",
  "recomendacion": "Reducir la frecuencia de riego",
  "observaciones": "Comprobar que la maceta drena bien",
  "prioridad": "media"
}
```

Para crear una recomendación genérica, se puede mandar `idPlanta` como `null`:

```json
{
  "idSintoma": 1,
  "idPlanta": null,
  "posibleCausa": "Riego inadecuado",
  "recomendacion": "Revisar la humedad del sustrato",
  "observaciones": "Recomendación general para el síntoma",
  "prioridad": "media"
}
```

## 5. Ejemplos de errores esperados

### Usuario no encontrado

```http
GET http://localhost:8081/api/usuarios/99999
```

Respuesta esperada:

```json
{
  "mensaje": "Usuario no encontrado",
  "estado": 404,
  "fecha": "2026-05-16T..."
}
```

### Email duplicado

Hacer dos veces el mismo registro:

```http
POST http://localhost:8081/api/auth/registro
```

```json
{
  "nombre": "Lucia",
  "email": "lucia@test.com",
  "contrasena": "1234"
}
```

La segunda vez debe devolver:

```json
{
  "mensaje": "El email ya existe",
  "estado": 409,
  "fecha": "2026-05-16T..."
}
```

### Planta no encontrada

Crear una planta de usuario con un `idPlanta` que no exista:

```http
POST http://localhost:8081/api/plantas-usuario
```

```json
{
  "idUsuario": 1,
  "idPlanta": 99999,
  "idUbicacion": 1,
  "nombrePersonalizado": "Prueba",
  "notas": "Prueba de error",
  "fechaAdquisicion": "2026-05-16",
  "estadoSalud": "buena"
}
```

Respuesta esperada:

```json
{
  "mensaje": "Planta no encontrada",
  "estado": 404,
  "fecha": "2026-05-16T..."
}
```

## 6. Tabla resumen de endpoints

| Parte | Método | Endpoint | Body |
| --- | --- | --- | --- |
| Inicio | GET | `/api` | No |
| Familias | GET | `/api/familias` | No |
| Familias | GET | `/api/familias/{id}` | No |
| Familias | GET | `/api/familias/buscar?texto=arbol` | No |
| Plantas | GET | `/api/plantas` | No |
| Plantas | GET | `/api/plantas/{id}` | No |
| Plantas | GET | `/api/plantas/buscar?texto=poto` | No |
| Plantas | GET | `/api/plantas/tipo/{tipo}` | No |
| Plantas | GET | `/api/plantas/luz/{luz}` | No |
| Plantas | GET | `/api/plantas/familia/{idFamilia}` | No |
| Síntomas | GET | `/api/sintomas` | No |
| Síntomas | GET | `/api/sintomas/{id}` | No |
| Síntomas | GET | `/api/sintomas/buscar?texto=hoja` | No |
| Usuarios | GET | `/api/usuarios` | No |
| Usuarios | GET | `/api/usuarios/{id}` | No |
| Usuarios | POST | `/api/usuarios` | Sí |
| Usuarios | PUT | `/api/usuarios/{id}` | Sí |
| Usuarios | DELETE | `/api/usuarios/{id}` | No |
| Configuración | GET | `/api/usuarios/{idUsuario}/config` | No |
| Configuración | PUT | `/api/usuarios/{idUsuario}/config` | Sí |
| Localizaciones | GET | `/api/localizaciones` | No |
| Localizaciones | GET | `/api/localizaciones/{id}` | No |
| Localizaciones | POST | `/api/localizaciones` | Sí |
| Localizaciones | PUT | `/api/localizaciones/{id}` | Sí |
| Localizaciones | DELETE | `/api/localizaciones/{id}` | No |
| Ubicaciones | GET | `/api/ubicaciones` | No |
| Ubicaciones | GET | `/api/ubicaciones/{id}` | No |
| Ubicaciones | GET | `/api/usuarios/{idUsuario}/ubicaciones` | No |
| Ubicaciones | POST | `/api/ubicaciones` | Sí |
| Ubicaciones | PUT | `/api/ubicaciones/{id}` | Sí |
| Ubicaciones | DELETE | `/api/ubicaciones/{id}` | No |
| Plantas de usuario | GET | `/api/plantas-usuario` | No |
| Plantas de usuario | GET | `/api/plantas-usuario/{id}` | No |
| Plantas de usuario | GET | `/api/usuarios/{idUsuario}/plantas` | No |
| Plantas de usuario | GET | `/api/ubicaciones/{idUbicacion}/plantas` | No |
| Plantas de usuario | POST | `/api/plantas-usuario` | Sí |
| Plantas de usuario | PUT | `/api/plantas-usuario/{id}` | Sí |
| Plantas de usuario | DELETE | `/api/plantas-usuario/{id}` | No |
| Historial | GET | `/api/historial-cuidados` | No |
| Historial | GET | `/api/historial-cuidados/{id}` | No |
| Historial | GET | `/api/plantas-usuario/{idPlantaUsuario}/historial` | No |
| Historial | POST | `/api/historial-cuidados` | Sí |
| Historial | PUT | `/api/historial-cuidados/{id}` | Sí |
| Historial | DELETE | `/api/historial-cuidados/{id}` | No |
| Recordatorios | GET | `/api/recordatorios` | No |
| Recordatorios | GET | `/api/recordatorios/activos` | No |
| Recordatorios | GET | `/api/recordatorios/{id}` | No |
| Recordatorios | GET | `/api/plantas-usuario/{idPlantaUsuario}/recordatorios` | No |
| Recordatorios | POST | `/api/recordatorios` | Sí |
| Recordatorios | PUT | `/api/recordatorios/{id}` | Sí |
| Recordatorios | DELETE | `/api/recordatorios/{id}` | No |
| Fotos | GET | `/api/fotos` | No |
| Fotos | GET | `/api/fotos/{id}` | No |
| Fotos | GET | `/api/plantas-usuario/{idPlantaUsuario}/fotos` | No |
| Fotos | POST | `/api/fotos` | Sí |
| Fotos | PUT | `/api/fotos/{id}` | Sí |
| Fotos | DELETE | `/api/fotos/{id}` | No |
| Cuestionarios | GET | `/api/cuestionarios` | No |
| Cuestionarios | GET | `/api/cuestionarios/{id}` | No |
| Cuestionarios | GET | `/api/plantas-usuario/{idPlantaUsuario}/cuestionarios` | No |
| Cuestionarios | POST | `/api/cuestionarios` | Sí |
| Cuestionarios | DELETE | `/api/cuestionarios/{id}` | No |
| Respuestas | GET | `/api/respuestas-cuestionario` | No |
| Respuestas | GET | `/api/respuestas-cuestionario/{id}` | No |
| Respuestas | GET | `/api/cuestionarios/{idCuestionario}/respuestas` | No |
| Respuestas | POST | `/api/respuestas-cuestionario` | Sí |
| Respuestas | DELETE | `/api/respuestas-cuestionario/{id}` | No |
| Recomendaciones | GET | `/api/recomendaciones` | No |
| Recomendaciones | GET | `/api/recomendaciones/{id}` | No |
| Recomendaciones | GET | `/api/sintomas/{idSintoma}/recomendaciones` | No |
| Recomendaciones | GET | `/api/plantas/{idPlanta}/recomendaciones` | No |
| Recomendaciones | GET | `/api/recomendaciones/buscar?idSintoma=1&idPlanta=2` | No |
| Recomendaciones | POST | `/api/recomendaciones` | Sí |
| Recomendaciones | PUT | `/api/recomendaciones/{id}` | Sí |
| Recomendaciones | DELETE | `/api/recomendaciones/{id}` | No |
| Auth | POST | `/api/auth/registro` | Sí |
| Auth | POST | `/api/auth/login` | Sí |

