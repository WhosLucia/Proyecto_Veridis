# Resumen tecnico de la base de datos Veridis

Analisis preparado a partir del archivo `V__ridis.xml`.

La base de datos tiene 14 tablas:

- `CONFIG_USUARIO`
- `CUESTIONARIO`
- `FAMILIA_PLANTA`
- `FOTO_PLANTA`
- `HISTORIAL_CUIDADO`
- `LOCALIZACION`
- `PLANTA`
- `PLANTA_USUARIO`
- `RECOMENDACION_SINTOMA`
- `RECORDATORIO`
- `RESPUESTA_CUESTIONARIO`
- `SINTOMA`
- `UBICACION`
- `USUARIO`

## Tablas y entidades propuestas

| Tabla | Entidad Java propuesta |
| --- | --- |
| `CONFIG_USUARIO` | `ConfigUsuario` |
| `CUESTIONARIO` | `Cuestionario` |
| `FAMILIA_PLANTA` | `FamiliaPlanta` |
| `FOTO_PLANTA` | `FotoPlanta` |
| `HISTORIAL_CUIDADO` | `HistorialCuidado` |
| `LOCALIZACION` | `Localizacion` |
| `PLANTA` | `Planta` |
| `PLANTA_USUARIO` | `PlantaUsuario` |
| `RECOMENDACION_SINTOMA` | `RecomendacionSintoma` |
| `RECORDATORIO` | `Recordatorio` |
| `RESPUESTA_CUESTIONARIO` | `RespuestaCuestionario` |
| `SINTOMA` | `Sintoma` |
| `UBICACION` | `Ubicacion` |
| `USUARIO` | `Usuario` |

## Datos base

Estas tablas contienen informacion general de la aplicacion:

- `FAMILIA_PLANTA`
- `PLANTA`
- `SINTOMA`

## Datos propios del usuario

Estas tablas guardan informacion relacionada con cada usuario:

- `USUARIO`
- `CONFIG_USUARIO`
- `UBICACION`
- `PLANTA_USUARIO`
- `FOTO_PLANTA`
- `HISTORIAL_CUIDADO`
- `RECORDATORIO`
- `CUESTIONARIO`
- `RESPUESTA_CUESTIONARIO`

Ademas, el XML incluye `LOCALIZACION`, que se usa desde `USUARIO` y `UBICACION`.

## Recomendaciones

Esta tabla contiene recomendaciones asociadas a sintomas:

- `RECOMENDACION_SINTOMA`

## Detalle por tabla

### `CONFIG_USUARIO`

- Clave primaria: `id_configuracion`.
- Columnas principales: `id_usuario`, `tema`, `idioma`, `notificaciones`.
- Claves foraneas:
  - `id_usuario` referencia a `USUARIO(id_usuario)`.
- Relaciones:
  - Muchas configuraciones no deberian apuntar al mismo usuario porque `id_usuario` tiene clave unica.
  - En JPA se puede representar como `@OneToOne` desde `ConfigUsuario` hacia `Usuario`.
  - En `Usuario` se puede usar `@OneToOne` hacia `ConfigUsuario` si hace falta navegar en los dos sentidos.

### `CUESTIONARIO`

- Clave primaria: `id_cuestionario`.
- Columnas principales: `id_usuario_planta`, `fecha`, `observaciones_usuario`.
- Claves foraneas:
  - `id_usuario_planta` referencia a `PLANTA_USUARIO(id_usuario_planta)`.
- Relaciones:
  - Muchos cuestionarios pueden pertenecer a una planta de usuario.
  - En JPA: `@ManyToOne` desde `Cuestionario` hacia `PlantaUsuario`.
  - En `PlantaUsuario` se puede usar `@OneToMany` hacia `Cuestionario`.

### `FAMILIA_PLANTA`

- Clave primaria: `id_familia`.
- Columnas principales: `nombre`, `descripcion`.
- Claves foraneas: no tiene.
- Relaciones:
  - Una familia puede tener muchas plantas.
  - En JPA: `@OneToMany` desde `FamiliaPlanta` hacia `Planta`.
  - En `Planta` se usa `@ManyToOne` hacia `FamiliaPlanta`.

### `FOTO_PLANTA`

- Clave primaria: `id_foto`.
- Columnas principales: `id_usuario_planta`, `url_imagen`, `descripcion`, `fecha`.
- Claves foraneas:
  - `id_usuario_planta` referencia a `PLANTA_USUARIO(id_usuario_planta)`.
