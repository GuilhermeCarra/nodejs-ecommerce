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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
-- INSERT INTO `products` VALUES (1,'The Original','Hamburger 100% Beef 🐂, american cheese 🧀, bacon 🥓, tomato 🍅, lettuce 🥗 and our famous sauce.'),(2,'Pretzel Triple','Warm beer cheese sauce 🍺, smoked bacon 🥓, crispy fried onions 🧅, extra soft pretzel bun 🥨.'),(3,'Baconation','Fresh Beef 🐂, 6 pieces of crispy smoked bacon 🥓, american cheese 🧀, ketchup and mayo 🥣.'),(4,'Bacon Jalapeño','Fresh beef with pickled jalapeños 🌶️, smoked bacon 🥓, American cheese, crispy fried onions 🧅, smoky jalapeño sauce. It’s too hot 🔥.'),(5,'Cheeseburger Deluxe','100% Beef topped with cheese 🐂, pickles 🥒, onions 🧅, tomatoes 🍅, crisp lettuce 🥗, ketchup, and mayo 🥣.'),(6,'Big Bacon','A quarter-pound of fresh beef 🐂, bacon, crisp lettuce 🥗, tomato 🍅, pickle 🥒, ketchup, mayo, and onion 🧅 on a toasted bun 🍞.');
INSERT INTO `products` VALUES (1,'The Original','Hamburger 100% Beef, american cheese, bacon, tomato, lettuce and our famous sauce.'),(2,'Pretzel Triple','Warm beer cheese sauce, smoked bacon, crispy fried onions, extra soft pretzel bun.'),(3,'Baconation','Fresh Beef, 6 pieces of crispy smoked bacon, american cheese, ketchup and mayo.'),(4,'Bacon Jalapeño','Fresh beef with pickled jalapeños, smoked bacon, American cheese, crispy fried onions, smoky jalapeño sauce. It’s too hot.'),(5,'Cheeseburger Deluxe','100% Beef topped with cheese, pickles, onions, tomatoes, crisp lettuce, ketchup, and mayo.'),(6,'Big Bacon','A quarter-pound of fresh beef, bacon, crisp lettuce, tomato, pickle, ketchup, mayo, and onion on a toasted bun.');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
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
