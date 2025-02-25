-- MySQL dump 10.13  Distrib 9.2.0, for Linux (x86_64)
--
-- Host: localhost    Database: dormitory_management
-- ------------------------------------------------------
-- Server version	9.2.0

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
-- Table structure for table `Buildings`
--

DROP TABLE IF EXISTS `Buildings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Buildings` (
  `build_id` int NOT NULL AUTO_INCREMENT,
  `building_name` varchar(50) NOT NULL,
  `staff_id` int DEFAULT NULL,
  PRIMARY KEY (`build_id`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `Buildings_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Buildings`
--

LOCK TABLES `Buildings` WRITE;
/*!40000 ALTER TABLE `Buildings` DISABLE KEYS */;
/*!40000 ALTER TABLE `Buildings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Dorm_Inspections`
--

DROP TABLE IF EXISTS `Dorm_Inspections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Dorm_Inspections` (
  `inspection_id` int NOT NULL AUTO_INCREMENT,
  `dorm_id` int DEFAULT NULL,
  `staff_id` int DEFAULT NULL,
  `inspection_time` datetime NOT NULL,
  `result` varchar(50) DEFAULT NULL,
  `remarks` text,
  PRIMARY KEY (`inspection_id`),
  KEY `dorm_id` (`dorm_id`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `Dorm_Inspections_ibfk_1` FOREIGN KEY (`dorm_id`) REFERENCES `Dorms` (`dorm_id`),
  CONSTRAINT `Dorm_Inspections_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dorm_Inspections`
--

LOCK TABLES `Dorm_Inspections` WRITE;
/*!40000 ALTER TABLE `Dorm_Inspections` DISABLE KEYS */;
/*!40000 ALTER TABLE `Dorm_Inspections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Dorms`
--

DROP TABLE IF EXISTS `Dorms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Dorms` (
  `dorm_id` int NOT NULL AUTO_INCREMENT,
  `dorm_number` varchar(20) NOT NULL,
  `capacity` int NOT NULL,
  `build_id` int DEFAULT NULL,
  PRIMARY KEY (`dorm_id`),
  UNIQUE KEY `dorm_number` (`dorm_number`),
  KEY `build_id` (`build_id`),
  CONSTRAINT `Dorms_ibfk_1` FOREIGN KEY (`build_id`) REFERENCES `Buildings` (`build_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dorms`
--

LOCK TABLES `Dorms` WRITE;
/*!40000 ALTER TABLE `Dorms` DISABLE KEYS */;
/*!40000 ALTER TABLE `Dorms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Late_Returns`
--

DROP TABLE IF EXISTS `Late_Returns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Late_Returns` (
  `late_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `dorm_id` int DEFAULT NULL,
  `return_time` datetime NOT NULL,
  `reason` text,
  PRIMARY KEY (`late_id`),
  KEY `student_id` (`student_id`),
  KEY `dorm_id` (`dorm_id`),
  CONSTRAINT `Late_Returns_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `Users` (`user_id`),
  CONSTRAINT `Late_Returns_ibfk_2` FOREIGN KEY (`dorm_id`) REFERENCES `Dorms` (`dorm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Late_Returns`
--

LOCK TABLES `Late_Returns` WRITE;
/*!40000 ALTER TABLE `Late_Returns` DISABLE KEYS */;
/*!40000 ALTER TABLE `Late_Returns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Repairs`
--

DROP TABLE IF EXISTS `Repairs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Repairs` (
  `repair_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `dorm_id` int DEFAULT NULL,
  `description` text NOT NULL,
  `status` enum('pending','in_progress','completed') DEFAULT 'pending',
  `maintenance_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`repair_id`),
  KEY `student_id` (`student_id`),
  KEY `dorm_id` (`dorm_id`),
  KEY `maintenance_id` (`maintenance_id`),
  CONSTRAINT `Repairs_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `Users` (`user_id`),
  CONSTRAINT `Repairs_ibfk_2` FOREIGN KEY (`dorm_id`) REFERENCES `Dorms` (`dorm_id`),
  CONSTRAINT `Repairs_ibfk_3` FOREIGN KEY (`maintenance_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Repairs`
--

LOCK TABLES `Repairs` WRITE;
/*!40000 ALTER TABLE `Repairs` DISABLE KEYS */;
/*!40000 ALTER TABLE `Repairs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student_Dorm`
--

DROP TABLE IF EXISTS `Student_Dorm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Student_Dorm` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `dorm_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  KEY `dorm_id` (`dorm_id`),
  CONSTRAINT `Student_Dorm_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `Users` (`user_id`),
  CONSTRAINT `Student_Dorm_ibfk_2` FOREIGN KEY (`dorm_id`) REFERENCES `Dorms` (`dorm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student_Dorm`
--

LOCK TABLES `Student_Dorm` WRITE;
/*!40000 ALTER TABLE `Student_Dorm` DISABLE KEYS */;
/*!40000 ALTER TABLE `Student_Dorm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','student','maintenance','dorm_staff') NOT NULL,
  `real_name` varchar(50) DEFAULT NULL,
  `contact` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-25  3:13:34