- Relaciones:
  - Muchas fotos pueden pertenecer a una planta de usuario.
  - En JPA: `@ManyToOne` desde `FotoPlanta` hacia `PlantaUsuario`.
  - En `PlantaUsuario` se puede usar `@OneToMany` hacia `FotoPlanta`.

### `HISTORIAL_CUIDADO`

- Clave primaria: `id_historial`.
- Columnas principales: `id_usuario_planta`, `tipo_cuidado`, `fecha`, `notas`.
- Claves foraneas:
  - `id_usuario_planta` referencia a `PLANTA_USUARIO(id_usuario_planta)`.
- Relaciones:
  - Muchos registros de historial pueden pertenecer a una planta de usuario.
  - En JPA: `@ManyToOne` desde `HistorialCuidado` hacia `PlantaUsuario`.
  - En `PlantaUsuario` se puede usar `@OneToMany` hacia `HistorialCuidado`.

### `LOCALIZACION`

- Clave primaria: `id_localizacion`.
- Columnas principales: `ciudad`, `provincia`, `pais`, `latitud`, `longitud`, `fecha_actualizacion`.
- Claves foraneas: no tiene.
- Relaciones:
  - Una localizacion puede ser usada por varios usuarios como localizacion por defecto.
  - Una localizacion puede ser usada por varias ubicaciones.
  - En JPA se puede usar `@OneToMany` desde `Localizacion` hacia `Usuario`.
  - En JPA se puede usar `@OneToMany` desde `Localizacion` hacia `Ubicacion`.
  - En `Usuario` y `Ubicacion` se usa `@ManyToOne` hacia `Localizacion`.

### `PLANTA`

- Clave primaria: `id_planta`.
- Columnas principales: `id_familia`, `nombre_comun`, `nombre_cientifico`, `tipo`, `descripcion`, `url_img_default`, `apta_exterior_temp`, `luz_recomendada`, `humedad_recomendada`, `temp_minima`, `temp_maxima`, `tolerancia_sol`, `frecuencia_riego`, `frecuencia_abono`.
- Claves foraneas:
  - `id_familia` referencia a `FAMILIA_PLANTA(id_familia)`.
- Relaciones:
  - Muchas plantas pueden pertenecer a una familia.
  - Una planta puede aparecer en muchas plantas de usuario.
  - Una planta puede tener muchas recomendaciones especificas.
  - En JPA: `@ManyToOne` desde `Planta` hacia `FamiliaPlanta`.
  - En JPA: `@OneToMany` desde `Planta` hacia `PlantaUsuario`.
  - En JPA: `@OneToMany` desde `Planta` hacia `RecomendacionSintoma`.

### `PLANTA_USUARIO`

- Clave primaria: `id_usuario_planta`.
- Columnas principales: `id_usuario`, `id_planta`, `id_ubicacion`, `nombre_personalizado`, `notas`, `fecha_adquisicion`, `estado_salud`.
- Claves foraneas:
  - `id_usuario` referencia a `USUARIO(id_usuario)`.
  - `id_planta` referencia a `PLANTA(id_planta)`.
  - `id_ubicacion` referencia a `UBICACION(id_ubicacion)`.
- Relaciones:
  - Muchas plantas de usuario pertenecen a un usuario.
  - Muchas plantas de usuario pueden referirse a la misma planta base.
  - Muchas plantas de usuario pueden estar en la misma ubicacion.
  - Una planta de usuario puede tener muchas fotos, registros de historial, recordatorios y cuestionarios.
  - En JPA: `@ManyToOne` hacia `Usuario`.
  - En JPA: `@ManyToOne` hacia `Planta`.
  - En JPA: `@ManyToOne` hacia `Ubicacion`.
  - En JPA: `@OneToMany` hacia `FotoPlanta`.
  - En JPA: `@OneToMany` hacia `HistorialCuidado`.
  - En JPA: `@OneToMany` hacia `Recordatorio`.
  - En JPA: `@OneToMany` hacia `Cuestionario`.

### `RECOMENDACION_SINTOMA`

- Clave primaria: `id_recomendacion`.
- Columnas principales: `id_sintoma`, `id_planta`, `posible_causa`, `recomendacion`, `observaciones`, `prioridad`.
- Claves foraneas:
  - `id_sintoma` referencia a `SINTOMA(id_sintoma)`.
  - `id_planta` referencia a `PLANTA(id_planta)`.
