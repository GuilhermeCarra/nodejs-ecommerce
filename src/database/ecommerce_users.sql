-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_type` varchar(50) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,'Maria Almeida','$2b$10$vNPDPAva//83gbyad.lIfuo7buBxwvlOuJgWYdJi7PH/5AZ.h/rrm','user@user.com'),(2,NULL,'Maria','$2b$10$./ejLdYX5K8nKF8C1MdrAOPq5MILYUccGke/AmJqPjxrI0w5uqN/.','admin@assemblerschool.com'),(3,NULL,'Betty Boop','$2b$10$Nf8LdZP/xa0jlVNfP6g5a.Mzsa21KME8l.QHnhCpU4P1ShQTyNnna','betty@boop.com'),(4,NULL,'Maria12','$2b$10$AcLQmQ6RuXSAN.mql0/jre2HCYwvd8Jv1rP3fb2jFteH.v8pwrgS.','admin@assemblerschool.com'),(5,NULL,'Alfred Garcia','$2b$10$fNyGBL3Wkkv1cWXlYePreOh1cHjHIhEGcKXXlrKqrI.SRkgDe2cdW','alfred@garcia.com'),(6,'admin','Jesus Alves','$2b$10$h/kKGgYBj1fsrf1HYLGfeeiwPllq2cja17ichrnjBm9TT8b8WiNBO','admin@admin.com'),(7,'employee','John Talbain','$2b$10$vNPDPAva//83gbyad.lIfuo7buBxwvlOuJgWYdJi7PH/5AZ.h/rrm','employee@employee.com'),(8,NULL,'Guilherme Carra','$2b$10$f0rgUInqHFsrAyfK/vwPtO.psMpygisDA9n9ifQEDofaaf/WKkXzm','gui_gc@hotmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-18 15:38:50
