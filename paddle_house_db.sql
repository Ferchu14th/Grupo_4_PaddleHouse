-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2022 at 12:56 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `paddle_house_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `qty` int(10) NOT NULL,
  `warehouse` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `name`, `qty`, `warehouse`) VALUES
(1, 'PALETA ADIDAS', 5, 'Flores'),
(2, 'PALETA KELME', 4, 'San isidro'),
(3, 'PALETA ADIDAS', 5, 'Rafael Castillo'),
(4, 'ACCESORIO ADIDAS', 7, 'Flores'),
(5, 'ACCESORIO NEXUS', 10, 'San isidro'),
(6, 'ACCESORIO ADIDAS', 5, 'Rafael Castillo'),
(8, 'BOLSO-PALETERO ADIDAS', 3, 'Flores'),
(9, 'BOLSO-PALETERO ADIDAS', 10, 'San isidro'),
(10, 'BOLSO-PALETERO ADIDAS', 10, 'Rafael Castillo');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `inventory_id` int(10) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category`, `description`, `image`, `price`, `brand`, `inventory_id`, `model`) VALUES
(1, 'PALETA', 'Paleta ultra liviana especial para damas', '1658613375355.jpg', 35000, 'ADIDAS', 1, 'MatchLigth'),
(2, 'PALETA', 'Paleta sin vibraciones, ultra compacta.', '1663640807978.jpg', 22500, 'KELME', 1, 'Falcon'),
(3, 'paleta', 'Paleta liviana especial para jóvenes', '1663689535635.jpg', 20000, 'kelme', 1, 'negra'),
(4, 'ACCESORIOS', 'Estuche por 60', '1658360213826.jpg', 1650, 'SOFTEE', 1, 'Cubre Grip Confort 100'),
(5, 'ACCESORIOS', 'Nexus Blanco Estuche de 60 unidades', '1665002298261.jpg', 1450, 'NEXUSA', 1, 'Grip Paddle Performance Blanco'),
(6, 'ACCESORIOS', 'Estuche de Grid Adidas color rojo para mangos de paletas de padel', '1665002335797.jpg', 250, 'ADIDAS', 1, 'Grid Paddle Performance Rojo'),
(7, 'BOLSOS-PALETERO', 'Bolso para paletas de padel impermeable de gran capacidad', '1658526842632.jpg', 19810, 'ADIDAS', 1, 'Multigame Lite White C'),
(8, 'BOLSOS-PALETERO', 'Bolso para paletas de padel color blanco individual', '1658527023807.jpg', 15430, 'ADIDAS', 1, 'Weekend White'),
(9, 'BOLSOS-PALETERO', 'Bolso para paletas de padel casual individual', '1658527157663.jpg', 16100, 'ADIDAS', 1, 'Weekend green');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `avatar`, `isAdmin`) VALUES
(27, 'Admin', 'pruebaAdmin@gmail.com', '$2a$12$YbOSydoJ.tuVJnIJ/kG5.eeB.1TyOS5B9vbkdAgaon0aoq1DfzF6a', 'image-1665002268981.jpg', 1),
(28, 'UserNormal', 'User@gmail.com', '$2a$10$iTrXRi4gnU2gwWza96XoSumQ59dFtWBCSl5OrliwB1800EziXmmk6', 'image-1663023482122.jpg', 0),
(32, 'User3', 'user3@hotmail.com', '$2a$10$/5853MznfIb.TXXTbADDd.fYv2haXM1etHSyCorhxJ6kGuQ9USp6G', 'image-1665096096820.jpg', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_FK` (`inventory_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `category_FK` FOREIGN KEY (`inventory_id`) REFERENCES `inventory` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
