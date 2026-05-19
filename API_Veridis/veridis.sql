-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql
-- Tiempo de generación: 16-05-2026 a las 11:17:01
-- Versión del servidor: 8.0.46
-- Versión de PHP: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `veridis`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CONFIG_USUARIO`
--

CREATE TABLE `CONFIG_USUARIO` (
  `id_configuracion` int UNSIGNED NOT NULL,
  `id_usuario` int UNSIGNED NOT NULL,
  `tema` enum('claro','oscuro','sistema') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sistema',
  `idioma` enum('es','en','fr','de','pt','it','ca') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'es',
  `notificaciones` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CUESTIONARIO`
--

CREATE TABLE `CUESTIONARIO` (
  `id_cuestionario` int UNSIGNED NOT NULL,
  `id_usuario_planta` int UNSIGNED NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `observaciones_usuario` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `FAMILIA_PLANTA`
--

CREATE TABLE `FAMILIA_PLANTA` (
  `id_familia` int UNSIGNED NOT NULL,
  `nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `FAMILIA_PLANTA`
--

INSERT INTO `FAMILIA_PLANTA` (`id_familia`, `nombre`, `descripcion`) VALUES
(1, 'Araceae', 'Familia muy común en interior, con especies ornamentales de follaje como Monstera, Epipremnum y Spathiphyllum.'),
(2, 'Asparagaceae', 'Familia frecuente en hogares y terrazas, con plantas como Dracaena, Chlorophytum y otras ornamentales resistentes.'),
(3, 'Moraceae', 'Familia que incluye ficus y otras especies ornamentales de interior y exterior muy usadas en viviendas.'),
(4, 'Orchidaceae', 'Familia de orquídeas, muy popular como planta de interior por su valor ornamental.'),
(5, 'Polypodiaceae', 'Familia de helechos en la que se encuadran especies de interior como Nephrolepis.'),
(6, 'Arecaceae', 'Familia de palmeras ornamentales de interior y exterior, habituales en casas, patios y terrazas.'),
(7, 'Euphorbiaceae', 'Familia diversa con especies ornamentales como Euphorbia pulcherrima y Croton.'),
(8, 'Marantaceae', 'Familia de plantas de interior apreciadas por sus hojas decorativas, como Maranta y Calathea.'),
(9, 'Piperaceae', 'Familia de plantas compactas de interior como Peperomia, muy útiles en espacios pequeños.'),
(10, 'Urticaceae', 'Familia que incluye ornamentales de interior como Pilea peperomioides.'),
(11, 'Begoniaceae', 'Familia de begonias, frecuente en interiores luminosos, patios y balcones.'),
(12, 'Bromeliaceae', 'Familia de bromelias ornamentales, habitual en interiores bien iluminados.'),
(13, 'Commelinaceae', 'Familia con plantas colgantes y de crecimiento rápido como Tradescantia.'),
(14, 'Gesneriaceae', 'Familia de ornamentales de flor como Streptocarpus y otras especies de interior.'),
(15, 'Acanthaceae', 'Familia con plantas decorativas de follaje o flor como Fittonia e Hypoestes.'),
(16, 'Zingiberaceae', 'Familia que incluye jengibre, cúrcuma y algunas especies ornamentales tropicales.'),
(17, 'Lamiaceae', 'Familia muy importante en España por sus aromáticas, como lavanda, menta, salvia y romero.'),
(18, 'Geraniaceae', 'Familia de geranios y pelargonios, muy típica de balcones y ventanas en España.'),
(19, 'Crassulaceae', 'Familia de suculentas muy populares como Crassula, Echeveria y Kalanchoe.'),
(20, 'Cactaceae', 'Familia de cactus, muy habitual en colecciones domésticas, alféizares y terrazas soleadas.'),
(21, 'Asphodelaceae', 'Familia que incluye Aloe y otras plantas resistentes usadas en interior y exterior.'),
(22, 'Rutaceae', 'Familia de cítricos como limonero, mandarino y naranjo, comunes en patios y terrazas.'),
(23, 'Asteraceae', 'Familia muy amplia con ornamentales y plantas útiles de jardín y huerto.'),
(24, 'Apocynaceae', 'Familia que incluye adelfa, mandevilla, hoya y otras ornamentales de flor o follaje.'),
(25, 'Plumbaginaceae', 'Familia con especies ornamentales resistentes al sol y al ambiente costero, como Plumbago.'),
(26, 'Nyctaginaceae', 'Familia que incluye la buganvilla, muy frecuente en patios, fachadas y terrazas.'),
(27, 'Portulacaceae', 'Familia con portulacas y otras especies aptas para macetas soleadas y secas.'),
(28, 'Verbenaceae', 'Familia con plantas ornamentales de balcón y jardín como Verbena y Lantana.'),
(29, 'Malvaceae', 'Familia con hibiscos, malvas y otras especies ornamentales habituales en exterior.'),
(30, 'Bignoniaceae', 'Familia de trepadoras y arbustos ornamentales como Campsis, Tecoma y otras afines.'),
(31, 'Passifloraceae', 'Familia de pasifloras, muy usada como trepadora ornamental y en algunos casos frutal.'),
(32, 'Oleaceae', 'Familia que incluye jazmín, olivo y otras especies ornamentales y mediterráneas conocidas.'),
(33, 'Vitaceae', 'Familia de la vid y de trepadoras como Parthenocissus, útiles para pérgolas y fachadas.'),
(34, 'Campanulaceae', 'Familia con campánulas y otras ornamentales de flor usadas en maceta y jardín.'),
(35, 'Solanaceae', 'Familia esencial en huerto urbano, con tomate, pimiento, berenjena y otras especies muy comunes.'),
(36, 'Brassicaceae', 'Familia de hortalizas como coles, rábanos y rúcula, frecuente en huertos domésticos.'),
(37, 'Fabaceae', 'Familia muy importante en huerto y jardín, con judías, guisantes, habas y otras leguminosas.'),
(38, 'Amaryllidaceae', 'Familia que incluye Allium y también bulbosas ornamentales muy conocidas.'),
(39, 'Apiaceae', 'Familia de aromáticas y hortalizas como perejil, cilantro, apio y zanahoria.'),
(40, 'Cucurbitaceae', 'Familia de huerto con pepino, calabacín, melón, sandía y calabaza.'),
(41, 'Amaranthaceae', 'Familia que incluye espinaca, acelga y otras especies útiles para huerto doméstico.'),
(42, 'Rosaceae', 'Familia con rosales, fresas y muchos frutales comunes en jardines y terrazas.'),
(43, 'Liliaceae', 'Familia de ornamentales bulbosas como Lilium y Tulipa.'),
(44, 'Iridaceae', 'Familia de lirios, gladiolos y crocos, frecuente en jardinería doméstica.'),
(45, 'Caryophyllaceae', 'Familia de claveles y otras plantas de flor comunes en jardinería.'),
(46, 'Primulaceae', 'Familia con ciclámenes, prímulas y otras especies ornamentales de temporada.'),
(47, 'Ranunculaceae', 'Familia con anémonas, clemátides y otras ornamentales de flor.'),
(48, 'Rubiaceae', 'Familia con gardenia, cafeto y otras especies ornamentales o de colección.'),
(49, 'Violaceae', 'Familia de violetas y pensamientos, muy común en macetas y jardineras.'),
(50, 'Araliaceae', 'Familia que incluye hiedra y Schefflera, frecuentes en interior y exterior.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `FOTO_PLANTA`
--

CREATE TABLE `FOTO_PLANTA` (
  `id_foto` int UNSIGNED NOT NULL,
  `id_usuario_planta` int UNSIGNED NOT NULL,
  `url_imagen` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `HISTORIAL_CUIDADO`
--

CREATE TABLE `HISTORIAL_CUIDADO` (
  `id_historial` int UNSIGNED NOT NULL,
  `id_usuario_planta` int UNSIGNED NOT NULL,
  `tipo_cuidado` enum('riego','abono','poda','trasplante','fumigacion','limpieza','revision','otro') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notas` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `LOCALIZACION`
--

CREATE TABLE `LOCALIZACION` (
  `id_localizacion` int UNSIGNED NOT NULL,
  `ciudad` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `provincia` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pais` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitud` decimal(10,7) NOT NULL,
  `longitud` decimal(10,7) NOT NULL,
  `fecha_actualizacion` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `LOCALIZACION`
--

INSERT INTO `LOCALIZACION` (`id_localizacion`, `ciudad`, `provincia`, `pais`, `latitud`, `longitud`, `fecha_actualizacion`) VALUES
(1, 'Granada', 'Granada', 'España', 37.1773000, -3.5986000, CURRENT_TIMESTAMP),
(2, 'Málaga', 'Málaga', 'España', 36.7213000, -4.4214000, CURRENT_TIMESTAMP),
(3, 'Sevilla', 'Sevilla', 'España', 37.3891000, -5.9845000, CURRENT_TIMESTAMP),
(4, 'Córdoba', 'Córdoba', 'España', 37.8882000, -4.7794000, CURRENT_TIMESTAMP),
(5, 'Madrid', 'Madrid', 'España', 40.4168000, -3.7038000, CURRENT_TIMESTAMP);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PLANTA`
--

CREATE TABLE `PLANTA` (
  `id_planta` int UNSIGNED NOT NULL,
  `id_familia` int UNSIGNED DEFAULT NULL,
  `nombre_comun` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre_cientifico` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo` enum('interior','exterior','acuatica','suculenta','aromatica','frutal','ornamental','trepadora','otro') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'interior',
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `url_img_default` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `apta_exterior_temp` tinyint(1) NOT NULL DEFAULT '0',
  `luz_recomendada` enum('plena_sombra','sombra_parcial','luz_indirecta','luz_directa') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'luz_indirecta',
  `humedad_recomendada` enum('baja','media','alta') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'media',
  `temp_minima` decimal(5,2) DEFAULT NULL COMMENT 'En grados Celsius',
  `temp_maxima` decimal(5,2) DEFAULT NULL COMMENT 'En grados Celsius',
  `tolerancia_sol` enum('baja','media','alta') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'media',
  `frecuencia_riego` tinyint UNSIGNED DEFAULT NULL COMMENT 'Días entre riegos recomendados',
  `frecuencia_abono` tinyint UNSIGNED DEFAULT NULL COMMENT 'Días entre abonados recomendados'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `PLANTA`
--

INSERT INTO `PLANTA` (`id_planta`, `id_familia`, `nombre_comun`, `nombre_cientifico`, `tipo`, `descripcion`, `url_img_default`, `apta_exterior_temp`, `luz_recomendada`, `humedad_recomendada`, `temp_minima`, `temp_maxima`, `tolerancia_sol`, `frecuencia_riego`, `frecuencia_abono`) VALUES
(1, 1, 'Poto', 'Epipremnum aureum', 'interior', 'Planta trepadora de interior muy resistente y popular.', NULL, 1, 'luz_indirecta', 'media', 15.00, 30.00, 'baja', 7, 30),
(2, 1, 'Costilla de Adán', 'Monstera deliciosa', 'interior', 'Planta tropical de interior muy usada por sus hojas grandes y recortadas.', NULL, 1, 'luz_indirecta', 'media', 16.00, 30.00, 'baja', 7, 30),
(3, 1, 'Espatifilo', 'Spathiphyllum wallisii', 'interior', 'Planta de interior apreciada por su follaje brillante y sus espatas blancas.', NULL, 0, 'sombra_parcial', 'alta', 15.00, 28.00, 'baja', 5, 30),
(4, 2, 'Sansevieria', 'Dracaena trifasciata', 'suculenta', 'Suculenta muy resistente, ideal para interiores luminosos y riego espaciado.', NULL, 1, 'luz_indirecta', 'baja', 10.00, 32.00, 'media', 14, 45),
(5, 2, 'Tronco de Brasil', 'Dracaena fragrans', 'interior', 'Planta de interior de bajo mantenimiento con hojas largas y arqueadas.', NULL, 1, 'luz_indirecta', 'media', 15.00, 30.00, 'baja', 10, 30),
(6, 3, 'Ficus elástica', 'Ficus elastica', 'interior', 'Árbol de interior muy popular por sus hojas grandes, oscuras y brillantes.', NULL, 1, 'luz_indirecta', 'media', 15.00, 30.00, 'media', 10, 30),
(7, 3, 'Ficus benjamina', 'Ficus benjamina', 'interior', 'Ficus de interior con porte elegante y ramas colgantes.', NULL, 1, 'luz_indirecta', 'media', 15.00, 30.00, 'media', 7, 30),
(8, 5, 'Helecho de Boston', 'Nephrolepis exaltata', 'interior', 'Helecho de interior que prefiere humedad alta y luz suave.', NULL, 1, 'sombra_parcial', 'alta', 15.00, 28.00, 'baja', 4, 30),
(9, 9, 'Peperomia', 'Peperomia obtusifolia', 'interior', 'Planta compacta de interior con hojas carnosas y cuidados sencillos.', NULL, 0, 'luz_indirecta', 'media', 15.00, 28.00, 'baja', 10, 45),
(10, 10, 'Pilea', 'Pilea peperomioides', 'interior', 'Planta de interior muy conocida por sus hojas redondas en forma de moneda.', NULL, 0, 'luz_indirecta', 'media', 12.00, 28.00, 'baja', 7, 30),
(11, 21, 'Aloe vera', 'Aloe vera', 'suculenta', 'Suculenta muy habitual en casa, valorada por su resistencia y por el gel de sus hojas.', NULL, 1, 'luz_directa', 'baja', 10.00, 32.00, 'alta', 14, 45),
(12, 19, 'Árbol de jade', 'Crassula ovata', 'suculenta', 'Suculenta de crecimiento lento y muy usada en interior luminoso y terrazas.', NULL, 1, 'luz_directa', 'baja', 10.00, 30.00, 'alta', 14, 30),
(13, 19, 'Echeveria', 'Echeveria elegans', 'suculenta', 'Suculenta en roseta muy común en colecciones y arreglos de maceta.', NULL, 1, 'luz_directa', 'baja', 8.00, 30.00, 'alta', 12, 45),
(14, 19, 'Kalanchoe', 'Kalanchoe blossfeldiana', 'suculenta', 'Suculenta ornamental muy vendida por su floración abundante y duradera.', NULL, 1, 'luz_directa', 'baja', 12.00, 28.00, 'media', 10, 30),
(15, 20, 'Cactus de Navidad', 'Schlumbergera truncata', 'suculenta', 'Cactus epífito muy cultivado en interior por su floración de invierno.', NULL, 1, 'luz_indirecta', 'media', 12.00, 26.00, 'baja', 7, 30),
(16, 17, 'Lavanda', 'Lavandula angustifolia', 'aromatica', 'Aromática mediterránea muy usada en maceta, jardín y balcones soleados.', NULL, 1, 'luz_directa', 'baja', 5.00, 32.00, 'alta', 7, 60),
(17, 17, 'Hierbabuena', 'Mentha spicata', 'aromatica', 'Aromática muy común en cocina y maceta, con crecimiento rápido y vigoroso.', NULL, 1, 'sombra_parcial', 'media', 5.00, 28.00, 'media', 4, 30),
(18, 17, 'Romero', 'Salvia rosmarinus', 'aromatica', 'Aromática leñosa muy típica del clima mediterráneo y del cultivo en terraza.', NULL, 1, 'luz_directa', 'baja', 5.00, 32.00, 'alta', 7, 45),
(19, 17, 'Albahaca', 'Ocimum basilicum', 'aromatica', 'Aromática culinaria muy usada en primavera y verano, ideal para maceta.', NULL, 1, 'luz_directa', 'media', 12.00, 32.00, 'media', 3, 21),
(20, 39, 'Perejil', 'Petroselinum crispum', 'aromatica', 'Hierba culinaria muy habitual en huerto urbano, maceta y jardineras.', NULL, 1, 'sombra_parcial', 'media', 5.00, 28.00, 'media', 4, 30),
(21, 18, 'Gitanilla', 'Pelargonium peltatum', 'ornamental', 'Planta colgante de balcón muy típica en España por su floración prolongada.', NULL, 1, 'luz_directa', 'baja', 8.00, 30.00, 'alta', 5, 21),
(22, 29, 'Hibisco', 'Hibiscus × rosa-sinensis', 'ornamental', 'Arbusto ornamental muy valorado por sus flores grandes y vistosas.', NULL, 1, 'luz_directa', 'media', 12.00, 32.00, 'media', 4, 21),
(23, 35, 'Petunia', 'Petunia × atkinsiana', 'ornamental', 'Planta de flor muy común en jardineras y balcones soleados.', NULL, 1, 'luz_directa', 'media', 8.00, 30.00, 'alta', 3, 15),
(24, 48, 'Gardenia', 'Gardenia jasminoides', 'ornamental', 'Arbusto ornamental de flor perfumada que agradece ambientes húmedos y sustrato ácido.', NULL, 1, 'sombra_parcial', 'alta', 10.00, 28.00, 'media', 5, 30),
(25, 13, 'Tradescantia zebrina', 'Tradescantia zebrina', 'ornamental', 'Planta colgante muy usada por sus hojas verdes y plateadas con envés púrpura.', NULL, 1, 'luz_indirecta', 'media', 10.00, 30.00, 'media', 7, 30),
(26, 26, 'Buganvilla', 'Bougainvillea glabra', 'trepadora', 'Trepadora muy habitual en patios y fachadas por sus brácteas de color intenso.', NULL, 1, 'luz_directa', 'baja', 10.00, 35.00, 'alta', 5, 21),
(27, 31, 'Pasionaria', 'Passiflora caerulea', 'trepadora', 'Trepadora vigorosa de flor muy llamativa, útil para pérgolas y celosías.', NULL, 1, 'luz_directa', 'media', 5.00, 30.00, 'media', 5, 30),
(28, 22, 'Limonero', 'Citrus × limon', 'frutal', 'Frutal muy común en patios y terrazas soleadas, apto para macetón.', NULL, 1, 'luz_directa', 'media', 5.00, 32.00, 'alta', 5, 30),
(29, 42, 'Fresa', 'Fragaria × ananassa', 'frutal', 'Planta frutal muy usada en macetas, mesas de cultivo y jardineras.', NULL, 1, 'luz_directa', 'media', 0.00, 28.00, 'alta', 3, 21),
(30, 33, 'Vid', 'Vitis vinifera', 'frutal', 'Trepadora frutal clásica, muy útil para pérgolas y cultivo doméstico en exterior.', NULL, 1, 'luz_directa', 'media', 0.00, 32.00, 'alta', 5, 30),
(31, 2, 'Cinta', 'Chlorophytum comosum', 'interior', 'Planta de interior muy resistente, ideal para estanterías y macetas colgantes.', NULL, 1, 'luz_indirecta', 'media', 10.00, 30.00, 'media', 7, 30),
(32, 6, 'Palmera de salón', 'Chamaedorea elegans', 'interior', 'Palmera compacta de interior muy usada por su porte elegante y fácil mantenimiento.', NULL, 0, 'sombra_parcial', 'media', 14.00, 28.00, 'baja', 6, 30),
(33, 6, 'Areca', 'Chrysalidocarpus lutescens', 'interior', 'Palmera ornamental muy popular en interiores luminosos y espacios amplios.', NULL, 1, 'luz_indirecta', 'media', 15.00, 30.00, 'media', 5, 30),
(34, 4, 'Orquídea mariposa', 'Phalaenopsis aphrodite', 'interior', 'Orquídea de interior muy apreciada por su floración elegante y duradera.', NULL, 0, 'luz_indirecta', 'alta', 18.00, 28.00, 'baja', 7, 30),
(35, 12, 'Guzmania', 'Guzmania lingulata', 'interior', 'Bromelia de interior con roseta decorativa y brácteas de color intenso.', NULL, 0, 'luz_indirecta', 'alta', 16.00, 28.00, 'baja', 6, 30),
(36, 15, 'Fitonia', 'Fittonia albivenis', 'interior', 'Planta pequeña de interior muy decorativa por el dibujo de sus nervaduras.', NULL, 0, 'sombra_parcial', 'alta', 16.00, 26.00, 'baja', 4, 30),
(37, 8, 'Maranta', 'Maranta leuconeura', 'interior', 'Planta de interior muy conocida por sus hojas ornamentales y su hábito compacto.', NULL, 0, 'sombra_parcial', 'alta', 16.00, 28.00, 'baja', 5, 30),
(38, 50, 'Cheflera', 'Heptapleurum arboricola', 'interior', 'Planta de interior muy usada por su follaje palmeado y fácil adaptación.', NULL, 1, 'luz_indirecta', 'media', 15.00, 30.00, 'media', 7, 30),
(39, 48, 'Cafeto', 'Coffea arabica', 'interior', 'Arbusto de interior luminoso muy valorado por su follaje brillante.', NULL, 1, 'luz_indirecta', 'media', 15.00, 28.00, 'baja', 6, 30),
(40, 7, 'Flor de Pascua', 'Euphorbia pulcherrima', 'ornamental', 'Planta ornamental muy popular en invierno por sus brácteas rojas.', NULL, 1, 'luz_indirecta', 'media', 15.00, 28.00, 'baja', 5, 30),
(41, 7, 'Crotón', 'Codiaeum variegatum', 'interior', 'Planta de interior muy llamativa por el color variado de sus hojas.', NULL, 0, 'luz_indirecta', 'media', 18.00, 30.00, 'baja', 6, 30),
(42, 14, 'Violeta africana', 'Streptocarpus ionanthus', 'interior', 'Planta de interior compacta, muy apreciada por su floración abundante.', NULL, 0, 'luz_indirecta', 'alta', 16.00, 26.00, 'baja', 5, 30),
(43, 50, 'Hiedra', 'Hedera helix', 'trepadora', 'Trepadora muy común en exterior y patios, útil para cubrir muros y celosías.', NULL, 1, 'sombra_parcial', 'media', 0.00, 28.00, 'media', 6, 45),
(44, 25, 'Celestina', 'Plumbago auriculata', 'trepadora', 'Arbusto trepador muy florífero, ideal para sol y terrazas cálidas.', NULL, 1, 'luz_directa', 'media', 8.00, 32.00, 'alta', 5, 30),
(45, 45, 'Clavel', 'Dianthus caryophyllus', 'ornamental', 'Planta de flor muy tradicional en España, apta para maceta y balcón.', NULL, 1, 'luz_directa', 'baja', 0.00, 30.00, 'alta', 4, 21),
(46, 46, 'Prímula', 'Primula vulgaris', 'ornamental', 'Planta de flor muy usada en otoño e invierno en macetas y jardineras.', NULL, 1, 'sombra_parcial', 'media', 0.00, 22.00, 'baja', 4, 21),
(47, 35, 'Tomate', 'Solanum lycopersicum', 'otro', 'Hortaliza muy común en huerto urbano y maceta grande con mucho sol.', NULL, 1, 'luz_directa', 'media', 12.00, 32.00, 'alta', 3, 15),
(48, 35, 'Pimiento', 'Capsicum annuum', 'otro', 'Hortaliza de verano muy cultivada en huerto urbano y terrazas soleadas.', NULL, 1, 'luz_directa', 'media', 12.00, 32.00, 'alta', 3, 15),
(49, 40, 'Pepino', 'Cucumis sativus', 'otro', 'Hortaliza trepadora muy frecuente en huerto urbano durante la temporada cálida.', NULL, 1, 'luz_directa', 'media', 14.00, 32.00, 'alta', 2, 15),
(50, 37, 'Judía verde', 'Phaseolus vulgaris', 'otro', 'Leguminosa muy común en huerto urbano y cultivo de temporada.', NULL, 1, 'luz_directa', 'media', 12.00, 30.00, 'alta', 3, 21),
(51, 38, 'Cebolla', 'Allium cepa', 'otro', 'Hortaliza bulbosa muy habitual en huerto doméstico y macetas profundas.', NULL, 1, 'luz_directa', 'baja', 5.00, 30.00, 'alta', 5, 30),
(52, 41, 'Espinaca', 'Spinacia oleracea', 'otro', 'Hortaliza de hoja muy usada en huerto urbano, especialmente en épocas frescas.', NULL, 1, 'sombra_parcial', 'media', 2.00, 24.00, 'media', 3, 21),
(53, 11, 'Begonia rex', 'Begonia rex', 'interior', 'Begonia de interior muy apreciada por el color y la textura de sus hojas.', NULL, 1, 'luz_indirecta', 'alta', 16.00, 28.00, 'baja', 5, 30),
(54, 16, 'Jengibre', 'Zingiber officinale', 'aromatica', 'Planta aromática y culinaria cultivable en maceta en ambientes cálidos y protegidos.', NULL, 1, 'sombra_parcial', 'alta', 18.00, 32.00, 'baja', 5, 30),
(55, 24, 'Hoya carnosa', 'Hoya carnosa', 'trepadora', 'Trepadora de interior muy popular por sus hojas gruesas y sus flores cerosas.', NULL, 1, 'luz_indirecta', 'media', 15.00, 30.00, 'media', 10, 45),
(56, 23, 'Gerbera', 'Gerbera jamesonii', 'ornamental', 'Planta ornamental de flor muy común en maceta y jardineras luminosas.', NULL, 1, 'luz_directa', 'media', 8.00, 28.00, 'media', 4, 21),
(57, 27, 'Verdolaga de flor', 'Portulaca grandiflora', 'ornamental', 'Planta de flor muy resistente al sol, ideal para macetas secas y balcones cálidos.', NULL, 1, 'luz_directa', 'baja', 10.00, 32.00, 'alta', 4, 30),
(58, 28, 'Lantana', 'Lantana camara', 'ornamental', 'Arbusto ornamental muy florífero, apto para terrazas y balcones soleados.', NULL, 1, 'luz_directa', 'baja', 8.00, 35.00, 'alta', 5, 30),
(59, 30, 'Bignonia roja', 'Campsis radicans', 'trepadora', 'Trepadora vigorosa de exterior muy útil para cubrir pérgolas y celosías.', NULL, 1, 'luz_directa', 'media', -5.00, 35.00, 'alta', 7, 45),
(60, 34, 'Campánula colgante', 'Campanula isophylla', 'ornamental', 'Planta de flor muy usada en cestas y macetas de exterior luminoso.', NULL, 1, 'sombra_parcial', 'media', 5.00, 24.00, 'baja', 4, 21),
(61, 36, 'Col', 'Brassica oleracea', 'otro', 'Hortaliza muy común en huerto doméstico y cultivo de temporada fresca.', NULL, 1, 'luz_directa', 'media', 2.00, 24.00, 'media', 3, 15),
(62, 43, 'Azucena', 'Lilium candidum', 'ornamental', 'Bulbosa ornamental clásica, muy apreciada por sus flores grandes y perfumadas.', NULL, 1, 'luz_directa', 'media', 0.00, 28.00, 'media', 5, 30),
(63, 44, 'Lirio florentino', 'Iris florentina', 'ornamental', 'Lirio ornamental de exterior muy adecuado para macetas grandes y jardines soleados.', NULL, 1, 'luz_directa', 'media', 0.00, 30.00, 'alta', 7, 30),
(64, 47, 'Ranúnculo', 'Ranunculus asiaticus', 'ornamental', 'Planta bulbosa de flor muy usada en macetas y composiciones de temporada.', NULL, 1, 'luz_directa', 'media', 5.00, 24.00, 'media', 4, 21),
(65, 49, 'Violeta olorosa', 'Viola odorata', 'ornamental', 'Planta pequeña de flor, muy útil para macetas de sombra y ambientes frescos.', NULL, 1, 'sombra_parcial', 'media', 0.00, 22.00, 'baja', 4, 21),
(66, 11, 'Begonia rex', 'Begonia rex', 'interior', 'Begonia de interior muy apreciada por el color y la textura de sus hojas.', NULL, 1, 'luz_indirecta', 'alta', 16.00, 28.00, 'baja', 5, 30),
(67, 16, 'Jengibre', 'Zingiber officinale', 'aromatica', 'Planta aromática y culinaria cultivable en maceta en ambientes cálidos y protegidos.', NULL, 1, 'sombra_parcial', 'alta', 18.00, 32.00, 'baja', 5, 30),
(68, 24, 'Hoya carnosa', 'Hoya carnosa', 'trepadora', 'Trepadora de interior muy popular por sus hojas gruesas y sus flores cerosas.', NULL, 1, 'luz_indirecta', 'media', 15.00, 30.00, 'media', 10, 45),
(69, 23, 'Gerbera', 'Gerbera jamesonii', 'ornamental', 'Planta ornamental de flor muy común en maceta y jardineras luminosas.', NULL, 1, 'luz_directa', 'media', 8.00, 28.00, 'media', 4, 21),
(70, 27, 'Verdolaga de flor', 'Portulaca grandiflora', 'ornamental', 'Planta de flor muy resistente al sol, ideal para macetas secas y balcones cálidos.', NULL, 1, 'luz_directa', 'baja', 10.00, 32.00, 'alta', 4, 30),
(71, 28, 'Lantana', 'Lantana camara', 'ornamental', 'Arbusto ornamental muy florífero, apto para terrazas y balcones soleados.', NULL, 1, 'luz_directa', 'baja', 8.00, 35.00, 'alta', 5, 30),
(72, 30, 'Bignonia roja', 'Campsis radicans', 'trepadora', 'Trepadora vigorosa de exterior muy útil para cubrir pérgolas y celosías.', NULL, 1, 'luz_directa', 'media', -5.00, 35.00, 'alta', 7, 45),
(73, 34, 'Campánula colgante', 'Campanula isophylla', 'ornamental', 'Planta de flor muy usada en cestas y macetas de exterior luminoso.', NULL, 1, 'sombra_parcial', 'media', 5.00, 24.00, 'baja', 4, 21),
(74, 36, 'Col', 'Brassica oleracea', 'otro', 'Hortaliza muy común en huerto doméstico y cultivo de temporada fresca.', NULL, 1, 'luz_directa', 'media', 2.00, 24.00, 'media', 3, 15),
(75, 43, 'Azucena', 'Lilium candidum', 'ornamental', 'Bulbosa ornamental clásica, muy apreciada por sus flores grandes y perfumadas.', NULL, 1, 'luz_directa', 'media', 0.00, 28.00, 'media', 5, 30),
(76, 44, 'Lirio florentino', 'Iris florentina', 'ornamental', 'Lirio ornamental de exterior muy adecuado para macetas grandes y jardines soleados.', NULL, 1, 'luz_directa', 'media', 0.00, 30.00, 'alta', 7, 30),
(77, 47, 'Ranúnculo', 'Ranunculus asiaticus', 'ornamental', 'Planta bulbosa de flor muy usada en macetas y composiciones de temporada.', NULL, 1, 'luz_directa', 'media', 5.00, 24.00, 'media', 4, 21),
(78, 49, 'Violeta olorosa', 'Viola odorata', 'ornamental', 'Planta pequeña de flor, muy útil para macetas de sombra y ambientes frescos.', NULL, 1, 'sombra_parcial', 'media', 0.00, 22.00, 'baja', 4, 21),
(79, 32, 'Jazmín', 'Jasminum officinale', 'trepadora', 'Trepadora muy apreciada por su floración blanca y su aroma intenso.', NULL, 1, 'luz_directa', 'media', 5.00, 32.00, 'media', 5, 30);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PLANTA_USUARIO`
--

CREATE TABLE `PLANTA_USUARIO` (
  `id_usuario_planta` int UNSIGNED NOT NULL,
  `id_usuario` int UNSIGNED NOT NULL,
  `id_planta` int UNSIGNED NOT NULL,
  `id_ubicacion` int UNSIGNED DEFAULT NULL,
  `nombre_personalizado` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notas` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `fecha_adquisicion` date DEFAULT NULL,
  `estado_salud` enum('excelente','bueno','regular','malo','critico') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'bueno'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RECOMENDACION_SINTOMA`
--

CREATE TABLE `RECOMENDACION_SINTOMA` (
  `id_recomendacion` int UNSIGNED NOT NULL,
  `id_sintoma` int UNSIGNED NOT NULL,
  `id_planta` int UNSIGNED DEFAULT NULL COMMENT 'NULL = recomendación genérica para cualquier planta',
  `posible_causa` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `recomendacion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `observaciones` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `prioridad` enum('baja','media','alta','urgente') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'media'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RECORDATORIO`
--

CREATE TABLE `RECORDATORIO` (
  `id_recordatorio` int UNSIGNED NOT NULL,
  `id_usuario_planta` int UNSIGNED NOT NULL,
  `tipo` enum('riego','abono','poda','trasplante','fumigacion','revision','otro') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `frecuencia` tinyint UNSIGNED NOT NULL DEFAULT '7' COMMENT 'Frecuencia en días',
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `fecha_proximo` date DEFAULT NULL,
  `notification_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `RESPUESTA_CUESTIONARIO`
--

CREATE TABLE `RESPUESTA_CUESTIONARIO` (
  `id_respuesta` int UNSIGNED NOT NULL,
  `id_cuestionario` int UNSIGNED NOT NULL,
  `id_sintoma` int UNSIGNED DEFAULT NULL COMMENT 'Síntoma detectado a partir de la respuesta'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `SINTOMA`
--

CREATE TABLE `SINTOMA` (
  `id_sintoma` int UNSIGNED NOT NULL,
  `nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `SINTOMA`
--

INSERT INTO `SINTOMA` (`id_sintoma`, `nombre`, `descripcion`) VALUES
(1, 'Hojas amarillas', 'Las hojas pierden su color verde y se vuelven amarillas total o parcialmente.'),
(2, 'Puntas secas', 'Las puntas de las hojas aparecen secas, marrones o quebradizas.'),
(3, 'Bordes quemados', 'Los bordes de las hojas se ven marrones, secos o con aspecto quemado.'),
(4, 'Manchas marrones', 'Aparecen manchas marrones en hojas, tallos o flores.'),
(5, 'Manchas amarillas', 'Se observan zonas amarillas localizadas en las hojas.'),
(6, 'Hojas caídas', 'Las hojas cuelgan o pierden firmeza respecto a su posición normal.'),
(7, 'Caída de hojas', 'La planta pierde hojas con facilidad o de forma continua.'),
(8, 'Hojas blandas', 'Las hojas están flácidas, blandas o sin tensión.'),
(9, 'Hojas arrugadas', 'Las hojas presentan arrugas, pliegues o aspecto deshidratado.'),
(10, 'Hojas enrolladas', 'Las hojas se curvan o enrollan sobre sí mismas.'),
(11, 'Hojas pálidas', 'Las hojas se ven más claras de lo normal o con pérdida general de color.'),
(12, 'Crecimiento lento', 'La planta apenas produce hojas, brotes o tallos nuevos.'),
(13, 'Planta marchita', 'La planta muestra decaimiento general y pérdida de vigor.'),
(14, 'Tallo blando', 'El tallo está blando, húmedo o con pérdida de firmeza.'),
(15, 'Tallo ennegrecido', 'El tallo presenta zonas oscuras o ennegrecidas.'),
(16, 'Raíces podridas', 'Las raíces tienen mal aspecto, están oscuras, blandas o deshechas.'),
(17, 'Moho en sustrato', 'Aparece una capa de moho o pelusa en la superficie del sustrato.'),
(18, 'Sustrato muy seco', 'El sustrato se observa excesivamente seco, compacto o separado de la maceta.'),
(19, 'Mal olor en sustrato', 'El sustrato desprende olor desagradable o a humedad estancada.'),
(20, 'Plaga visible', 'Se observan insectos, larvas u otros organismos sobre la planta.'),
(21, 'Telarañas finas', 'Se aprecian hilos finos o pequeñas telarañas en hojas o tallos.'),
(22, 'Bultos algodonosos', 'Aparecen acumulaciones blancas con aspecto algodonoso en la planta.'),
(23, 'Insectos pequeños verdes o negros', 'Se ven insectos pequeños agrupados en brotes, tallos o envés de hojas.'),
(24, 'Agujeros en hojas', 'Las hojas presentan perforaciones o mordeduras visibles.'),
(25, 'Hojas pegajosas', 'Las hojas o tallos tienen una sustancia pegajosa en la superficie.'),
(26, 'Falta de floración', 'La planta no florece cuando debería hacerlo o florece muy poco.'),
(27, 'Flores marchitas rápidamente', 'Las flores duran poco tiempo o se deterioran antes de lo esperado.'),
(28, 'Brotes deformes', 'Los brotes nuevos salen torcidos, pequeños o con forma anormal.'),
(29, 'Hojas con polvo blanco', 'Las hojas presentan una capa blanca fina o polvillo en la superficie.'),
(30, 'Decoloración por zonas', 'La hoja muestra pérdida irregular de color en áreas concretas.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `UBICACION`
--

CREATE TABLE `UBICACION` (
  `id_ubicacion` int UNSIGNED NOT NULL,
  `id_usuario` int UNSIGNED NOT NULL,
  `id_localizacion` int UNSIGNED DEFAULT NULL,
  `nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `luz` enum('plena_sombra','sombra_parcial','luz_indirecta','luz_directa') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'luz_indirecta',
  `humedad` enum('baja','media','alta') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'media',
  `es_exterior` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USUARIO`
--

CREATE TABLE `USUARIO` (
  `id_usuario` int UNSIGNED NOT NULL,
  `nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contrasena` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_localizacion_default` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `CONFIG_USUARIO`
--
ALTER TABLE `CONFIG_USUARIO`
  ADD PRIMARY KEY (`id_configuracion`),
  ADD UNIQUE KEY `uq_config_usuario` (`id_usuario`);

--
-- Indices de la tabla `CUESTIONARIO`
--
ALTER TABLE `CUESTIONARIO`
  ADD PRIMARY KEY (`id_cuestionario`),
  ADD KEY `fk_cuestionario_pu` (`id_usuario_planta`);

--
-- Indices de la tabla `FAMILIA_PLANTA`
--
ALTER TABLE `FAMILIA_PLANTA`
  ADD PRIMARY KEY (`id_familia`);

--
-- Indices de la tabla `FOTO_PLANTA`
--
ALTER TABLE `FOTO_PLANTA`
  ADD PRIMARY KEY (`id_foto`),
  ADD KEY `fk_foto_planta_usuario` (`id_usuario_planta`);

--
-- Indices de la tabla `HISTORIAL_CUIDADO`
--
ALTER TABLE `HISTORIAL_CUIDADO`
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `fk_historial_pu` (`id_usuario_planta`);

--
-- Indices de la tabla `LOCALIZACION`
--
ALTER TABLE `LOCALIZACION`
  ADD PRIMARY KEY (`id_localizacion`);

--
-- Indices de la tabla `PLANTA`
--
ALTER TABLE `PLANTA`
  ADD PRIMARY KEY (`id_planta`),
  ADD KEY `fk_planta_familia` (`id_familia`);

--
-- Indices de la tabla `PLANTA_USUARIO`
--
ALTER TABLE `PLANTA_USUARIO`
  ADD PRIMARY KEY (`id_usuario_planta`),
  ADD KEY `fk_pu_usuario` (`id_usuario`),
  ADD KEY `fk_pu_planta` (`id_planta`),
  ADD KEY `fk_pu_ubicacion` (`id_ubicacion`);

--
-- Indices de la tabla `RECOMENDACION_SINTOMA`
--
ALTER TABLE `RECOMENDACION_SINTOMA`
  ADD PRIMARY KEY (`id_recomendacion`),
  ADD KEY `fk_rec_sintoma` (`id_sintoma`),
  ADD KEY `fk_rec_planta` (`id_planta`);

--
-- Indices de la tabla `RECORDATORIO`
--
ALTER TABLE `RECORDATORIO`
  ADD PRIMARY KEY (`id_recordatorio`),
  ADD KEY `fk_recordatorio_pu` (`id_usuario_planta`);

--
-- Indices de la tabla `RESPUESTA_CUESTIONARIO`
--
ALTER TABLE `RESPUESTA_CUESTIONARIO`
  ADD PRIMARY KEY (`id_respuesta`),
  ADD KEY `fk_rc_cuestionario` (`id_cuestionario`),
  ADD KEY `fk_rc_sintoma` (`id_sintoma`);

--
-- Indices de la tabla `SINTOMA`
--
ALTER TABLE `SINTOMA`
  ADD PRIMARY KEY (`id_sintoma`);

--
-- Indices de la tabla `UBICACION`
--
ALTER TABLE `UBICACION`
  ADD PRIMARY KEY (`id_ubicacion`),
  ADD KEY `fk_ubicacion_usuario` (`id_usuario`),
  ADD KEY `fk_ubicacion_localizacion` (`id_localizacion`);

--
-- Indices de la tabla `USUARIO`
--
ALTER TABLE `USUARIO`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `uq_usuario_email` (`email`),
  ADD KEY `fk_usuario_localizacion` (`id_localizacion_default`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `CONFIG_USUARIO`
--
ALTER TABLE `CONFIG_USUARIO`
  MODIFY `id_configuracion` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `CUESTIONARIO`
--
ALTER TABLE `CUESTIONARIO`
  MODIFY `id_cuestionario` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `FAMILIA_PLANTA`
--
ALTER TABLE `FAMILIA_PLANTA`
  MODIFY `id_familia` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `FOTO_PLANTA`
--
ALTER TABLE `FOTO_PLANTA`
  MODIFY `id_foto` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `HISTORIAL_CUIDADO`
--
ALTER TABLE `HISTORIAL_CUIDADO`
  MODIFY `id_historial` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `LOCALIZACION`
--
ALTER TABLE `LOCALIZACION`
  MODIFY `id_localizacion` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `PLANTA`
--
ALTER TABLE `PLANTA`
  MODIFY `id_planta` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT de la tabla `PLANTA_USUARIO`
--
ALTER TABLE `PLANTA_USUARIO`
  MODIFY `id_usuario_planta` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `RECOMENDACION_SINTOMA`
--
ALTER TABLE `RECOMENDACION_SINTOMA`
  MODIFY `id_recomendacion` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `RECORDATORIO`
--
ALTER TABLE `RECORDATORIO`
  MODIFY `id_recordatorio` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `RESPUESTA_CUESTIONARIO`
--
ALTER TABLE `RESPUESTA_CUESTIONARIO`
  MODIFY `id_respuesta` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `SINTOMA`
--
ALTER TABLE `SINTOMA`
  MODIFY `id_sintoma` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `UBICACION`
--
ALTER TABLE `UBICACION`
  MODIFY `id_ubicacion` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `USUARIO`
--
ALTER TABLE `USUARIO`
  MODIFY `id_usuario` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `CONFIG_USUARIO`
--
ALTER TABLE `CONFIG_USUARIO`
  ADD CONSTRAINT `fk_config_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `USUARIO` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `CUESTIONARIO`
--
ALTER TABLE `CUESTIONARIO`
  ADD CONSTRAINT `fk_cuestionario_pu` FOREIGN KEY (`id_usuario_planta`) REFERENCES `PLANTA_USUARIO` (`id_usuario_planta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `FOTO_PLANTA`
--
ALTER TABLE `FOTO_PLANTA`
  ADD CONSTRAINT `fk_foto_planta_usuario` FOREIGN KEY (`id_usuario_planta`) REFERENCES `PLANTA_USUARIO` (`id_usuario_planta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `HISTORIAL_CUIDADO`
--
ALTER TABLE `HISTORIAL_CUIDADO`
  ADD CONSTRAINT `fk_historial_pu` FOREIGN KEY (`id_usuario_planta`) REFERENCES `PLANTA_USUARIO` (`id_usuario_planta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `PLANTA`
--
ALTER TABLE `PLANTA`
  ADD CONSTRAINT `fk_planta_familia` FOREIGN KEY (`id_familia`) REFERENCES `FAMILIA_PLANTA` (`id_familia`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `PLANTA_USUARIO`
--
ALTER TABLE `PLANTA_USUARIO`
  ADD CONSTRAINT `fk_pu_planta` FOREIGN KEY (`id_planta`) REFERENCES `PLANTA` (`id_planta`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pu_ubicacion` FOREIGN KEY (`id_ubicacion`) REFERENCES `UBICACION` (`id_ubicacion`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pu_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `USUARIO` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `RECOMENDACION_SINTOMA`
--
ALTER TABLE `RECOMENDACION_SINTOMA`
  ADD CONSTRAINT `fk_rec_planta` FOREIGN KEY (`id_planta`) REFERENCES `PLANTA` (`id_planta`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rec_sintoma` FOREIGN KEY (`id_sintoma`) REFERENCES `SINTOMA` (`id_sintoma`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `RECORDATORIO`
--
ALTER TABLE `RECORDATORIO`
  ADD CONSTRAINT `fk_recordatorio_pu` FOREIGN KEY (`id_usuario_planta`) REFERENCES `PLANTA_USUARIO` (`id_usuario_planta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `RESPUESTA_CUESTIONARIO`
--
ALTER TABLE `RESPUESTA_CUESTIONARIO`
  ADD CONSTRAINT `fk_rc_cuestionario` FOREIGN KEY (`id_cuestionario`) REFERENCES `CUESTIONARIO` (`id_cuestionario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rc_sintoma` FOREIGN KEY (`id_sintoma`) REFERENCES `SINTOMA` (`id_sintoma`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `UBICACION`
--
ALTER TABLE `UBICACION`
  ADD CONSTRAINT `fk_ubicacion_localizacion` FOREIGN KEY (`id_localizacion`) REFERENCES `LOCALIZACION` (`id_localizacion`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ubicacion_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `USUARIO` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `USUARIO`
--
ALTER TABLE `USUARIO`
  ADD CONSTRAINT `fk_usuario_localizacion` FOREIGN KEY (`id_localizacion_default`) REFERENCES `LOCALIZACION` (`id_localizacion`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
