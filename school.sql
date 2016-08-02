-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2016 at 09:52 PM
-- Server version: 5.5.47-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `school`
--
CREATE DATABASE IF NOT EXISTS `school` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `school`;

-- --------------------------------------------------------

--
-- Table structure for table `names`
--

CREATE TABLE IF NOT EXISTS `names` (
  `IDnumber` int(11) NOT NULL DEFAULT '0',
  `Lastname` varchar(10) DEFAULT NULL,
  `Firstname` varchar(9) DEFAULT NULL,
  `Birthday` datetime DEFAULT NULL,
  PRIMARY KEY (`IDnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `names`
--

INSERT INTO `names` (`IDnumber`, `Lastname`, `Firstname`, `Birthday`) VALUES
(100, 'McGonigle', 'Minerva', '1997-10-25 00:00:00'),
(101, 'Snape', 'Severus', '1999-08-08 00:00:00'),
(102, 'Jaffe', 'Roger', '1998-08-23 00:00:00'),
(103, 'Riddle', 'Tom', '1999-02-01 00:00:00'),
(104, 'Weasley', 'Ronald', '1998-12-11 00:00:00'),
(105, 'Trelawney', 'Sybil', '1998-05-13 00:00:00'),
(106, 'Lupin', 'Remus', '1999-11-30 00:00:00'),
(107, 'Potter', 'Harry', '1997-05-09 00:00:00'),
(108, 'Hagrin', 'Norbert', '1998-02-13 00:00:00'),
(109, 'Sprout', 'Pomona', '1997-08-28 00:00:00'),
(110, 'Pettigrew', 'Peter', '1999-09-11 00:00:00'),
(111, 'Weasley', 'Genevra', '1999-01-20 00:00:00'),
(112, 'Lestrange', 'Bellatrix', '1998-03-16 00:00:00'),
(113, 'Granger', 'Hermione', '1998-07-27 00:00:00'),
(114, 'Dumbledore', 'Albus', '1997-10-02 00:00:00'),
(115, 'Malfoy', 'Draco', '1998-07-04 00:00:00'),
(116, 'Black', 'Sirius', '1997-09-17 00:00:00'),
(117, 'Ollivander', 'Garrick', '1999-06-30 00:00:00'),
(118, 'Finnegan', 'Seamus', '1998-07-08 00:00:00'),
(119, 'Thomas', 'Dean', '1997-07-28 00:00:00'),
(120, 'Dursley', 'Dudley', '1999-02-12 00:00:00'),
(121, 'Lovegood', 'Luna', '1997-03-12 00:00:00'),
(122, 'Lockhart', 'Gildora', '1997-07-25 00:00:00'),
(123, 'Longbottom', 'Neville', '1998-11-10 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE IF NOT EXISTS `rooms` (
  `Room` int(11) NOT NULL DEFAULT '0',
  `Course` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`Room`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`Room`, `Course`) VALUES
(101, 'English'),
(102, 'CompSci'),
(103, 'Government'),
(104, 'Calculus'),
(105, 'Ceramics');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE IF NOT EXISTS `schedule` (
  `StudentId` int(11) DEFAULT NULL,
  `Period` int(11) DEFAULT NULL,
  `Room` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`StudentId`, `Period`, `Room`) VALUES
(100, 1, 101),
(101, 1, 104),
(102, 1, 102),
(103, 1, 103),
(104, 1, 105),
(105, 1, 101),
(106, 1, 104),
(107, 1, 102),
(108, 1, 103),
(109, 1, 105),
(110, 1, 101),
(111, 1, 104),
(112, 1, 102),
(113, 1, 103),
(114, 1, 105),
(115, 1, 101),
(116, 1, 104),
(117, 1, 102),
(118, 1, 103),
(119, 1, 105),
(120, 1, 101),
(121, 1, 104),
(122, 1, 102),
(100, 2, 105),
(101, 2, 102),
(102, 2, 101),
(103, 2, 101),
(104, 2, 103),
(105, 2, 104),
(106, 2, 101),
(107, 2, 104),
(108, 2, 102),
(109, 2, 103),
(110, 2, 104),
(111, 2, 103),
(112, 2, 105),
(113, 2, 102),
(114, 2, 102),
(115, 2, 105),
(116, 2, 105),
(117, 2, 104),
(118, 2, 101),
(119, 2, 101),
(120, 2, 103),
(121, 2, 103),
(122, 2, 105),
(100, 3, 102),
(101, 3, 105),
(102, 3, 105),
(103, 3, 104),
(104, 3, 101),
(105, 3, 105),
(106, 3, 103),
(107, 3, 101),
(108, 3, 104),
(109, 3, 102),
(110, 3, 102),
(111, 3, 101),
(112, 3, 103),
(113, 3, 105),
(114, 3, 103),
(115, 3, 102),
(116, 3, 102),
(117, 3, 103),
(118, 3, 102),
(119, 3, 104),
(120, 3, 105),
(121, 3, 101),
(122, 3, 103),
(100, 4, 103),
(101, 4, 103),
(102, 4, 103),
(103, 4, 102),
(104, 4, 102),
(105, 4, 102),
(106, 4, 102),
(107, 4, 103),
(108, 4, 101),
(109, 4, 101),
(110, 4, 103),
(111, 4, 102),
(112, 4, 101),
(113, 4, 101),
(114, 4, 101),
(115, 4, 103),
(116, 4, 103),
(117, 4, 101),
(118, 4, 104),
(119, 4, 103),
(120, 4, 102),
(121, 4, 105),
(122, 4, 101);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