- Relaciones:
  - Muchas recomendaciones pueden pertenecer a un sintoma.
  - Muchas recomendaciones pueden pertenecer a una planta.
  - `id_planta` permite `NULL`, asi que puede haber recomendaciones generales.
  - En JPA: `@ManyToOne` desde `RecomendacionSintoma` hacia `Sintoma`.
  - En JPA: `@ManyToOne` desde `RecomendacionSintoma` hacia `Planta`.
  - En `Sintoma` se puede usar `@OneToMany` hacia `RecomendacionSintoma`.
  - En `Planta` se puede usar `@OneToMany` hacia `RecomendacionSintoma`.

### `RECORDATORIO`

- Clave primaria: `id_recordatorio`.
- Columnas principales: `id_usuario_planta`, `tipo`, `frecuencia`, `activo`, `fecha_proximo`, `notification_id`.
- Claves foraneas:
  - `id_usuario_planta` referencia a `PLANTA_USUARIO(id_usuario_planta)`.
- Relaciones:
  - Muchos recordatorios pueden pertenecer a una planta de usuario.
  - En JPA: `@ManyToOne` desde `Recordatorio` hacia `PlantaUsuario`.
  - En `PlantaUsuario` se puede usar `@OneToMany` hacia `Recordatorio`.

### `RESPUESTA_CUESTIONARIO`

- Clave primaria: `id_respuesta`.
- Columnas principales: `id_cuestionario`, `id_sintoma`.
- Claves foraneas:
  - `id_cuestionario` referencia a `CUESTIONARIO(id_cuestionario)`.
  - `id_sintoma` referencia a `SINTOMA(id_sintoma)`.
- Relaciones:
  - Muchas respuestas pueden pertenecer a un cuestionario.
  - Muchas respuestas pueden apuntar al mismo sintoma.
  - `id_sintoma` permite `NULL`.
  - En JPA: `@ManyToOne` desde `RespuestaCuestionario` hacia `Cuestionario`.
  - En JPA: `@ManyToOne` desde `RespuestaCuestionario` hacia `Sintoma`.
  - En `Cuestionario` se puede usar `@OneToMany` hacia `RespuestaCuestionario`.
  - En `Sintoma` se puede usar `@OneToMany` hacia `RespuestaCuestionario`.

### `SINTOMA`

- Clave primaria: `id_sintoma`.
- Columnas principales: `nombre`, `descripcion`.
- Claves foraneas: no tiene.
- Relaciones:
  - Un sintoma puede tener muchas recomendaciones.
  - Un sintoma puede aparecer en muchas respuestas de cuestionario.
  - En JPA: `@OneToMany` hacia `RecomendacionSintoma`.
  - En JPA: `@OneToMany` hacia `RespuestaCuestionario`.

### `UBICACION`

- Clave primaria: `id_ubicacion`.
- Columnas principales: `id_usuario`, `id_localizacion`, `nombre`, `descripcion`, `luz`, `humedad`, `es_exterior`.
- Claves foraneas:
  - `id_usuario` referencia a `USUARIO(id_usuario)`.
  - `id_localizacion` referencia a `LOCALIZACION(id_localizacion)`.
- Relaciones:
  - Muchas ubicaciones pertenecen a un usuario.
  - Muchas ubicaciones pueden usar una localizacion.
  - Una ubicacion puede tener muchas plantas de usuario.
  - En JPA: `@ManyToOne` desde `Ubicacion` hacia `Usuario`.
  - En JPA: `@ManyToOne` desde `Ubicacion` hacia `Localizacion`.
  - En JPA: `@OneToMany` desde `Ubicacion` hacia `PlantaUsuario`.

### `USUARIO`

- Clave primaria: `id_usuario`.
- Columnas principales: `nombre`, `email`, `contrasena`, `fecha_registro`, `id_localizacion_default`.
- Claves foraneas:
  - `id_localizacion_default` referencia a `LOCALIZACION(id_localizacion)`.
