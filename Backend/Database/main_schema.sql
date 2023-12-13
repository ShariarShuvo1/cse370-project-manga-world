-- Debug part start
DROP DATABASE IF EXISTS `cse370_db`;

CREATE DATABASE `cse370_db`;

use `cse370_db`;
-- Debug part end


-- Set default charset to utf8mb4
ALTER DATABASE cse370_db CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Create User Table

CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` char(68) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Create Profile Picture Table

CREATE TABLE `profile_picture` (
  `picture_id` int NOT NULL AUTO_INCREMENT,
  `picture` MEDIUMBLOB NOT NULL,
  `user_id` int NOT NULL UNIQUE,
  PRIMARY KEY (`picture_id`),
  CONSTRAINT `FK_USER_PP` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_0900_ai_ci;
  

-- Create User Type Table

CREATE TABLE `authorities` (
  `auth_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `type` varchar(10) NOT NULL,
  PRIMARY KEY (`auth_id`),
  CONSTRAINT `FK_USER_UT` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Create Manga Table

CREATE TABLE `manga` (
  `m_id` int NOT NULL AUTO_INCREMENT,
  `m_title` varchar(512) NOT NULL,
  `m_status` varchar(10) NOT NULL,
  `m_publish_date` date NOT NULL,
  `m_view` int DEFAULT 0,
  `m_description` varchar(5120) NOT NULL,
  PRIMARY KEY (`m_id`)
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Create Manga Picture Table

CREATE TABLE `manga_picture` (
  `mp_id` int NOT NULL AUTO_INCREMENT,
  `mp_picture` MEDIUMBLOB NOT NULL,
  `m_id` int NOT NULL UNIQUE,
  PRIMARY KEY (`mp_id`),
  CONSTRAINT `FK_MANGA_MP` FOREIGN KEY (`m_id`) REFERENCES `manga` (`m_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Create Volume Table

CREATE TABLE `volume` (
  `v_id` int NOT NULL AUTO_INCREMENT,
  `v_number` int DEFAULT 0,
  `v_title` varchar(512) NOT NULL,
  `v_release_date` date NOT NULL,
  `v_view` int DEFAULT 0,
  `m_id` int NOT NULL,
  PRIMARY KEY (`v_id`),
  CONSTRAINT `FK_MANGA_V` FOREIGN KEY (`m_id`) REFERENCES `manga` (`m_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Create Volume Cover Table

CREATE TABLE `volume_cover` (
  `vc_id` int NOT NULL AUTO_INCREMENT,
  `vc_picture` MEDIUMBLOB NOT NULL,
  `v_id` int NOT NULL UNIQUE,
  PRIMARY KEY (`vc_id`),
  CONSTRAINT `FK_VOLUME_VC` FOREIGN KEY (`v_id`) REFERENCES `volume` (`v_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Create Chapter Table

CREATE TABLE `chapter` (
  `c_id` int NOT NULL AUTO_INCREMENT,
  `c_number` int DEFAULT 0,
  `c_release_date` date NOT NULL,
  `c_page_count` int DEFAULT 0,
  `c_view` int DEFAULT 0,
  `v_id` int NOT NULL,
  PRIMARY KEY (`c_id`),
  CONSTRAINT `FK_VOLUME_C` FOREIGN KEY (`v_id`) REFERENCES `volume` (`v_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Create Chapter Cover Table

CREATE TABLE `chapter_cover` (
  `cc_id` int NOT NULL AUTO_INCREMENT,
  `cc_picture` MEDIUMBLOB NOT NULL,
  `c_id` int NOT NULL UNIQUE,
  PRIMARY KEY (`cc_id`),
  CONSTRAINT `FK_CHAPTER_CC` FOREIGN KEY (`c_id`) REFERENCES `chapter` (`c_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Create Manga File Table

CREATE TABLE `manga_file` (
  `mf_id` int NOT NULL AUTO_INCREMENT,
  `mf_file` LONGBLOB NOT NULL,
  `c_id` int NOT NULL UNIQUE,
  PRIMARY KEY (`mf_id`),
  CONSTRAINT `FK_CHAPTER_MF` FOREIGN KEY (`c_id`) REFERENCES `chapter` (`c_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_0900_ai_ci;


-- Create Author Table

CREATE TABLE `author` (
  `a_id` int NOT NULL AUTO_INCREMENT,
  `a_name` varchar(512) NOT NULL,
  `a_website` varchar(512) NOT NULL,
  `a_description` varchar(5120) NOT NULL,
  PRIMARY KEY (`a_id`)
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Create Author Picture Table

CREATE TABLE `author_picture` (
  `ap_id` int NOT NULL AUTO_INCREMENT,
  `ap_picture` MEDIUMBLOB NOT NULL,
  `a_id` int NOT NULL UNIQUE,
  PRIMARY KEY (`ap_id`),
  CONSTRAINT `FK_AUTHOR_AP` FOREIGN KEY (`a_id`) REFERENCES `author` (`a_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Create Author Manga Junction Table

CREATE TABLE `author_manga` (
  `a_id` int NOT NULL,
  `m_id` int NOT NULL,
  PRIMARY KEY (`a_id`, `m_id`),
  CONSTRAINT `FK_AUTHOR_AM` FOREIGN KEY (`a_id`) REFERENCES `author` (`a_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_MANGA_AM` FOREIGN KEY (`m_id`) REFERENCES `manga` (`m_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Publisher Table

CREATE TABLE `publisher` (
  `p_id` int NOT NULL AUTO_INCREMENT,
  `p_name` varchar(512) NOT NULL,
  `p_website` varchar(512) NOT NULL,
  `p_description` varchar(5120) NOT NULL,
  PRIMARY KEY (`p_id`)
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Create Publisher Picture  Table

CREATE TABLE `publisher_picture` (
  `pp_id` int NOT NULL AUTO_INCREMENT,
  `pp_picture` MEDIUMBLOB NOT NULL,
  `p_id` int NOT NULL UNIQUE,
  PRIMARY KEY (`pp_id`),
  CONSTRAINT `FK_PUBLISHER_PP` FOREIGN KEY (`p_id`) REFERENCES `publisher` (`p_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Create Publisher Manga Junction Table

CREATE TABLE `publisher_manga` (
  `p_id` int NOT NULL,
  `m_id` int NOT NULL,
  PRIMARY KEY (`p_id`, `m_id`),
  CONSTRAINT `FK_PUBLISHER_PM` FOREIGN KEY (`p_id`) REFERENCES `publisher` (`p_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_MANGA_PM` FOREIGN KEY (`m_id`) REFERENCES `manga` (`m_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Category Table

CREATE TABLE `category` (
  `c_id` int NOT NULL AUTO_INCREMENT,
  `c_name` varchar(512) NOT NULL,
  PRIMARY KEY (`c_id`)
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Create Category Manga Junction Table

CREATE TABLE `category_manga` (
  `c_id` int NOT NULL,
  `m_id` int NOT NULL,
  PRIMARY KEY (`c_id`, `m_id`),
  CONSTRAINT `FK_CATEGORY_CM` FOREIGN KEY (`c_id`) REFERENCES `category` (`c_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_MANGA_CM` FOREIGN KEY (`m_id`) REFERENCES `manga` (`m_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Follow Table

CREATE TABLE `follow` (
  `user_id` int NOT NULL,
  `a_id` int NOT NULL,
  PRIMARY KEY (`user_id`, `a_id`),
  CONSTRAINT `FK_USER_F` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_AUTHOR_F` FOREIGN KEY (`a_id`) REFERENCES `author` (`a_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Rate Table

CREATE TABLE `rate` (
  `r_id` int NOT NULL AUTO_INCREMENT,
  `r_value` decimal(2,1) DEFAULT 0.0,
  `r_date` datetime NOT NULL,
  `r_comment` varchar(5120) DEFAULT NULL,
  `user_id` int NOT NULL,
  `m_id` int NOT NULL,
  PRIMARY KEY (`r_id`),
  CONSTRAINT `FK_USER_R` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_MANGA_R` FOREIGN KEY (`m_id`) REFERENCES `manga` (`m_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Create Already Read Table

CREATE TABLE `already_read` (
  `user_id` int NOT NULL,
  `m_id` int NOT NULL,
  `added_date` datetime NOT NULL,
  PRIMARY KEY (`user_id`, `m_id`),
  CONSTRAINT `FK_USER_AR` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_MANGA_AR` FOREIGN KEY (`m_id`) REFERENCES `manga` (`m_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create wishlist Table

CREATE TABLE `wishlist` (
  `user_id` int NOT NULL,
  `m_id` int NOT NULL,
  `added_date` datetime NOT NULL,
  PRIMARY KEY (`user_id`, `m_id`),
  CONSTRAINT `FK_USER_W` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_MANGA_W` FOREIGN KEY (`m_id`) REFERENCES `manga` (`m_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create ongoing Table

CREATE TABLE `ongoing` (
  `user_id` int NOT NULL,
  `m_id` int NOT NULL,
  `added_date` datetime NOT NULL,
  PRIMARY KEY (`user_id`, `m_id`),
  CONSTRAINT `FK_USER_OG` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_MANGA_OG` FOREIGN KEY (`m_id`) REFERENCES `manga` (`m_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Search History Table

CREATE TABLE `search_history` (
  `sh_id` int NOT NULL AUTO_INCREMENT,
  `sh_date` datetime NOT NULL,
  `sh_search` varchar(512) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`sh_id`),
  CONSTRAINT `FK_USER_SH` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
  
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_0900_ai_ci;