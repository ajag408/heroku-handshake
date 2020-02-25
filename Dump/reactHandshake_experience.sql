-- MySQL dump 10.13  Distrib 5.6.33, for osx10.9 (x86_64)
--
-- Host: 127.0.0.1    Database: reactHandshake
-- ------------------------------------------------------
-- Server version	5.6.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `experience`
--

DROP TABLE IF EXISTS `experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `experience` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyName` varchar(255) DEFAULT NULL,
  `loc` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `startDate` varchar(255) DEFAULT NULL,
  `endDate` varchar(255) DEFAULT NULL,
  `description` text,
  `student` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `student` (`student`),
  CONSTRAINT `experience_ibfk_1` FOREIGN KEY (`student`) REFERENCES `students` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience`
--

LOCK TABLES `experience` WRITE;
/*!40000 ALTER TABLE `experience` DISABLE KEYS */;
INSERT INTO `experience` VALUES (1,'Logitech','Newark, CA','UI Developer','0012-01-31','2454-12-31','Ate thai food twice or thrice',1);
/*!40000 ALTER TABLE `experience` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-24 19:34:39
