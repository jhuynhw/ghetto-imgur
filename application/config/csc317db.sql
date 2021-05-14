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
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (83,'Black Panther','Black Panther Movie','public\\images\\uploads\\d01b8f6b4e9d43b7b955fe3102c0df8f1b33adbad0e2.jpeg','public/images/uploads/thumbnail-d01b8f6b4e9d43b7b955fe3102c0df8f1b33adbad0e2.jpeg',0,'2021-05-13 19:50:51',40),(86,'Avengers: Infinity War','Avengers: Infinity War movie','public\\images\\uploads\\db6494830e5b84786fc89dc777f2c5d38b0a7284bcdc.jpeg','public/images/uploads/thumbnail-db6494830e5b84786fc89dc777f2c5d38b0a7284bcdc.jpeg',0,'2021-05-13 19:51:54',40),(88,'WandaVision','WandaVision TV series','public\\images\\uploads\\5fb0cb5c8ecad84219eafc9bfe7278cb39a39bf0c12c.jpeg','public/images/uploads/thumbnail-5fb0cb5c8ecad84219eafc9bfe7278cb39a39bf0c12c.jpeg',0,'2021-05-13 19:52:31',40),(91,'Iron Man','Iron Man movie','public\\images\\uploads\\a068c79cfb43e16eb7dc4200a61754917e1c3215daa9.jpeg','public/images/uploads/thumbnail-a068c79cfb43e16eb7dc4200a61754917e1c3215daa9.jpeg',0,'2021-05-13 20:50:08',40),(92,'The Falcon & The Winter Soldier','The Falcon & The Winter Soldier TV series','public\\images\\uploads\\9a5f7e31cc35b0a992115f9316c309c153d7a3f2e8b8.jpeg','public/images/uploads/thumbnail-9a5f7e31cc35b0a992115f9316c309c153d7a3f2e8b8.jpeg',0,'2021-05-13 20:50:45',40),(93,'Avengers: Endgame','Avengers: Endgame movie','public\\images\\uploads\\5c89b75f2d2124468971d7f5ebc6bd139537ec9732e3.jpeg','public/images/uploads/thumbnail-5c89b75f2d2124468971d7f5ebc6bd139537ec9732e3.jpeg',0,'2021-05-13 20:51:02',40),(94,'Spider-Man Far From Home','Spider-Man Far From Home movie','public\\images\\uploads\\13b6f39fa7446f1162b3b3d3226aa78495abfa36c41a.jpeg','public/images/uploads/thumbnail-13b6f39fa7446f1162b3b3d3226aa78495abfa36c41a.jpeg',0,'2021-05-13 20:51:29',40),(96,'Captain Marvel','Captain Marvel movie','public\\images\\uploads\\771a6ca3def16b234e114e494d4ee280049715da883d.jpeg','public/images/uploads/thumbnail-771a6ca3def16b234e114e494d4ee280049715da883d.jpeg',0,'2021-05-13 20:57:56',40);
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
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (37,'ecryptTest','ecryptTest@m.com','$2b$15$I00fJtqxzSwFdiUpLvmAOefOhADXcKVZfjVxFyCs9JbA5LW8tdFVG',0,0,'2021-04-30 21:54:56'),(38,'anjdn','lkasjdlk@gma.com','Password1/',0,0,'2021-04-30 22:08:48'),(39,'adhsjkj','akljsd@ma.com','$2b$15$JRgG3sAZY5dSnuiirAdFCenzoorwKSnDhL2IPnSPP1YfzuA64bS.m',0,0,'2021-04-30 22:10:06'),(40,'jhuynh','jhuynh@mail.com','$2b$15$rbFMigdWzqwyQzr.PzgLZeQ/eK94XMaVY9806g/25AS4vIsLJB.zm',0,0,'2021-05-01 00:56:04'),(41,'test1','test1@mail.com','$2b$15$u2N0GivjCB8xB1A1lSaoTeVhL8vVocKycSDhUTDdx/gjvQyH/G44.',0,0,'2021-05-01 01:04:53'),(42,'test1234','test1234@m.com','$2b$15$EKyjNgg3uzyL2Bct26dQR.dtzsoOW2sDtkH6dNSis3tFaEXW0IczK',0,0,'2021-05-02 01:43:06'),(43,'photo','photo@mail.com','$2b$15$SZKEkvcVp9GgX1JMkdUaPer1L/PHB36H3mi6i9Gah/1JbSl50KK/O',0,0,'2021-05-02 02:00:52'),(44,'photoacc','photoacc@m.com','$2b$15$Dei7.GDQd5o78E0IWR/OLe2e79I2aYn0coftgzYz4PtyYwvNhe7wy',0,0,'2021-05-02 02:08:31'),(45,'teso','aksjdl@c.com','$2b$15$mns4BTVoyfpIFmvB5713rOMBIckD2W9WnD.QvoBZT/gkW3O54X8UG',0,0,'2021-05-02 13:42:58'),(46,'test012','asdjkl@mail.com','$2b$15$xlx.kFnm2NWVYgtZdTpBD.oIrBZTNSGEQi2YqLbYcZwXaRpA4ha46',0,0,'2021-05-02 13:58:04'),(47,'asdas','asda@c.co','$2b$15$HHEh4ng6jl53prW17s9j0uZhtxkt9s8IcJ83ToMazbz0brGnWzM5C',0,0,'2021-05-07 00:34:54'),(48,'asdasd','asdas@c.co','$2b$15$7Kf9e007BsjvDh83Nymq7eJBs4kHzh/8Na4ek9KDjvgBORnlf/4q2',0,0,'2021-05-07 00:35:17'),(49,'asdnak','asdkj@cc.com','$2b$15$jUyBPL4822XczaD9QyA8Mew7dkKsVYZdIlzpt.D5PukFyV4ANmyQu',0,0,'2021-05-07 00:36:07'),(50,'asdasd1','asd@c.com','$2b$15$GFRXmERI84b9kZ/qjmbUKeZvI9DRBl4aHwgMfOz5TQ47BUCucmtte',0,0,'2021-05-07 00:36:37');
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

-- Dump completed on 2021-05-13 23:54:51