- Relaciones:
  - Un usuario puede tener una configuracion.
  - Un usuario puede tener muchas ubicaciones.
  - Un usuario puede tener muchas plantas de usuario.
  - Muchos usuarios pueden compartir la misma localizacion por defecto.
  - En JPA: `@ManyToOne` desde `Usuario` hacia `Localizacion`.
  - En JPA: `@OneToOne` desde `Usuario` hacia `ConfigUsuario`.
  - En JPA: `@OneToMany` desde `Usuario` hacia `Ubicacion`.
  - En JPA: `@OneToMany` desde `Usuario` hacia `PlantaUsuario`.

## Resumen de relaciones JPA

### Relaciones `@ManyToOne`

- `ConfigUsuario` -> `Usuario` si se modela solo desde la tabla que tiene la clave foranea. Como `id_usuario` es unico, tambien puede modelarse como `@OneToOne`.
- `Cuestionario` -> `PlantaUsuario`.
- `FotoPlanta` -> `PlantaUsuario`.
- `HistorialCuidado` -> `PlantaUsuario`.
- `Planta` -> `FamiliaPlanta`.
- `PlantaUsuario` -> `Usuario`.
- `PlantaUsuario` -> `Planta`.
- `PlantaUsuario` -> `Ubicacion`.
- `RecomendacionSintoma` -> `Sintoma`.
- `RecomendacionSintoma` -> `Planta`.
- `Recordatorio` -> `PlantaUsuario`.
- `RespuestaCuestionario` -> `Cuestionario`.
- `RespuestaCuestionario` -> `Sintoma`.
- `Ubicacion` -> `Usuario`.
- `Ubicacion` -> `Localizacion`.
- `Usuario` -> `Localizacion`.

### Relaciones `@OneToMany`

- `FamiliaPlanta` -> lista de `Planta`.
- `Localizacion` -> lista de `Usuario`.
- `Localizacion` -> lista de `Ubicacion`.
- `Planta` -> lista de `PlantaUsuario`.
- `Planta` -> lista de `RecomendacionSintoma`.
- `PlantaUsuario` -> lista de `FotoPlanta`.
- `PlantaUsuario` -> lista de `HistorialCuidado`.
- `PlantaUsuario` -> lista de `Recordatorio`.
- `PlantaUsuario` -> lista de `Cuestionario`.
- `Sintoma` -> lista de `RecomendacionSintoma`.
- `Sintoma` -> lista de `RespuestaCuestionario`.
- `Ubicacion` -> lista de `PlantaUsuario`.
- `Usuario` -> lista de `Ubicacion`.
- `Usuario` -> lista de `PlantaUsuario`.
- `Cuestionario` -> lista de `RespuestaCuestionario`.

### Relaciones `@OneToOne`

- `Usuario` <-> `ConfigUsuario`, porque `CONFIG_USUARIO.id_usuario` tiene una clave unica.

## Tipos Java recomendados

- Ids `int unsigned`: `Long`.
- Campos `date`: `LocalDate`.
- Campos `datetime`: `LocalDateTime`.
- Campos `enum` de MySQL: `String`.
- Campos `tinyint(1)`: `Boolean`.
- Campos `decimal`: `BigDecimal`.
- Textos `varchar` y `text`: `String`.
- Campos `tinyint unsigned` que son numeros, como `frecuencia_riego`, `frecuencia_abono` y `frecuencia`: se pueden usar como `Integer`.

## Observaciones sencillas

- El XML tiene caracteres con codificacion rara en algunos comentarios y textos, por ejemplo `VÃ©ridis` o `DÃ­as`. Conviene revisar la codificacion al importar o guardar archivos.
- La tabla `LOCALIZACION` aparece en el XML, aunque no estaba dentro de la lista inicial de datos base, datos de usuario o recomendaciones. Es necesaria porque la referencian `USUARIO` y `UBICACION`.
- No hay tablas intermedias para relaciones muchos a muchos, asi que no hace falta usar `@ManyToMany`.
- `RECOMENDACION_SINTOMA.id_planta` permite `NULL`, por lo que una recomendacion puede ser general para cualquier planta.
- `RESPUESTA_CUESTIONARIO.id_sintoma` permite `NULL`, por lo que una respuesta puede existir sin sintoma asociado.
- `CONFIG_USUARIO.id_usuario` tiene clave unica, asi que la relacion con `USUARIO` encaja mejor como uno a uno.
- Varias claves foraneas tienen `ON DELETE CASCADE`. En la API conviene borrar con cuidado entidades como `Usuario` o `PlantaUsuario`, porque la base de datos borraria datos relacionados.
