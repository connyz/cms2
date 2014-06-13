-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.5.32 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             8.3.0.4694
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for cms2
CREATE DATABASE IF NOT EXISTS `cms2` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `cms2`;


-- Dumping structure for table cms2.articles
CREATE TABLE IF NOT EXISTS `articles` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `publicationDate` date NOT NULL,
  `categoryId` smallint(5) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `summary` text NOT NULL,
  `content` mediumtext NOT NULL,
  `Status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Dumping data for table cms2.articles: ~12 rows (approximately)
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` (`id`, `publicationDate`, `categoryId`, `title`, `summary`, `content`, `Status`) VALUES
	(3, '2014-06-01', 1, 'Amazeballs?', 'Just trying to answer this', 'So well where does the expression amazeballs come from?', 'PUBLISHED'),
	(5, '2014-01-01', 1, 'hej', 'hej', 'hej', 'PUBLISHED'),
	(6, '2014-08-03', 1, 'Mobil', 'Hur funkar de?', 'Ja jag stÃ¤ller mig frÃ¥gan vilket Ã¤r jÃ¤ttekul heghehe. Men sÃ¥ Ã¤r det inte Ã¤ndÃ¥.', 'PUBLISHED'),
	(8, '2014-06-19', 1, 'Balls', 'Balls balls', 'Yo waddup peeps', 'PUBLISHED'),
	(15, '2014-06-11', 0, 'Today is great!', 'What happened?', 'Yea i will tell ya if ya just hold your horses.', 'PUBLISHED'),
	(22, '2014-06-12', 0, 'Weather today', 'Is a sunny warm day', 'So what it to ya? You lookin at me? Didnt think so.', 'PUBLISHED'),
	(24, '2014-06-12', 0, 'Whoa', 'Major event today', 'You will never guess what happened today. I was out walking and..', 'PUBLISHED'),
	(25, '2014-06-12', 0, 'A litte list', 'Cars n stuff', 'Cars i like. \n\n1. Toyota.\n2. Skoda\n3. Citroen', 'PUBLISHED'),
	(28, '2014-06-13', 0, 'Draft22', 'testst', 'blblalblal', 'DRAFT'),
	(29, '2014-06-12', 0, 'Draft464', 'hehehe', 'kekeke', 'DRAFT'),
	(30, '2014-06-11', 0, 'Draft111', 'No es no', 'heyaheyaheya', 'DRAFT'),
	(31, '2014-06-13', 0, 'TestDraft2', 'Burgers', 'I like em!', 'DRAFT');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;


-- Dumping structure for table cms2.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Dumping data for table cms2.categories: ~1 rows (approximately)
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `name`, `description`) VALUES
	(1, 'DOGs', 'This is a tag about Dogs');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;


-- Dumping structure for table cms2.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table cms2.users: ~1 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `password`) VALUES
	(1, 'BigC', '1234'),
	(2, 'BigV', '1234');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
