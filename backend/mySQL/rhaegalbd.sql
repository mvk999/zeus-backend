-- Dump completo do banco rhaegon_db
-- Inclui tabelas: usuario, cliente, membro, orcamento, recuperacao_senha

-- ===============================
-- Arquivo: rhaegon_db_usuario.sql
-- ===============================

-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: rhaegon_db
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `nome_user` varchar(128) NOT NULL,
  `email_user` varchar(128) NOT NULL,
  `senha_user` varchar(128) NOT NULL,
  `tipo_user` varchar(128) NOT NULL,
  `tentativas_login` int DEFAULT '0',
  `bloqueado_ate` datetime DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email_user` (`email_user`)
) ENGINE=InnoDB AUTO_INCREMENT=12345 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Admin','admin@example.com','senha123','admin',0,NULL),(11,'asdasd','asdasd','asdasd','asda',0,NULL),(12312,'12123','23123','31231','311231',0,NULL),(12313,'admin','admin@teste.com','$2b$10$vNK.6QT3qbjrbMTRERuyu.PumwbKaHecTdC/cfYcb4jeL0j7TC6Qq','admin',0,NULL),(12314,'Marcos','marcos@email.com','123456','admin',0,NULL),(12316,'Marcos111','mar@email.com','$2b$10$uIzp2H85IEyN3zQh/j0EieCyetx8nzC8OPqmQpUOk8p2uo3IXkDI6','admin',0,NULL),(12319,'Marcos','marcos2@email.com','$2b$10$iBx.pwA6Dpb1yHuEnlp2ROUT2jQM.rLJ.jxVC9AMl1koxKF1/12Q2','admin',0,NULL),(12320,'Marcos','pereiramv2006@gmail.com','$2b$10$H.EMFDhZcU2SODaEgNno2.FwvkDzIFQKJ3DB9STu7iVMxkO4lxWD.','admin',3,'2025-05-13 16:39:14'),(12321,'Cliente Teste','cliente@compjunior.com','$2b$10$DymX62QS0IvPjURokrCIRe4.UCliPXsnMaL/hkarOHLLaBm7jJ4bO','cliente',0,NULL),(12322,'João Cliente','joao@compjunior.com','$2b$10$LrfRMg1101oZ8BEQ.oCIXOAbzbNpF4P91x/ltsitedK4UK.FlPKTC','cliente',0,NULL),(12323,'Lucas Cliente','lucas@compjunior.com','$2b$10$rKZNxtg/RIHYIInr/L2xD.pN9JjiieQxgkoGr6QtloHeHFmBBzDCO','cliente',0,NULL),(12324,'Bruna Cliente','bruna@compjunior.com','$2b$10$j1PCOBHSw45CkTFmk.N6xe7s1wFs2OSeTbobJMVrSszrISkYk1.TS','cliente',0,NULL),(12326,'marcc','marco@compjunior.com','$2b$10$KFb41qVNmVYSpzdEGe/NxufGmrEFWVQ4kaL3z8aSOOAAgvlfaZqU2','cliente',0,NULL),(12328,'asdads','asdasd@compjunior.com','$2b$10$s4sK9lvkGw4df1VAoVZSRenc185oV1e7ZsMg4LOTUjf5f9dHeWsLW','cliente',0,NULL),(12330,'aasdasdasd','asasdasdadsd@compjunior.com','$2b$10$0dVER.wK4JWo25ibfbBXNebtfUPMz9KZbnmS5N9L1NUtDih9M.N4e','cliente',0,NULL),(12332,'aaaaaasd','asasdaasdasdad@compjunior.com','$2b$10$UzceccpDkTylETKSMzeQjeAv2pPkE5H0OFOnbG0tcdm5tZLcQtTxq','cliente',0,NULL),(12334,'Bruna Cliente','bruna1@compjunior.com','$2b$10$ZEhZwkloSTXLuoo4klv9TuM84AZm66ekc8lZEN2CS5zgl1GRw0WCu','cliente',0,NULL),(12335,'Carlos Admin','carlos@compjunior.com','$2b$10$nXaHAZSQY4h85aA5cf.NtOuhbTdN6AsNzmaC.yNLos/31.kw7yqoy','admin',0,NULL),(12336,'João Admin','joao.admin@compjunior.com','$2b$10$xfyTPQGh3HtqzMqvooqaxuA0emxznnS2ewVH0AyP66MS6pHEmPq9y','admin',0,NULL),(12338,'Admin Incompleto','adminfail@compjunior.com','$2b$10$NgtNEUmkFnrOUkcYR.wWuOtBT.nGX/ikUlpyzpxyeaH0ovGapNG0u','admin',0,NULL),(12340,'Teste Jest','jest_1747166490856@compjunior.com','$2b$10$7BA30QjlLQkn0/GfuXfCwe7KSvuHQQAzJwbq4pqi3b2y9E8JKCQjG','cliente',0,NULL),(12341,'Teste Jest','jest_1747166607077@compjunior.com','$2b$10$/jggjLxTF9Nilrb0XD5hWe5A1224wRVsJKbh3XcgYegx5uBSVy0pi','cliente',0,NULL),(12342,'Teste Jest','jest_1747171351044@compjunior.com','$2b$10$yhU8r1ThcRQ1IQ9/up.WzuftjOgt57RomYK.4Nn9vKyGvcZGYhetq','cliente',0,NULL),(12343,'Admin Teste','admin_1747171351321@compjunior.com','$2b$10$tzOF30hLZ0672FgEZtdNUuxLrknA/5et41iQUq43gsAjvWVJSHWrC','admin',0,NULL),(12344,'Admin Fail','adminfail_1747171351492@compjunior.com','$2b$10$4ZZA60y4JXoOKA5PmdgflebJ0Zn1t7XxsewykUV4ubiAA8O.7X/L.','admin',0,NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


-- ===============================
-- Arquivo: rhaegon_db_cliente.sql
-- ===============================

-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: rhaegon_db
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cli` int NOT NULL AUTO_INCREMENT,
  `nome_cli` varchar(128) NOT NULL,
  `email_cli` varchar(128) NOT NULL,
  `telefone_cli` varchar(128) NOT NULL,
  `empresa_cli` varchar(128) NOT NULL,
  `id_user` int DEFAULT NULL,
  PRIMARY KEY (`id_cli`),
  UNIQUE KEY `email_cli` (`email_cli`),
  KEY `fk_cliente_usuario` (`id_user`),
  CONSTRAINT `fk_cliente_usuario` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'aa','aaa','aaa','aaa',NULL),(2,'aaaaaasd','asasdaasdasdad@compjunior.com','sem telefone','sem empresa',12332),(3,'Bruna Cliente','bruna1@compjunior.com','(35) 98888-1234','Comp Júnior',12334),(4,'Teste Jest','jest_1747166490856@compjunior.com','(00) 00000-0000','Testes Ltda',12340),(5,'Teste Jest','jest_1747166607077@compjunior.com','(00) 00000-0000','Testes Ltda',12341),(6,'Teste Jest','jest_1747171351044@compjunior.com','(00) 00000-0000','Testes Ltda',12342);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


