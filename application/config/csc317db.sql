-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.24

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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `photopath` varchar(4096) NOT NULL,
  `thumbnail` varchar(4096) NOT NULL,
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `fk_userid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idpost_UNIQUE` (`id`),
  KEY `posts to users_idx` (`fk_userid`),
  CONSTRAINT `posts to users` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (99,'Iron Man','Iron Man movie','public\\images\\uploads\\75ced30461bbff2b46f795240bbaf104b2b0b0e13b23.jpeg','public/images/uploads/thumbnail-75ced30461bbff2b46f795240bbaf104b2b0b0e13b23.jpeg',0,'2021-05-17 00:03:09',63),(100,'Black Panther','Black Panther movie','public\\images\\uploads\\c8835ed8bfadd44f9c8ccc648f8c532193986d71bbfa.jpeg','public/images/uploads/thumbnail-c8835ed8bfadd44f9c8ccc648f8c532193986d71bbfa.jpeg',0,'2021-05-17 00:03:45',63),(101,'Captain Marvel','Captain Marvel movie','public\\images\\uploads\\ac4d505af7f688563ee07001d0a20ba72df8fa8bba8f.jpeg','public/images/uploads/thumbnail-ac4d505af7f688563ee07001d0a20ba72df8fa8bba8f.jpeg',0,'2021-05-17 00:04:05',63),(102,'Avengers: Infinity War','Avengers: Infinity War movie','public\\images\\uploads\\3baad590c14e4538946b6f36731d9742dc1b0f972c15.jpeg','public/images/uploads/thumbnail-3baad590c14e4538946b6f36731d9742dc1b0f972c15.jpeg',0,'2021-05-17 00:04:29',63),(103,'Avengers: Endgame','Avengers: Endgame movie','public\\images\\uploads\\806a673207869f34f0ef16b63baae3be5076de369d97.jpeg','public/images/uploads/thumbnail-806a673207869f34f0ef16b63baae3be5076de369d97.jpeg',0,'2021-05-17 00:05:03',63),(104,'Spider-Man Far From Home','Spider-Man Far From Home movie','public\\images\\uploads\\a0c1619a0ff5608357b5bba0f1260929ab3ac2641ca7.jpeg','public/images/uploads/thumbnail-a0c1619a0ff5608357b5bba0f1260929ab3ac2641ca7.jpeg',0,'2021-05-17 00:05:34',63),(105,'Wanda Vision','Wanda Vision TV series','public\\images\\uploads\\b439d1db6f42f2dc5de848aee75abf90859c4b9232a0.jpeg','public/images/uploads/thumbnail-b439d1db6f42f2dc5de848aee75abf90859c4b9232a0.jpeg',0,'2021-05-17 00:06:37',63),(106,'soza','soza','public\\images\\uploads\\8deb6dc7c54a5a1e1b3457c00262db9755e0026596d3.jpeg','public/images/uploads/thumbnail-8deb6dc7c54a5a1e1b3457c00262db9755e0026596d3.jpeg',0,'2021-05-17 00:14:16',65);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `usertype` int NOT NULL DEFAULT '0',
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (52,'souza0','souza0@mail.com','$2b$15$Z.e7q3BQHcRG3/Xl9HfaluhcH./09BcAP66rnniLucYY4USUqjrJG',0,0,'2021-05-16 23:55:13'),(53,'souza1','souza1@mail.com','$2b$15$XK2gJPKUVANtry08yPQSpOXTflkCQby1mchLV1Lc8ybM7vS/bbJti',0,0,'2021-05-16 23:55:38'),(54,'souza3','souza3@mail.com','$2b$15$C1aIpCudJuXxwIFlCE2i3uEN5kWi0NK/T4GqUcmv61a68lvpHCPPO',0,0,'2021-05-16 23:55:53'),(55,'souza4','souza4@mail.com','$2b$15$8TuPWoLBFiFRDZyx0KTrEe87TbuB58vAbvWxY1yvRcrhnllOFDDb.',0,0,'2021-05-16 23:57:27'),(56,'souza5','souza5@mail.com','$2b$15$O6kAVG0DfI6NnPWBI157duxoaMbyhgxo2.5Yl47PW/B43vnnwPV/a',0,0,'2021-05-16 23:57:43'),(57,'souza6','souza6@mail.com','$2b$15$asxmCHrOWBrQHo.aEH902u/hCKb2.0mszzPkKZ5b9v8M2Lkq6KxwW',0,0,'2021-05-16 23:58:22'),(58,'souza7','souza7@mail.com','$2b$15$fgeVm.Xc4QNM/evXBKAGU.fNQyKz1bfZmWBJ9MoNkPXw8nAVMuz3K',0,0,'2021-05-16 23:58:38'),(59,'souza8','souza8@mail.com','$2b$15$K8Bhu8YN0krULDsGb/jmLuhqaaNEQ9sWsB02U826Kw9bD5vVIafCa',0,0,'2021-05-16 23:58:54'),(61,'souza9','souza9@mail.com','$2b$15$m7F6ausU1QH8NqqdlCSZ..51oJE5k75CXf012ZT1VRjqQJFOqkq3a',0,0,'2021-05-17 00:00:23'),(62,'souza10','souza10@mail.com','$2b$15$lx71bj0GNOzjK12aZGmRvOGkfHac554W393uP/3zqEe7wQ5FTfBIW',0,0,'2021-05-17 00:00:39'),(63,'john','john@mail.com','$2b$15$PkoJfc7TAXEAiUmKDAwwseNnnE35mKT1OjS2g19kyhlFkzg37MDB6',0,0,'2021-05-17 00:02:39'),(64,'souza2','souza2@mail.com','$2b$15$mQOTFWAc/jRiG2ptrSvF5e3B06K1vvM6Rl3tCj8Qqeki5i.hvSDbq',0,0,'2021-05-17 00:08:51'),(65,'johnathan','johnathan@mail.com','$2b$15$Zq3DZtbemhFbLsP7grPfJe4M6/ByjeDs7bBaBB.X0Esm4eMv..wki',0,0,'2021-05-17 00:13:35');
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

-- Dump completed on 2021-05-17  0:39:57
