-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: veridis
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `veridis`
--

/*!40000 DROP DATABASE IF EXISTS `veridis`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `veridis` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `veridis`;

--
-- Table structure for table `CONFIG_USUARIO`
--

DROP TABLE IF EXISTS `CONFIG_USUARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CONFIG_USUARIO` (
  `id_configuracion` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int unsigned NOT NULL,
  `tema` enum('claro','oscuro','sistema') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sistema',
  `idioma` enum('es','en','fr','de','pt','it','ca') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'es',
  `notificaciones` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_configuracion`),
  UNIQUE KEY `uq_config_usuario` (`id_usuario`),
  CONSTRAINT `fk_config_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `USUARIO` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CONFIG_USUARIO`
--

LOCK TABLES `CONFIG_USUARIO` WRITE;
/*!40000 ALTER TABLE `CONFIG_USUARIO` DISABLE KEYS */;
INSERT INTO `CONFIG_USUARIO` VALUES (1,2,'oscuro','es',1),(2,3,'sistema','es',1);
/*!40000 ALTER TABLE `CONFIG_USUARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CUESTIONARIO`
--

DROP TABLE IF EXISTS `CUESTIONARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CUESTIONARIO` (
  `id_cuestionario` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario_planta` int unsigned NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `observaciones_usuario` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_cuestionario`),
  KEY `fk_cuestionario_pu` (`id_usuario_planta`),
  CONSTRAINT `fk_cuestionario_pu` FOREIGN KEY (`id_usuario_planta`) REFERENCES `PLANTA_USUARIO` (`id_usuario_planta`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CUESTIONARIO`
--

LOCK TABLES `CUESTIONARIO` WRITE;
/*!40000 ALTER TABLE `CUESTIONARIO` DISABLE KEYS */;
/*!40000 ALTER TABLE `CUESTIONARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FAMILIA_PLANTA`
--

DROP TABLE IF EXISTS `FAMILIA_PLANTA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FAMILIA_PLANTA` (
  `id_familia` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_familia`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FAMILIA_PLANTA`
--

LOCK TABLES `FAMILIA_PLANTA` WRITE;
/*!40000 ALTER TABLE `FAMILIA_PLANTA` DISABLE KEYS */;
INSERT INTO `FAMILIA_PLANTA` VALUES (1,'Araceae','Familia muy común en interior, con especies ornamentales de follaje como Monstera, Epipremnum y Spathiphyllum.'),(2,'Asparagaceae','Familia frecuente en hogares y terrazas, con plantas como Dracaena, Chlorophytum y otras ornamentales resistentes.'),(3,'Moraceae','Familia que incluye ficus y otras especies ornamentales de interior y exterior muy usadas en viviendas.'),(4,'Orchidaceae','Familia de orquídeas, muy popular como planta de interior por su valor ornamental.'),(5,'Polypodiaceae','Familia de helechos en la que se encuadran especies de interior como Nephrolepis.'),(6,'Arecaceae','Familia de palmeras ornamentales de interior y exterior, habituales en casas, patios y terrazas.'),(7,'Euphorbiaceae','Familia diversa con especies ornamentales como Euphorbia pulcherrima y Croton.'),(8,'Marantaceae','Familia de plantas de interior apreciadas por sus hojas decorativas, como Maranta y Calathea.'),(9,'Piperaceae','Familia de plantas compactas de interior como Peperomia, muy útiles en espacios pequeños.'),(10,'Urticaceae','Familia que incluye ornamentales de interior como Pilea peperomioides.'),(11,'Begoniaceae','Familia de begonias, frecuente en interiores luminosos, patios y balcones.'),(12,'Bromeliaceae','Familia de bromelias ornamentales, habitual en interiores bien iluminados.'),(13,'Commelinaceae','Familia con plantas colgantes y de crecimiento rápido como Tradescantia.'),(14,'Gesneriaceae','Familia de ornamentales de flor como Streptocarpus y otras especies de interior.'),(15,'Acanthaceae','Familia con plantas decorativas de follaje o flor como Fittonia e Hypoestes.'),(16,'Zingiberaceae','Familia que incluye jengibre, cúrcuma y algunas especies ornamentales tropicales.'),(17,'Lamiaceae','Familia muy importante en España por sus aromáticas, como lavanda, menta, salvia y romero.'),(18,'Geraniaceae','Familia de geranios y pelargonios, muy típica de balcones y ventanas en España.'),(19,'Crassulaceae','Familia de suculentas muy populares como Crassula, Echeveria y Kalanchoe.'),(20,'Cactaceae','Familia de cactus, muy habitual en colecciones domésticas, alféizares y terrazas soleadas.'),(21,'Asphodelaceae','Familia que incluye Aloe y otras plantas resistentes usadas en interior y exterior.'),(22,'Rutaceae','Familia de cítricos como limonero, mandarino y naranjo, comunes en patios y terrazas.'),(23,'Asteraceae','Familia muy amplia con ornamentales y plantas útiles de jardín y huerto.'),(24,'Apocynaceae','Familia que incluye adelfa, mandevilla, hoya y otras ornamentales de flor o follaje.'),(25,'Plumbaginaceae','Familia con especies ornamentales resistentes al sol y al ambiente costero, como Plumbago.'),(26,'Nyctaginaceae','Familia que incluye la buganvilla, muy frecuente en patios, fachadas y terrazas.'),(27,'Portulacaceae','Familia con portulacas y otras especies aptas para macetas soleadas y secas.'),(28,'Verbenaceae','Familia con plantas ornamentales de balcón y jardín como Verbena y Lantana.'),(29,'Malvaceae','Familia con hibiscos, malvas y otras especies ornamentales habituales en exterior.'),(30,'Bignoniaceae','Familia de trepadoras y arbustos ornamentales como Campsis, Tecoma y otras afines.'),(31,'Passifloraceae','Familia de pasifloras, muy usada como trepadora ornamental y en algunos casos frutal.'),(32,'Oleaceae','Familia que incluye jazmín, olivo y otras especies ornamentales y mediterráneas conocidas.'),(33,'Vitaceae','Familia de la vid y de trepadoras como Parthenocissus, útiles para pérgolas y fachadas.'),(34,'Campanulaceae','Familia con campánulas y otras ornamentales de flor usadas en maceta y jardín.'),(35,'Solanaceae','Familia esencial en huerto urbano, con tomate, pimiento, berenjena y otras especies muy comunes.'),(36,'Brassicaceae','Familia de hortalizas como coles, rábanos y rúcula, frecuente en huertos domésticos.'),(37,'Fabaceae','Familia muy importante en huerto y jardín, con judías, guisantes, habas y otras leguminosas.'),(38,'Amaryllidaceae','Familia que incluye Allium y también bulbosas ornamentales muy conocidas.'),(39,'Apiaceae','Familia de aromáticas y hortalizas como perejil, cilantro, apio y zanahoria.'),(40,'Cucurbitaceae','Familia de huerto con pepino, calabacín, melón, sandía y calabaza.'),(41,'Amaranthaceae','Familia que incluye espinaca, acelga y otras especies útiles para huerto doméstico.'),(42,'Rosaceae','Familia con rosales, fresas y muchos frutales comunes en jardines y terrazas.'),(43,'Liliaceae','Familia de ornamentales bulbosas como Lilium y Tulipa.'),(44,'Iridaceae','Familia de lirios, gladiolos y crocos, frecuente en jardinería doméstica.'),(45,'Caryophyllaceae','Familia de claveles y otras plantas de flor comunes en jardinería.'),(46,'Primulaceae','Familia con ciclámenes, prímulas y otras especies ornamentales de temporada.'),(47,'Ranunculaceae','Familia con anémonas, clemátides y otras ornamentales de flor.'),(48,'Rubiaceae','Familia con gardenia, cafeto y otras especies ornamentales o de colección.'),(49,'Violaceae','Familia de violetas y pensamientos, muy común en macetas y jardineras.'),(50,'Araliaceae','Familia que incluye hiedra y Schefflera, frecuentes en interior y exterior.');
/*!40000 ALTER TABLE `FAMILIA_PLANTA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FOTO_PLANTA`
--

DROP TABLE IF EXISTS `FOTO_PLANTA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FOTO_PLANTA` (
  `id_foto` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario_planta` int unsigned NOT NULL,
  `url_imagen` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_foto`),
  KEY `fk_foto_planta_usuario` (`id_usuario_planta`),
  CONSTRAINT `fk_foto_planta_usuario` FOREIGN KEY (`id_usuario_planta`) REFERENCES `PLANTA_USUARIO` (`id_usuario_planta`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FOTO_PLANTA`
--

LOCK TABLES `FOTO_PLANTA` WRITE;
/*!40000 ALTER TABLE `FOTO_PLANTA` DISABLE KEYS */;
INSERT INTO `FOTO_PLANTA` VALUES (2,2,'/uploads/fotos-plantas/120b5ee0-fedf-4457-9339-1af9dd19d6e3.jpeg','Foto de portada','2026-05-19 14:07:54');
/*!40000 ALTER TABLE `FOTO_PLANTA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HISTORIAL_CUIDADO`
--

DROP TABLE IF EXISTS `HISTORIAL_CUIDADO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HISTORIAL_CUIDADO` (
  `id_historial` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario_planta` int unsigned NOT NULL,
  `tipo_cuidado` enum('riego','abono','poda','trasplante','fumigacion','limpieza','revision','otro') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notas` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_historial`),
  KEY `fk_historial_pu` (`id_usuario_planta`),
  CONSTRAINT `fk_historial_pu` FOREIGN KEY (`id_usuario_planta`) REFERENCES `PLANTA_USUARIO` (`id_usuario_planta`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HISTORIAL_CUIDADO`
--

LOCK TABLES `HISTORIAL_CUIDADO` WRITE;
/*!40000 ALTER TABLE `HISTORIAL_CUIDADO` DISABLE KEYS */;
/*!40000 ALTER TABLE `HISTORIAL_CUIDADO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LOCALIZACION`
--

DROP TABLE IF EXISTS `LOCALIZACION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LOCALIZACION` (
  `id_localizacion` int unsigned NOT NULL AUTO_INCREMENT,
  `ciudad` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `provincia` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pais` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitud` decimal(10,7) NOT NULL,
  `longitud` decimal(10,7) NOT NULL,
  `fecha_actualizacion` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_localizacion`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LOCALIZACION`
--

LOCK TABLES `LOCALIZACION` WRITE;
/*!40000 ALTER TABLE `LOCALIZACION` DISABLE KEYS */;
INSERT INTO `LOCALIZACION` VALUES (1,'Almería','Almería','España',36.8340000,-2.4637000,'2026-05-16 11:48:33'),(2,'Roquetas de Mar','Almería','España',36.7642000,-2.6148000,'2026-05-16 11:48:33'),(3,'El Ejido','Almería','España',36.7763000,-2.8146000,'2026-05-16 11:48:33'),(4,'Cádiz','Cádiz','España',36.5271000,-6.2886000,'2026-05-16 11:48:33'),(5,'Jerez de la Frontera','Cádiz','España',36.6850000,-6.1261000,'2026-05-16 11:48:33'),(6,'Algeciras','Cádiz','España',36.1408000,-5.4562000,'2026-05-16 11:48:33'),(7,'San Fernando','Cádiz','España',36.4640000,-6.1980000,'2026-05-16 11:48:33'),(8,'Chiclana de la Frontera','Cádiz','España',36.4198000,-6.1494000,'2026-05-16 11:48:33'),(9,'Córdoba','Córdoba','España',37.8882000,-4.7794000,'2026-05-16 11:48:33'),(10,'Lucena','Córdoba','España',37.4088000,-4.4852000,'2026-05-16 11:48:33'),(11,'Puente Genil','Córdoba','España',37.3894000,-4.7669000,'2026-05-16 11:48:33'),(12,'Granada','Granada','España',37.1773000,-3.5986000,'2026-05-16 11:48:33'),(13,'Motril','Granada','España',36.7484000,-3.5169000,'2026-05-16 11:48:33'),(14,'Huelva','Huelva','España',37.2614000,-6.9447000,'2026-05-16 11:48:33'),(15,'Jaén','Jaén','España',37.7796000,-3.7849000,'2026-05-16 11:48:33'),(16,'Linares','Jaén','España',38.0952000,-3.6360000,'2026-05-16 11:48:33'),(17,'Úbeda','Jaén','España',38.0133000,-3.3705000,'2026-05-16 11:48:33'),(18,'Málaga','Málaga','España',36.7213000,-4.4214000,'2026-05-16 11:48:33'),(19,'Marbella','Málaga','España',36.5101000,-4.8824000,'2026-05-16 11:48:33'),(20,'Fuengirola','Málaga','España',36.5390000,-4.6244000,'2026-05-16 11:48:33'),(21,'Vélez-Málaga','Málaga','España',36.7811000,-4.1027000,'2026-05-16 11:48:33'),(22,'Estepona','Málaga','España',36.4256000,-5.1510000,'2026-05-16 11:48:33'),(23,'Sevilla','Sevilla','España',37.3891000,-5.9845000,'2026-05-16 11:48:33'),(24,'Dos Hermanas','Sevilla','España',37.2866000,-5.9242000,'2026-05-16 11:48:33'),(25,'Alcalá de Guadaíra','Sevilla','España',37.3379000,-5.8395000,'2026-05-16 11:48:33'),(26,'Utrera','Sevilla','España',37.1852000,-5.7809000,'2026-05-16 11:48:33'),(27,'Huesca','Huesca','España',42.1401000,-0.4089000,'2026-05-16 11:48:33'),(28,'Jaca','Huesca','España',42.5710000,-0.5499000,'2026-05-16 11:48:33'),(29,'Zaragoza','Zaragoza','España',41.6488000,-0.8891000,'2026-05-16 11:48:33'),(30,'Calatayud','Zaragoza','España',41.3535000,-1.6432000,'2026-05-16 11:48:33'),(31,'Teruel','Teruel','España',40.3456000,-1.1065000,'2026-05-16 11:48:33'),(32,'Alcañiz','Teruel','España',41.0500000,-0.1333000,'2026-05-16 11:48:33'),(33,'Oviedo','Asturias','España',43.3619000,-5.8494000,'2026-05-16 11:48:33'),(34,'Gijón','Asturias','España',43.5322000,-5.6611000,'2026-05-16 11:48:33'),(35,'Avilés','Asturias','España',43.5560000,-5.9240000,'2026-05-16 11:48:33'),(36,'Santander','Cantabria','España',43.4623000,-3.8099000,'2026-05-16 11:48:33'),(37,'Torrelavega','Cantabria','España',43.3494000,-4.0479000,'2026-05-16 11:48:33'),(38,'Palma','Illes Balears','España',39.5696000,2.6502000,'2026-05-16 11:48:33'),(39,'Manacor','Illes Balears','España',39.5690000,3.2090000,'2026-05-16 11:48:33'),(40,'Ibiza','Illes Balears','España',38.9067000,1.4206000,'2026-05-16 11:48:33'),(41,'Mahón','Illes Balears','España',39.8890000,4.2658000,'2026-05-16 11:48:33'),(42,'Inca','Illes Balears','España',39.7211000,2.9109000,'2026-05-16 11:48:33'),(43,'Las Palmas de Gran Canaria','Las Palmas','España',28.1235000,-15.4363000,'2026-05-16 11:48:33'),(44,'Telde','Las Palmas','España',27.9955000,-15.4176000,'2026-05-16 11:48:33'),(45,'Arrecife','Las Palmas','España',28.9630000,-13.5477000,'2026-05-16 11:48:33'),(46,'Puerto del Rosario','Las Palmas','España',28.5004000,-13.8627000,'2026-05-16 11:48:33'),(47,'Santa Cruz de Tenerife','Santa Cruz de Tenerife','España',28.4636000,-16.2518000,'2026-05-16 11:48:33'),(48,'San Cristóbal de La Laguna','Santa Cruz de Tenerife','España',28.4874000,-16.3159000,'2026-05-16 11:48:33'),(49,'La Orotava','Santa Cruz de Tenerife','España',28.3908000,-16.5231000,'2026-05-16 11:48:33'),(50,'Puerto de la Cruz','Santa Cruz de Tenerife','España',28.4136000,-16.5480000,'2026-05-16 11:48:33'),(51,'Los Llanos de Aridane','Santa Cruz de Tenerife','España',28.6585000,-17.9182000,'2026-05-16 11:48:33'),(52,'Ávila','Ávila','España',40.6565000,-4.6818000,'2026-05-16 11:48:33'),(53,'Burgos','Burgos','España',42.3439000,-3.6969000,'2026-05-16 11:48:33'),(54,'Aranda de Duero','Burgos','España',41.6705000,-3.6892000,'2026-05-16 11:48:33'),(55,'Miranda de Ebro','Burgos','España',42.6865000,-2.9469000,'2026-05-16 11:48:33'),(56,'León','León','España',42.5987000,-5.5671000,'2026-05-16 11:48:33'),(57,'Ponferrada','León','España',42.5466000,-6.5962000,'2026-05-16 11:48:33'),(58,'Palencia','Palencia','España',42.0097000,-4.5288000,'2026-05-16 11:48:33'),(59,'Salamanca','Salamanca','España',40.9701000,-5.6635000,'2026-05-16 11:48:33'),(60,'Segovia','Segovia','España',40.9429000,-4.1088000,'2026-05-16 11:48:33'),(61,'Soria','Soria','España',41.7636000,-2.4649000,'2026-05-16 11:48:33'),(62,'Valladolid','Valladolid','España',41.6523000,-4.7245000,'2026-05-16 11:48:33'),(63,'Medina del Campo','Valladolid','España',41.3124000,-4.9141000,'2026-05-16 11:48:33'),(64,'Zamora','Zamora','España',41.5035000,-5.7446000,'2026-05-16 11:48:33'),(65,'Albacete','Albacete','España',38.9943000,-1.8585000,'2026-05-16 11:48:33'),(66,'Hellín','Albacete','España',38.5106000,-1.7009000,'2026-05-16 11:48:33'),(67,'Almansa','Albacete','España',38.8694000,-1.0973000,'2026-05-16 11:48:33'),(68,'Ciudad Real','Ciudad Real','España',38.9848000,-3.9274000,'2026-05-16 11:48:33'),(69,'Puertollano','Ciudad Real','España',38.6871000,-4.1073000,'2026-05-16 11:48:33'),(70,'Alcázar de San Juan','Ciudad Real','España',39.3901000,-3.2083000,'2026-05-16 11:48:33'),(71,'Cuenca','Cuenca','España',40.0704000,-2.1374000,'2026-05-16 11:48:33'),(72,'Guadalajara','Guadalajara','España',40.6325000,-3.1602000,'2026-05-16 11:48:33'),(73,'Toledo','Toledo','España',39.8628000,-4.0273000,'2026-05-16 11:48:33'),(74,'Talavera de la Reina','Toledo','España',39.9635000,-4.8308000,'2026-05-16 11:48:33'),(75,'Barcelona','Barcelona','España',41.3874000,2.1686000,'2026-05-16 11:48:33'),(76,'L\'Hospitalet de Llobregat','Barcelona','España',41.3662000,2.1165000,'2026-05-16 11:48:33'),(77,'Badalona','Barcelona','España',41.4500000,2.2474000,'2026-05-16 11:48:33'),(78,'Terrassa','Barcelona','España',41.5632000,2.0089000,'2026-05-16 11:48:33'),(79,'Sabadell','Barcelona','España',41.5463000,2.1086000,'2026-05-16 11:48:33'),(80,'Mataró','Barcelona','España',41.5381000,2.4445000,'2026-05-16 11:48:33'),(81,'Manresa','Barcelona','España',41.7282000,1.8233000,'2026-05-16 11:48:33'),(82,'Vic','Barcelona','España',41.9301000,2.2549000,'2026-05-16 11:48:33'),(83,'Girona','Girona','España',41.9794000,2.8214000,'2026-05-16 11:48:33'),(84,'Figueres','Girona','España',42.2675000,2.9608000,'2026-05-16 11:48:33'),(85,'Lleida','Lleida','España',41.6176000,0.6200000,'2026-05-16 11:48:33'),(86,'Tarragona','Tarragona','España',41.1189000,1.2445000,'2026-05-16 11:48:33'),(87,'Reus','Tarragona','España',41.1548000,1.1087000,'2026-05-16 11:48:33'),(88,'Tortosa','Tarragona','España',40.8125000,0.5214000,'2026-05-16 11:48:33'),(89,'Valencia','Valencia','España',39.4699000,-0.3763000,'2026-05-16 11:48:33'),(90,'Torrent','Valencia','España',39.4370000,-0.4655000,'2026-05-16 11:48:33'),(91,'Gandia','Valencia','España',38.9680000,-0.1840000,'2026-05-16 11:48:33'),(92,'Sagunto','Valencia','España',39.6833000,-0.2667000,'2026-05-16 11:48:33'),(93,'Castellón de la Plana','Castellón','España',39.9864000,-0.0513000,'2026-05-16 11:48:33'),(94,'Vila-real','Castellón','España',39.9383000,-0.1009000,'2026-05-16 11:48:33'),(95,'Alicante','Alicante','España',38.3452000,-0.4810000,'2026-05-16 11:48:33'),(96,'Elche','Alicante','España',38.2699000,-0.7126000,'2026-05-16 11:48:33'),(97,'Torrevieja','Alicante','España',37.9787000,-0.6822000,'2026-05-16 11:48:33'),(98,'Benidorm','Alicante','España',38.5411000,-0.1225000,'2026-05-16 11:48:33'),(99,'Orihuela','Alicante','España',38.0848000,-0.9440000,'2026-05-16 11:48:33'),(100,'Alcoy','Alicante','España',38.6987000,-0.4743000,'2026-05-16 11:48:33'),(101,'Badajoz','Badajoz','España',38.8794000,-6.9707000,'2026-05-16 11:48:33'),(102,'Mérida','Badajoz','España',38.9161000,-6.3437000,'2026-05-16 11:48:33'),(103,'Don Benito','Badajoz','España',38.9563000,-5.8616000,'2026-05-16 11:48:33'),(104,'Almendralejo','Badajoz','España',38.6832000,-6.4075000,'2026-05-16 11:48:33'),(105,'Cáceres','Cáceres','España',39.4753000,-6.3724000,'2026-05-16 11:48:33'),(106,'Plasencia','Cáceres','España',40.0312000,-6.0885000,'2026-05-16 11:48:33'),(107,'A Coruña','A Coruña','España',43.3623000,-8.4115000,'2026-05-16 11:48:33'),(108,'Santiago de Compostela','A Coruña','España',42.8782000,-8.5448000,'2026-05-16 11:48:33'),(109,'Ferrol','A Coruña','España',43.4896000,-8.2193000,'2026-05-16 11:48:33'),(110,'Lugo','Lugo','España',43.0097000,-7.5560000,'2026-05-16 11:48:33'),(111,'Ourense','Ourense','España',42.3358000,-7.8639000,'2026-05-16 11:48:33'),(112,'Pontevedra','Pontevedra','España',42.4336000,-8.6481000,'2026-05-16 11:48:33'),(113,'Vigo','Pontevedra','España',42.2406000,-8.7207000,'2026-05-16 11:48:33'),(114,'Logroño','La Rioja','España',42.4627000,-2.4449000,'2026-05-16 11:48:33'),(115,'Calahorra','La Rioja','España',42.3058000,-1.9652000,'2026-05-16 11:48:33'),(116,'Pamplona','Navarra','España',42.8125000,-1.6458000,'2026-05-16 11:48:33'),(117,'Tudela','Navarra','España',42.0617000,-1.6045000,'2026-05-16 11:48:33'),(118,'Bilbao','Bizkaia','España',43.2630000,-2.9350000,'2026-05-16 11:48:33'),(119,'Barakaldo','Bizkaia','España',43.2969000,-2.9884000,'2026-05-16 11:48:33'),(120,'Getxo','Bizkaia','España',43.3446000,-3.0066000,'2026-05-16 11:48:33'),(121,'San Sebastián','Gipuzkoa','España',43.3183000,-1.9812000,'2026-05-16 11:48:33'),(122,'Irún','Gipuzkoa','España',43.3382000,-1.7894000,'2026-05-16 11:48:33'),(123,'Vitoria-Gasteiz','Álava','España',42.8467000,-2.6727000,'2026-05-16 11:48:33'),(124,'Madrid','Madrid','España',40.4168000,-3.7038000,'2026-05-16 11:48:33'),(125,'Móstoles','Madrid','España',40.3223000,-3.8649000,'2026-05-16 11:48:33'),(126,'Alcalá de Henares','Madrid','España',40.4819000,-3.3635000,'2026-05-16 11:48:33'),(127,'Fuenlabrada','Madrid','España',40.2902000,-3.8035000,'2026-05-16 11:48:33'),(128,'Leganés','Madrid','España',40.3319000,-3.7687000,'2026-05-16 11:48:33'),(129,'Getafe','Madrid','España',40.3083000,-3.7326000,'2026-05-16 11:48:33'),(130,'Alcorcón','Madrid','España',40.3468000,-3.8278000,'2026-05-16 11:48:33'),(131,'Torrejón de Ardoz','Madrid','España',40.4568000,-3.4755000,'2026-05-16 11:48:33'),(132,'Alcobendas','Madrid','España',40.5373000,-3.6372000,'2026-05-16 11:48:33'),(133,'Murcia','Murcia','España',37.9922000,-1.1307000,'2026-05-16 11:48:33'),(134,'Cartagena','Murcia','España',37.6257000,-0.9966000,'2026-05-16 11:48:33'),(135,'Lorca','Murcia','España',37.6712000,-1.7017000,'2026-05-16 11:48:33'),(136,'Molina de Segura','Murcia','España',38.0546000,-1.2076000,'2026-05-16 11:48:33'),(137,'Ceuta','Ceuta','España',35.8894000,-5.3213000,'2026-05-16 11:48:33'),(138,'Melilla','Melilla','España',35.2923000,-2.9381000,'2026-05-16 11:48:33');
/*!40000 ALTER TABLE `LOCALIZACION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PLANTA`
--

DROP TABLE IF EXISTS `PLANTA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PLANTA` (
  `id_planta` int unsigned NOT NULL AUTO_INCREMENT,
  `id_familia` int unsigned DEFAULT NULL,
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
  `frecuencia_riego` tinyint unsigned DEFAULT NULL COMMENT 'Días entre riegos recomendados',
  `frecuencia_abono` tinyint unsigned DEFAULT NULL COMMENT 'Días entre abonados recomendados',
  PRIMARY KEY (`id_planta`),
  KEY `fk_planta_familia` (`id_familia`),
  CONSTRAINT `fk_planta_familia` FOREIGN KEY (`id_familia`) REFERENCES `FAMILIA_PLANTA` (`id_familia`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PLANTA`
--

LOCK TABLES `PLANTA` WRITE;
/*!40000 ALTER TABLE `PLANTA` DISABLE KEYS */;
INSERT INTO `PLANTA` VALUES (1,1,'Poto','Epipremnum aureum','interior','Planta trepadora de interior muy resistente y popular.','/uploads/Potos.png',1,'luz_indirecta','media',15.00,30.00,'baja',7,30),(2,1,'Costilla de Adán','Monstera deliciosa','interior','Planta tropical de interior muy usada por sus hojas grandes y recortadas.','/uploads/Monstera_Deliciosa.png',1,'luz_indirecta','media',16.00,30.00,'baja',7,30),(3,1,'Espatifilo','Spathiphyllum wallisii','interior','Planta de interior apreciada por su follaje brillante y sus espatas blancas.','/uploads/Espatifilo.png',0,'sombra_parcial','alta',15.00,28.00,'baja',5,30),(4,2,'Sansevieria','Dracaena trifasciata','suculenta','Suculenta muy resistente, ideal para interiores luminosos y riego espaciado.','/uploads/Sansevieria.png',1,'luz_indirecta','baja',10.00,32.00,'media',14,45),(5,2,'Tronco de Brasil','Dracaena fragrans','interior','Planta de interior de bajo mantenimiento con hojas largas y arqueadas.','/uploads/Tronco_Brasil.png',1,'luz_indirecta','media',15.00,30.00,'baja',10,30),(6,3,'Ficus elástica','Ficus elastica','interior','Árbol de interior muy popular por sus hojas grandes, oscuras y brillantes.','/uploads/Ficus_Elastica.png',1,'luz_indirecta','media',15.00,30.00,'media',10,30),(7,3,'Ficus benjamina','Ficus benjamina','interior','Ficus de interior con porte elegante y ramas colgantes.','/uploads/Ficus_Benjamina.png',1,'luz_indirecta','media',15.00,30.00,'media',7,30),(8,5,'Helecho de Boston','Nephrolepis exaltata','interior','Helecho de interior que prefiere humedad alta y luz suave.','/uploads/Helecho_Boston.png',1,'sombra_parcial','alta',15.00,28.00,'baja',4,30),(9,9,'Peperomia','Peperomia obtusifolia','interior','Planta compacta de interior con hojas carnosas y cuidados sencillos.','/uploads/Peperomia.png',0,'luz_indirecta','media',15.00,28.00,'baja',10,45),(10,10,'Pilea','Pilea peperomioides','interior','Planta de interior muy conocida por sus hojas redondas en forma de moneda.','/uploads/Pilea.png',0,'luz_indirecta','media',12.00,28.00,'baja',7,30),(11,21,'Aloe vera','Aloe vera','suculenta','Suculenta muy habitual en casa, valorada por su resistencia y por el gel de sus hojas.','/uploads/Aloe_Vera.png',1,'luz_directa','baja',10.00,32.00,'alta',14,45),(12,19,'Árbol de jade','Crassula ovata','suculenta','Suculenta de crecimiento lento y muy usada en interior luminoso y terrazas.','/uploads/Arbol_Jade.png',1,'luz_directa','baja',10.00,30.00,'alta',14,30),(13,19,'Echeveria','Echeveria elegans','suculenta','Suculenta en roseta muy común en colecciones y arreglos de maceta.','/uploads/Echeveria_Elegans.png',1,'luz_directa','baja',8.00,30.00,'alta',12,45),(14,19,'Kalanchoe','Kalanchoe blossfeldiana','suculenta','Suculenta ornamental muy vendida por su floración abundante y duradera.','/uploads/Kalanchoe.png',1,'luz_directa','baja',12.00,28.00,'media',10,30),(15,20,'Cactus de Navidad','Schlumbergera truncata','suculenta','Cactus epífito muy cultivado en interior por su floración de invierno.','/uploads/Cactus_Navidad.png',1,'luz_indirecta','media',12.00,26.00,'baja',7,30),(16,17,'Lavanda','Lavandula angustifolia','aromatica','Aromática mediterránea muy usada en maceta, jardín y balcones soleados.','/uploads/Lavanda.png',1,'luz_directa','baja',5.00,32.00,'alta',7,60),(17,17,'Hierbabuena','Mentha spicata','aromatica','Aromática muy común en cocina y maceta, con crecimiento rápido y vigoroso.','/uploads/Hierbabuena.png',1,'sombra_parcial','media',5.00,28.00,'media',4,30),(18,17,'Romero','Salvia rosmarinus','aromatica','Aromática leñosa muy típica del clima mediterráneo y del cultivo en terraza.','/uploads/Romero.png',1,'luz_directa','baja',5.00,32.00,'alta',7,45),(19,17,'Albahaca','Ocimum basilicum','aromatica','Aromática culinaria muy usada en primavera y verano, ideal para maceta.','/uploads/Albahaca.png',1,'luz_directa','media',12.00,32.00,'media',3,21),(20,39,'Perejil','Petroselinum crispum','aromatica','Hierba culinaria muy habitual en huerto urbano, maceta y jardineras.','/uploads/Perejil.png',1,'sombra_parcial','media',5.00,28.00,'media',4,30),(21,18,'Gitanilla','Pelargonium peltatum','exterior','Planta colgante de balcón muy típica en España por su floración prolongada.','/uploads/Gitanilla.png',1,'luz_directa','baja',8.00,30.00,'alta',5,21),(22,29,'Hibisco','Hibiscus × rosa-sinensis','exterior','Arbusto ornamental muy valorado por sus flores grandes y vistosas.','/uploads/Hibisco.png',1,'luz_directa','media',12.00,32.00,'media',4,21),(23,35,'Petunia','Petunia × atkinsiana','exterior','Planta de flor muy común en jardineras y balcones soleados.','/uploads/Petunias.png',1,'luz_directa','media',8.00,30.00,'alta',3,15),(24,48,'Gardenia','Gardenia jasminoides','exterior','Arbusto ornamental de flor perfumada que agradece ambientes húmedos y sustrato ácido.','/uploads/Gardenias.png',1,'sombra_parcial','alta',10.00,28.00,'media',5,30),(25,13,'Tradescantia zebrina','Tradescantia zebrina','interior','Planta colgante muy usada por sus hojas verdes y plateadas con envés púrpura.','/uploads/Tradescantia_Zebrina.png',1,'luz_indirecta','media',10.00,30.00,'media',7,30),(26,26,'Buganvilla','Bougainvillea glabra','trepadora','Trepadora muy habitual en patios y fachadas por sus brácteas de color intenso.','/uploads/Buganvilla.png',1,'luz_directa','baja',10.00,35.00,'alta',5,21),(27,31,'Pasionaria','Passiflora caerulea','trepadora','Trepadora vigorosa de flor muy llamativa, útil para pérgolas y celosías.','/uploads/Pasionaria.png',1,'luz_directa','media',5.00,30.00,'media',5,30),(28,22,'Limonero','Citrus × limon','frutal','Frutal muy común en patios y terrazas soleadas, apto para macetón.','/uploads/Limonero.png',1,'luz_directa','media',5.00,32.00,'alta',5,30),(29,42,'Fresa','Fragaria × ananassa','frutal','Planta frutal muy usada en macetas, mesas de cultivo y jardineras.','/uploads/Fresas.png',1,'luz_directa','media',0.00,28.00,'alta',3,21),(30,33,'Vid','Vitis vinifera','frutal','Trepadora frutal clásica, muy útil para pérgolas y cultivo doméstico en exterior.','/uploads/Vid.png',1,'luz_directa','media',0.00,32.00,'alta',5,30),(31,2,'Cinta','Chlorophytum comosum','interior','Planta de interior muy resistente, ideal para estanterías y macetas colgantes.','/uploads/Cinta.png',1,'luz_indirecta','media',10.00,30.00,'media',7,30),(32,6,'Palmera de salón','Chamaedorea elegans','interior','Palmera compacta de interior muy usada por su porte elegante y fácil mantenimiento.','/uploads/Palmera_Salon.png',0,'sombra_parcial','media',14.00,28.00,'baja',6,30),(33,6,'Areca','Chrysalidocarpus lutescens','interior','Palmera ornamental muy popular en interiores luminosos y espacios amplios.','/uploads/Areca.png',1,'luz_indirecta','media',15.00,30.00,'media',5,30),(34,4,'Orquídea mariposa','Phalaenopsis aphrodite','interior','Orquídea de interior muy apreciada por su floración elegante y duradera.','/uploads/Orquidea_Mariposa.png',0,'luz_indirecta','alta',18.00,28.00,'baja',7,30),(35,12,'Guzmania','Guzmania lingulata','interior','Bromelia de interior con roseta decorativa y brácteas de color intenso.','/uploads/Guzmania.png',0,'luz_indirecta','alta',16.00,28.00,'baja',6,30),(36,15,'Fitonia','Fittonia albivenis','interior','Planta pequeña de interior muy decorativa por el dibujo de sus nervaduras.','/uploads/Fitonia.png',0,'sombra_parcial','alta',16.00,26.00,'baja',4,30),(37,8,'Maranta','Maranta leuconeura','interior','Planta de interior muy conocida por sus hojas ornamentales y su hábito compacto.','/uploads/Maranta.png',0,'sombra_parcial','alta',16.00,28.00,'baja',5,30),(38,50,'Cheflera','Heptapleurum arboricola','interior','Planta de interior muy usada por su follaje palmeado y fácil adaptación.','/uploads/Cheflera.png',1,'luz_indirecta','media',15.00,30.00,'media',7,30),(39,48,'Cafeto','Coffea arabica','interior','Arbusto de interior luminoso muy valorado por su follaje brillante.','/uploads/Cafeto.png',1,'luz_indirecta','media',15.00,28.00,'baja',6,30),(40,7,'Flor de Pascua','Euphorbia pulcherrima','interior','Planta ornamental muy popular en invierno por sus brácteas rojas.','/uploads/Flor_Pascua.png',1,'luz_indirecta','media',15.00,28.00,'baja',5,30),(41,7,'Crotón','Codiaeum variegatum','interior','Planta de interior muy llamativa por el color variado de sus hojas.','/uploads/Crot??n.png',0,'luz_indirecta','media',18.00,30.00,'baja',6,30),(42,14,'Violeta africana','Streptocarpus ionanthus','interior','Planta de interior compacta, muy apreciada por su floración abundante.','/uploads/Violeta Africana.png',0,'luz_indirecta','alta',16.00,26.00,'baja',5,30),(43,50,'Hiedra','Hedera helix','trepadora','Trepadora muy común en exterior y patios, útil para cubrir muros y celosías.','/uploads/Hiedra.png',1,'sombra_parcial','media',0.00,28.00,'media',6,45),(44,25,'Celestina','Plumbago auriculata','trepadora','Arbusto trepador muy florífero, ideal para sol y terrazas cálidas.','/uploads/Plumbago.png',1,'luz_directa','media',8.00,32.00,'alta',5,30),(45,45,'Clavel','Dianthus caryophyllus','exterior','Planta de flor muy tradicional en España, apta para maceta y balcón.','/uploads/Clavel.png',1,'luz_directa','baja',0.00,30.00,'alta',4,21),(46,46,'Prímula','Primula vulgaris','exterior','Planta de flor muy usada en otoño e invierno en macetas y jardineras.','/uploads/Primula.png',1,'sombra_parcial','media',0.00,22.00,'baja',4,21),(47,35,'Tomate','Solanum lycopersicum','otro','Hortaliza muy común en huerto urbano y maceta grande con mucho sol.','/uploads/Tomate.png',1,'luz_directa','media',12.00,32.00,'alta',3,15),(48,35,'Pimiento','Capsicum annuum','otro','Hortaliza de verano muy cultivada en huerto urbano y terrazas soleadas.','/uploads/Pimiento.png',1,'luz_directa','media',12.00,32.00,'alta',3,15),(49,40,'Pepino','Cucumis sativus','otro','Hortaliza trepadora muy frecuente en huerto urbano durante la temporada cálida.','/uploads/Pepino.png',1,'luz_directa','media',14.00,32.00,'alta',2,15),(50,37,'Judía verde','Phaseolus vulgaris','otro','Leguminosa muy común en huerto urbano y cultivo de temporada.','/uploads/Judias_Verdes.png',1,'luz_directa','media',12.00,30.00,'alta',3,21),(51,38,'Cebolla','Allium cepa','otro','Hortaliza bulbosa muy habitual en huerto doméstico y macetas profundas.','/uploads/Cebolla.png',1,'luz_directa','baja',5.00,30.00,'alta',5,30),(52,41,'Espinaca','Spinacia oleracea','otro','Hortaliza de hoja muy usada en huerto urbano, especialmente en épocas frescas.','/uploads/Espinaca.png',1,'sombra_parcial','media',2.00,24.00,'media',3,21),(53,11,'Begonia rex','Begonia rex','interior','Begonia de interior muy apreciada por el color y la textura de sus hojas.','/uploads/Begonia_Rex.png',1,'luz_indirecta','alta',16.00,28.00,'baja',5,30),(54,16,'Jengibre','Zingiber officinale','aromatica','Planta aromática y culinaria cultivable en maceta en ambientes cálidos y protegidos.','/uploads/Jengibre.png',1,'sombra_parcial','alta',18.00,32.00,'baja',5,30),(55,24,'Hoya carnosa','Hoya carnosa','trepadora','Trepadora de interior muy popular por sus hojas gruesas y sus flores cerosas.','/uploads/Hoya_Carnosa.png',1,'luz_indirecta','media',15.00,30.00,'media',10,45),(56,23,'Gerbera','Gerbera jamesonii','exterior','Planta ornamental de flor muy común en maceta y jardineras luminosas.','/uploads/Gerbera.png',1,'luz_directa','media',8.00,28.00,'media',4,21),(57,27,'Verdolaga de flor','Portulaca grandiflora','exterior','Planta de flor muy resistente al sol, ideal para macetas secas y balcones cálidos.','/uploads/Verdolaga_Flor.png',1,'luz_directa','baja',10.00,32.00,'alta',4,30),(58,28,'Lantana','Lantana camara','exterior','Arbusto ornamental muy florífero, apto para terrazas y balcones soleados.','/uploads/Lantana.png',1,'luz_directa','baja',8.00,35.00,'alta',5,30),(59,30,'Bignonia roja','Campsis radicans','trepadora','Trepadora vigorosa de exterior muy útil para cubrir pérgolas y celosías.','/uploads/Bignonia_Roja.png',1,'luz_directa','media',-5.00,35.00,'alta',7,45),(60,34,'Campánula colgante','Campanula isophylla','exterior','Planta de flor muy usada en cestas y macetas de exterior luminoso.','/uploads/Campanula_Colgante.png',1,'sombra_parcial','media',5.00,24.00,'baja',4,21),(61,36,'Col','Brassica oleracea','otro','Hortaliza muy común en huerto doméstico y cultivo de temporada fresca.','/uploads/Col.png',1,'luz_directa','media',2.00,24.00,'media',3,15),(62,43,'Azucena','Lilium candidum','exterior','Bulbosa ornamental clásica, muy apreciada por sus flores grandes y perfumadas.','/uploads/Azucena.png',1,'luz_directa','media',0.00,28.00,'media',5,30),(63,44,'Lirio florentino','Iris florentina','exterior','Lirio ornamental de exterior muy adecuado para macetas grandes y jardines soleados.','/uploads/Lirio_Florentino.png',1,'luz_directa','media',0.00,30.00,'alta',7,30),(64,47,'Ranúnculo','Ranunculus asiaticus','exterior','Planta bulbosa de flor muy usada en macetas y composiciones de temporada.','/uploads/Ranunculo.png',1,'luz_directa','media',5.00,24.00,'media',4,21),(65,49,'Violeta olorosa','Viola odorata','exterior','Planta pequeña de flor, muy útil para macetas de sombra y ambientes frescos.','/uploads/Violeta.png',1,'sombra_parcial','media',0.00,22.00,'baja',4,21),(79,32,'Jazmín','Jasminum officinale','trepadora','Trepadora muy apreciada por su floración blanca y su aroma intenso.','/uploads/Jazmin.png',1,'luz_directa','media',5.00,32.00,'media',5,30);
/*!40000 ALTER TABLE `PLANTA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PLANTA_USUARIO`
--

DROP TABLE IF EXISTS `PLANTA_USUARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PLANTA_USUARIO` (
  `id_usuario_planta` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int unsigned NOT NULL,
  `id_planta` int unsigned NOT NULL,
  `id_ubicacion` int unsigned DEFAULT NULL,
  `nombre_personalizado` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notas` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `fecha_adquisicion` date DEFAULT NULL,
  `estado_salud` enum('excelente','bueno','regular','malo','critico') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'bueno',
  PRIMARY KEY (`id_usuario_planta`),
  KEY `fk_pu_usuario` (`id_usuario`),
  KEY `fk_pu_planta` (`id_planta`),
  KEY `fk_pu_ubicacion` (`id_ubicacion`),
  CONSTRAINT `fk_pu_planta` FOREIGN KEY (`id_planta`) REFERENCES `PLANTA` (`id_planta`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_pu_ubicacion` FOREIGN KEY (`id_ubicacion`) REFERENCES `UBICACION` (`id_ubicacion`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_pu_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `USUARIO` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PLANTA_USUARIO`
--

LOCK TABLES `PLANTA_USUARIO` WRITE;
/*!40000 ALTER TABLE `PLANTA_USUARIO` DISABLE KEYS */;
INSERT INTO `PLANTA_USUARIO` VALUES (2,2,1,1,'Mi poto','Está en el salón','2026-05-16','bueno'),(4,3,1,3,NULL,NULL,'2026-05-16','bueno');
/*!40000 ALTER TABLE `PLANTA_USUARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RECOMENDACION_SINTOMA`
--

DROP TABLE IF EXISTS `RECOMENDACION_SINTOMA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RECOMENDACION_SINTOMA` (
  `id_recomendacion` int unsigned NOT NULL AUTO_INCREMENT,
  `id_sintoma` int unsigned NOT NULL,
  `id_planta` int unsigned DEFAULT NULL COMMENT 'NULL = recomendación genérica para cualquier planta',
  `posible_causa` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `recomendacion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `observaciones` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `prioridad` enum('baja','media','alta','urgente') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'media',
  PRIMARY KEY (`id_recomendacion`),
  KEY `fk_rec_sintoma` (`id_sintoma`),
  KEY `fk_rec_planta` (`id_planta`),
  CONSTRAINT `fk_rec_planta` FOREIGN KEY (`id_planta`) REFERENCES `PLANTA` (`id_planta`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_rec_sintoma` FOREIGN KEY (`id_sintoma`) REFERENCES `SINTOMA` (`id_sintoma`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RECOMENDACION_SINTOMA`
--

LOCK TABLES `RECOMENDACION_SINTOMA` WRITE;
/*!40000 ALTER TABLE `RECOMENDACION_SINTOMA` DISABLE KEYS */;
INSERT INTO `RECOMENDACION_SINTOMA` VALUES (1,1,NULL,'Exceso de riego, falta de nutrientes, poca luz o envejecimiento natural de hojas antiguas.','Revisa la humedad del sustrato antes de volver a regar y comprueba si la planta recibe la luz adecuada.','Si afecta a muchas hojas nuevas, revisa también raíces y abonado.','media'),(2,2,NULL,'Ambiente seco, riego irregular, exceso de sales o uso de agua muy dura.','Aumenta ligeramente la humedad ambiental y riega de forma más regular sin encharcar.','También puede ayudar retirar hojas muy dañadas y evitar exceso de abono.','baja'),(3,3,NULL,'Exceso de sol directo, calor intenso, falta de agua o exceso de fertilizante.','Mueve la planta a una zona con luz más filtrada y revisa si el sustrato se seca demasiado rápido.','No abones hasta que la planta se recupere.','media'),(4,4,NULL,'Quemadura solar, exceso de humedad, hongos o daño físico en las hojas.','Retira las hojas muy afectadas y revisa si la planta está recibiendo demasiado sol o demasiada agua.','Si las manchas se expanden rápido, separa la planta del resto.','media'),(5,5,NULL,'Deficiencia nutricional, plagas pequeñas o riego irregular.','Revisa el envés de las hojas y aplica un abonado suave si la planta está en época de crecimiento.','Si las manchas forman patrones irregulares, revisa presencia de plagas.','media'),(6,6,NULL,'Falta de agua, exceso de agua, calor, frío o cambio brusco de ubicación.','Comprueba la humedad real del sustrato antes de actuar y evita mover la planta repetidamente.','El mismo síntoma puede aparecer tanto por sed como por raíces dañadas.','media'),(7,7,NULL,'Estrés por cambio de ubicación, corrientes de aire, falta de luz, exceso de riego o frío.','Mantén la planta en una ubicación estable y revisa riego, luz y temperatura.','Si la caída es repentina y abundante, revisa raíces y posibles cambios recientes.','media'),(8,8,NULL,'Exceso de riego, frío o inicio de pudrición en tejidos blandos.','Reduce el riego y comprueba que la maceta tenga buen drenaje.','Si las hojas están blandas y oscuras, revisa raíces cuanto antes.','alta'),(9,9,NULL,'Falta de agua prolongada, baja humedad ambiental o raíces dañadas.','Riega a fondo si el sustrato está seco y revisa si la planta recupera firmeza en las horas siguientes.','Si no mejora tras regar, puede haber daño en raíces.','media'),(10,10,NULL,'Estrés hídrico, exceso de calor, baja humedad o presencia de plagas.','Revisa la humedad del sustrato y observa bien el envés de las hojas.','Si hay insectos o manchas, trata primero la posible plaga.','media'),(11,11,NULL,'Falta de luz, falta de nutrientes o crecimiento débil.','Coloca la planta en una zona más luminosa y abona suavemente en época de crecimiento.','Evita sol directo fuerte si la planta es de interior sensible.','baja'),(12,12,NULL,'Poca luz, temperatura baja, falta de nutrientes, maceta pequeña o reposo estacional.','Revisa luz, temperatura y espacio de raíces antes de aumentar el abonado.','En invierno muchas plantas reducen su crecimiento de forma natural.','baja'),(13,13,NULL,'Falta de agua, exceso de agua, calor extremo o raíces dañadas.','Comprueba el sustrato y actúa según esté seco o demasiado húmedo.','Si está húmedo y la planta sigue marchita, sospecha problemas de raíz.','alta'),(14,14,NULL,'Pudrición por exceso de agua, baja ventilación o infección en la base de la planta.','Retira partes dañadas y revisa raíces y drenaje cuanto antes.','Es uno de los síntomas más graves porque puede avanzar rápido.','alta'),(15,15,NULL,'Pudrición, daño por frío o infección en tallos.','Corta la parte dañada si es posible y reduce el riego hasta comprobar el estado de la planta.','Si el ennegrecimiento avanza, separa la planta del resto.','alta'),(16,16,NULL,'Exceso de riego continuado, sustrato compactado o falta de drenaje.','Saca la planta de la maceta, elimina raíces podridas y replanta en sustrato aireado.','Reduce el riego después del trasplante y usa una maceta con drenaje.','alta'),(17,17,NULL,'Exceso de humedad en superficie, poca ventilación o restos orgánicos en el sustrato.','Retira la capa afectada, deja secar un poco más entre riegos y mejora la ventilación.','No suele ser grave si la planta está sana, pero indica exceso de humedad.','baja'),(18,18,NULL,'Falta de riego, sustrato hidrofóbico o maceta demasiado expuesta al calor.','Riega lentamente hasta que el sustrato vuelva a hidratarse y evita que se separe de la maceta.','En sustratos muy secos puede ser útil regar por inmersión unos minutos.','media'),(19,19,NULL,'Agua estancada, raíces podridas o sustrato en descomposición.','Revisa raíces y cambia el sustrato si el olor persiste.','Conviene actuar rápido porque suele indicar falta de oxígeno en raíces.','alta'),(20,20,NULL,'Presencia de insectos, ácaros, larvas u otra plaga sobre la planta.','Aísla la planta, identifica la plaga y aplica limpieza o tratamiento adecuado.','Revisa también plantas cercanas por posible contagio.','alta'),(21,21,NULL,'Araña roja favorecida por ambiente seco y cálido.','Aísla la planta, limpia las hojas y aumenta ligeramente la humedad ambiental.','Si la plaga continúa, aplica tratamiento específico para ácaros.','alta'),(22,22,NULL,'Cochinilla algodonosa localizada en tallos, nudos o envés de hojas.','Retira manualmente los focos visibles y aplica tratamiento específico si reaparece.','Revisa uniones de tallos y zonas ocultas.','alta'),(23,23,NULL,'Pulgón u otros insectos chupadores en brotes tiernos.','Lava la zona afectada y aplica tratamiento suave o específico según la intensidad.','Suelen concentrarse en brotes nuevos y flores.','media'),(24,24,NULL,'Orugas, caracoles, babosas u otros insectos masticadores.','Revisa hojas por ambos lados y retira manualmente los organismos visibles.','En exterior es frecuente tras riegos, lluvia o humedad nocturna.','media'),(25,25,NULL,'Melaza producida por pulgón, cochinilla, mosca blanca u otros insectos chupadores.','Limpia las hojas y busca plagas en el envés y en brotes nuevos.','La sustancia pegajosa puede favorecer la aparición de negrilla.','alta'),(26,26,NULL,'Falta de luz, abonado incorrecto, poda inadecuada o planta fuera de temporada.','Aumenta la luz si la especie lo permite y usa abonado equilibrado en época de crecimiento.','Comprueba también si la planta necesita frío, descanso o más madurez para florecer.','baja'),(27,27,NULL,'Calor excesivo, falta de agua, corrientes de aire o final natural de la flor.','Mantén riego regular y evita sol fuerte durante las horas más duras.','Si solo afecta a flores antiguas, puede ser parte del ciclo normal.','baja'),(28,28,NULL,'Plagas en brotes nuevos, falta de nutrientes, estrés ambiental o daño previo.','Revisa los brotes jóvenes y el envés de las hojas para descartar plagas.','Si todos los brotes salen deformes, conviene aislar la planta y observar evolución.','media'),(29,29,NULL,'Oídio u otro hongo superficial favorecido por humedad ambiental y poca ventilación.','Retira hojas afectadas, mejora la ventilación y evita mojar las hojas al regar.','Si se extiende rápido, aplica tratamiento antifúngico adecuado.','alta'),(30,30,NULL,'Exposición irregular al sol, plagas, carencias nutricionales o daño en tejido foliar.','Revisa luz, plagas y patrón de decoloración antes de aplicar tratamiento.','Si la decoloración aumenta, compara hojas nuevas y antiguas para detectar el origen.','media');
/*!40000 ALTER TABLE `RECOMENDACION_SINTOMA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RECORDATORIO`
--

DROP TABLE IF EXISTS `RECORDATORIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RECORDATORIO` (
  `id_recordatorio` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario_planta` int unsigned NOT NULL,
  `tipo` enum('riego','abono','poda','trasplante','fumigacion','revision','otro') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `frecuencia` tinyint unsigned NOT NULL DEFAULT '7' COMMENT 'Frecuencia en días',
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `fecha_proximo` date DEFAULT NULL,
  `notification_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_recordatorio`),
  KEY `fk_recordatorio_pu` (`id_usuario_planta`),
  CONSTRAINT `fk_recordatorio_pu` FOREIGN KEY (`id_usuario_planta`) REFERENCES `PLANTA_USUARIO` (`id_usuario_planta`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RECORDATORIO`
--

LOCK TABLES `RECORDATORIO` WRITE;
/*!40000 ALTER TABLE `RECORDATORIO` DISABLE KEYS */;
INSERT INTO `RECORDATORIO` VALUES (1,2,'riego',7,1,'2026-05-23','notif-001');
/*!40000 ALTER TABLE `RECORDATORIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RESPUESTA_CUESTIONARIO`
--

DROP TABLE IF EXISTS `RESPUESTA_CUESTIONARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RESPUESTA_CUESTIONARIO` (
  `id_respuesta` int unsigned NOT NULL AUTO_INCREMENT,
  `id_cuestionario` int unsigned NOT NULL,
  `id_sintoma` int unsigned DEFAULT NULL COMMENT 'Síntoma detectado a partir de la respuesta',
  PRIMARY KEY (`id_respuesta`),
  KEY `fk_rc_cuestionario` (`id_cuestionario`),
  KEY `fk_rc_sintoma` (`id_sintoma`),
  CONSTRAINT `fk_rc_cuestionario` FOREIGN KEY (`id_cuestionario`) REFERENCES `CUESTIONARIO` (`id_cuestionario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rc_sintoma` FOREIGN KEY (`id_sintoma`) REFERENCES `SINTOMA` (`id_sintoma`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RESPUESTA_CUESTIONARIO`
--

LOCK TABLES `RESPUESTA_CUESTIONARIO` WRITE;
/*!40000 ALTER TABLE `RESPUESTA_CUESTIONARIO` DISABLE KEYS */;
/*!40000 ALTER TABLE `RESPUESTA_CUESTIONARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SINTOMA`
--

DROP TABLE IF EXISTS `SINTOMA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SINTOMA` (
  `id_sintoma` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_sintoma`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SINTOMA`
--

LOCK TABLES `SINTOMA` WRITE;
/*!40000 ALTER TABLE `SINTOMA` DISABLE KEYS */;
INSERT INTO `SINTOMA` VALUES (1,'Hojas amarillas','Las hojas pierden su color verde y se vuelven amarillas total o parcialmente.'),(2,'Puntas secas','Las puntas de las hojas aparecen secas, marrones o quebradizas.'),(3,'Bordes quemados','Los bordes de las hojas se ven marrones, secos o con aspecto quemado.'),(4,'Manchas marrones','Aparecen manchas marrones en hojas, tallos o flores.'),(5,'Manchas amarillas','Se observan zonas amarillas localizadas en las hojas.'),(6,'Hojas caídas','Las hojas cuelgan o pierden firmeza respecto a su posición normal.'),(7,'Caída de hojas','La planta pierde hojas con facilidad o de forma continua.'),(8,'Hojas blandas','Las hojas están flácidas, blandas o sin tensión.'),(9,'Hojas arrugadas','Las hojas presentan arrugas, pliegues o aspecto deshidratado.'),(10,'Hojas enrolladas','Las hojas se curvan o enrollan sobre sí mismas.'),(11,'Hojas pálidas','Las hojas se ven más claras de lo normal o con pérdida general de color.'),(12,'Crecimiento lento','La planta apenas produce hojas, brotes o tallos nuevos.'),(13,'Planta marchita','La planta muestra decaimiento general y pérdida de vigor.'),(14,'Tallo blando','El tallo está blando, húmedo o con pérdida de firmeza.'),(15,'Tallo ennegrecido','El tallo presenta zonas oscuras o ennegrecidas.'),(16,'Raíces podridas','Las raíces tienen mal aspecto, están oscuras, blandas o deshechas.'),(17,'Moho en sustrato','Aparece una capa de moho o pelusa en la superficie del sustrato.'),(18,'Sustrato muy seco','El sustrato se observa excesivamente seco, compacto o separado de la maceta.'),(19,'Mal olor en sustrato','El sustrato desprende olor desagradable o a humedad estancada.'),(20,'Plaga visible','Se observan insectos, larvas u otros organismos sobre la planta.'),(21,'Telarañas finas','Se aprecian hilos finos o pequeñas telarañas en hojas o tallos.'),(22,'Bultos algodonosos','Aparecen acumulaciones blancas con aspecto algodonoso en la planta.'),(23,'Insectos pequeños verdes o negros','Se ven insectos pequeños agrupados en brotes, tallos o envés de hojas.'),(24,'Agujeros en hojas','Las hojas presentan perforaciones o mordeduras visibles.'),(25,'Hojas pegajosas','Las hojas o tallos tienen una sustancia pegajosa en la superficie.'),(26,'Falta de floración','La planta no florece cuando debería hacerlo o florece muy poco.'),(27,'Flores marchitas rápidamente','Las flores duran poco tiempo o se deterioran antes de lo esperado.'),(28,'Brotes deformes','Los brotes nuevos salen torcidos, pequeños o con forma anormal.'),(29,'Hojas con polvo blanco','Las hojas presentan una capa blanca fina o polvillo en la superficie.'),(30,'Decoloración por zonas','La hoja muestra pérdida irregular de color en áreas concretas.');
/*!40000 ALTER TABLE `SINTOMA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UBICACION`
--

DROP TABLE IF EXISTS `UBICACION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UBICACION` (
  `id_ubicacion` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int unsigned NOT NULL,
  `id_localizacion` int unsigned DEFAULT NULL,
  `nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `luz` enum('plena_sombra','sombra_parcial','luz_indirecta','luz_directa') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'luz_indirecta',
  `humedad` enum('baja','media','alta') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'media',
  `es_exterior` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_ubicacion`),
  KEY `fk_ubicacion_usuario` (`id_usuario`),
  KEY `fk_ubicacion_localizacion` (`id_localizacion`),
  CONSTRAINT `fk_ubicacion_localizacion` FOREIGN KEY (`id_localizacion`) REFERENCES `LOCALIZACION` (`id_localizacion`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_ubicacion_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `USUARIO` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UBICACION`
--

LOCK TABLES `UBICACION` WRITE;
/*!40000 ALTER TABLE `UBICACION` DISABLE KEYS */;
INSERT INTO `UBICACION` VALUES (1,2,6,'Salón','Zona luminosa','luz_indirecta','media',0),(3,3,NULL,'Salón','Zona con mucha luz indirecta.','luz_indirecta','baja',0);
/*!40000 ALTER TABLE `UBICACION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USUARIO`
--

DROP TABLE IF EXISTS `USUARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USUARIO` (
  `id_usuario` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contrasena` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_localizacion_default` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `uq_usuario_email` (`email`),
  KEY `fk_usuario_localizacion` (`id_localizacion_default`),
  CONSTRAINT `fk_usuario_localizacion` FOREIGN KEY (`id_localizacion_default`) REFERENCES `LOCALIZACION` (`id_localizacion`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USUARIO`
--

LOCK TABLES `USUARIO` WRITE;
/*!40000 ALTER TABLE `USUARIO` DISABLE KEYS */;
INSERT INTO `USUARIO` VALUES (2,'Lucia','lucia@test.com','1234','2026-05-16 13:41:03',6),(3,'Lucíaaa','lucia@test1.com','123457','2026-05-16 21:05:08',6);
/*!40000 ALTER TABLE `USUARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'veridis'
--

--
-- Dumping routines for database 'veridis'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-19 14:20:26
