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
  `title` varchar(2000) NOT NULL,
  `summary` text NOT NULL,
  `content` mediumtext NOT NULL,
  `Status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Dumping data for table cms2.articles: ~16 rows (approximately)
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` (`id`, `publicationDate`, `categoryId`, `title`, `summary`, `content`, `Status`) VALUES
	(3, '2014-06-01', 1, 'Amazeballs? 22', 'Just trying to answer this so what. Bla bla bal lorem ipsum. What is that? Dont ask me.', 'So well where does the expression amazeballs come from?', 'PUBLISHED'),
	(8, '2014-06-19', 1, 'Fighterpilot', 'In the sky far above. Who decides who lives? Delvning into questions.', 'Yo waddup peeps', 'DRAFT'),
	(15, '2014-06-11', 2, 'Today is great!', 'What happened? Well this article is about when something unexpected happens.', 'Yea i will tell ya if ya just hold your horses.', 'PUBLISHED'),
	(22, '2014-06-12', 2, 'Weather today', 'Is a sunny warm day isnt it? What protection do we need to be safe from the sun?', 'So what it to ya? You lookin at me? Didnt think so.', 'PUBLISHED'),
	(24, '2014-06-12', 2, 'Whoa', 'Major event today. Depeche mode is coming to town and its gonne be awesome!', 'You will never guess what happened today. I was out walking and..', 'PUBLISHED'),
	(25, '2014-06-12', 2, 'A litte list', 'This blogpost is about when to quit listing things..', 'Cars i like. \n\n1. Toyota.\n2. Skoda\n3. Citroen', 'PUBLISHED'),
	(28, '2014-06-13', 1, 'Draft22', 'This is a boring draft summary', 'blblalblal', 'DRAFT'),
	(29, '2014-06-12', 1, 'Shit happens', 'Oops i think i screwed up.. Dont ever do this..', 'kekeke', 'PUBLISHED'),
	(30, '2014-06-11', 2, 'Främlingar på stan', 'Hej hur är läget frågade en snubbe idag. Varför kan man undra..', 'Draft111 Updated!\nAGAIN', 'PUBLISHED'),
	(34, '2014-06-13', 2, 'Testing draft functions', 'This is cool. You know programming and stuff.', 'Yea i can only agree on that statement. Rocknroll! 112', 'PUBLISHED'),
	(35, '2014-06-13', 1, 'Draftr 8888', '64546', 'gdfgdfg', 'DRAFT'),
	(38, '2014-06-18', 1, 'Preparing for the unpreparable', 'Sometimes you cant prepare for the things that come your way..', '<p>Nunc a ipsum tellus. Aenean hendrerit malesuada sem at convallis. Nulla a nulla et sem fringilla sodales quis non felis. Nam aliquam erat in enim bibendum, quis porttitor turpis condimentum. Nunc pulvinar quam ullamcorper purus fermentum, quis placerat orci convallis. Donec mattis posuere tortor non semper. Duis auctor nisl at pulvinar tempor. Aliquam tincidunt magna libero, vitae sodales nibh imperdiet eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse id nisi ipsum. Etiam nec nibh viverra, facilisis mauris sit amet, fermentum augue. Duis neque dolor, mollis a luctus sit amet, adipiscing eget nunc. Yesssir. Balls.</p>\n', 'PUBLISHED'),
	(40, '2014-06-18', 1, 'Crows and cats', 'Animals', 'I like curry and cheese.', 'DRAFT'),
	(42, '2014-06-17', 2, 'terst 55522', 'asdf', 'asdfasdfasf', 'DRAFT'),
	(60, '2014-06-27', 1, 'draftdraftdraft', '345345345', '<p>345345345345 burgers eyoooo</p>\n', 'DRAFT'),
	(62, '2014-06-30', 3, 'I like birds', 'Thats why i am writing an article about them..', '<p>Sed tortor felis, rhoncus a congue sed, sollicitudin eu nisl. Curabitur adipiscing, purus vitae molestie bibendum, nisl augue lacinia lorem, id lacinia neque est et erat. Aenean rhoncus nisi id dolor gravida, non pellentesque sem dignissim. Vestibulum facilisis, neque vitae accumsan luctus, tortor tellus sollicitudin ante, at tempor arcu urna vel felis. Maecenas vitae sem orci. Nam pharetra suscipit felis sed interdum. Suspendisse consequat tortor in eros tristique porttitor. Phasellus quis euismod justo. Aenean auctor vitae mi a facilisis. Etiam id pellentesque mauris. Ut mattis dolor magna, vitae vestibulum elit vulputate eget.</p>\n', 'PUBLISHED');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;


-- Dumping structure for table cms2.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- Dumping data for table cms2.categories: ~3 rows (approximately)
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `name`, `description`) VALUES
	(1, 'Dogs', 'This is a tag about Dogs'),
	(2, 'Cats', 'bla bla bla ed'),
	(3, 'Birds', '');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;


-- Dumping structure for table cms2.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table cms2.users: ~2 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `password`) VALUES
	(1, 'BigC', '1234'),
	(2, 'BigV', '1234');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