-- ===============================
-- Arquivo: rhaegon_db_membro.sql
-- ===============================

-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: rhaegon_db
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `membro`
--

DROP TABLE IF EXISTS `membro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membro` (
  `id_membro` int NOT NULL AUTO_INCREMENT,
  `nome_membro` varchar(128) NOT NULL,
  `data_nascimento_membro` varchar(128) NOT NULL,
  `email_inst_membro` varchar(128) NOT NULL,
  `cargo_membro` varchar(128) NOT NULL,
  `telefone_membro` varchar(128) NOT NULL,
  `genero_membro` varchar(128) NOT NULL,
  `foto_membro` varchar(128) NOT NULL,
  `data_ingress_membro` varchar(128) NOT NULL,
  `id_user` int DEFAULT NULL,
  PRIMARY KEY (`id_membro`),
  UNIQUE KEY `email_inst_membro` (`email_inst_membro`),
  KEY `membro_ibfk_1` (`id_user`),
  CONSTRAINT `membro_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membro`
--

LOCK TABLES `membro` WRITE;
/*!40000 ALTER TABLE `membro` DISABLE KEYS */;
INSERT INTO `membro` VALUES (1,'marcos','2000-12-01','marcos@compjunior.com','Líder de Projetos','(35) 99999-1234','Feminino','foto_marcosatt.jpg','2022-03-01',1),(2,'Ana Souza','2001-08-15','ana@compjunior.com','Designer','(35) 99888-7766','Feminino','perfil_ana.jpeg','2023-03-01',1),(3,'João Admin','1990-05-10','joao@compjunior.com','Gerente de Projetos','(35) 99999-0000','Masculino','foto_joao.png','2024-01-15',12336),(4,'Admin Teste','1990-01-01','admin@compjunior.com','Líder Técnico','(35) 99999-9999','Masculino','admin.jpg','2023-01-01',12343);
/*!40000 ALTER TABLE `membro` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


-- ===============================
-- Arquivo: rhaegon_db_orcamento.sql
-- ===============================

-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: rhaegon_db
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `orcamento`
--

DROP TABLE IF EXISTS `orcamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orcamento` (
  `id_orcamento` int NOT NULL AUTO_INCREMENT,
  `num_orcamento` varchar(128) NOT NULL,
  `desc_orcamento` varchar(128) NOT NULL,
  `valor_orcamento` varchar(128) NOT NULL,
  `custo_orcamento` varchar(128) NOT NULL,
  `data_criacao` varchar(128) NOT NULL,
  `status` varchar(128) NOT NULL,
  `id_membro` int DEFAULT NULL,
  `id_cli` int DEFAULT NULL,
  PRIMARY KEY (`id_orcamento`),
  KEY `id_cli` (`id_cli`),
  KEY `fk_orcamento_membro` (`id_membro`),
  CONSTRAINT `fk_orcamento_membro` FOREIGN KEY (`id_membro`) REFERENCES `membro` (`id_membro`),
  CONSTRAINT `orcamento_ibfk_2` FOREIGN KEY (`id_cli`) REFERENCES `cliente` (`id_cli`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orcamento`
--

LOCK TABLES `orcamento` WRITE;
/*!40000 ALTER TABLE `orcamento` DISABLE KEYS */;
INSERT INTO `orcamento` VALUES (1,'aa','aa','aaa','aa','aa','aaa',1,1),(2,'ORC456','Projeto mobile atualizado','8500','5600','2025-05-13 15:21:51.141','Aprovado',2,1);
/*!40000 ALTER TABLE `orcamento` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


-- ===============================
-- Arquivo: rhaegon_db_recuperacao_senha.sql
-- ===============================

-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: rhaegon_db
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `recuperacao_senha`
--

DROP TABLE IF EXISTS `recuperacao_senha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recuperacao_senha` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email_user` varchar(128) NOT NULL,
  `utilizado` tinyint(1) DEFAULT '0',
  `expira_em` datetime NOT NULL,
  `codigo_recuperacao` varchar(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recuperacao_senha`
--

LOCK TABLES `recuperacao_senha` WRITE;
/*!40000 ALTER TABLE `recuperacao_senha` DISABLE KEYS */;
INSERT INTO `recuperacao_senha` VALUES (1,'marcos2@email.com',0,'2025-05-09 14:02:16','232978'),(2,'marcos2@email.com',0,'2025-05-10 13:41:34','671824'),(3,'marcos2@email.com',0,'2025-05-10 13:41:51','368770'),(4,'marcos2@email.com',0,'2025-05-10 13:45:34','440415'),(5,'marcos2@email.com',0,'2025-05-10 13:46:41','537273'),(6,'pereiramv2006@gmail.com',0,'2025-05-10 13:59:13','338218'),(7,'pereiramv2006@gmail.com',0,'2025-05-10 15:29:57','760699'),(8,'pereiramv2006@gmail.com',0,'2025-05-10 12:47:54','293138'),(9,'pereiramv2006@gmail.com',1,'2025-05-11 09:54:16','798480'),(10,'pereiramv2006@gmail.com',0,'2025-05-11 12:07:49','694868');
/*!40000 ALTER TABLE `recuperacao_senha` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-22  0:54:51
