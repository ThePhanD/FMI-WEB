-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2021 at 06:28 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `room_name` varchar(16) NOT NULL,
  `rowNumber` int(11) NOT NULL,
  `colNumber` int(11) NOT NULL,
  `creator` varchar(32) NOT NULL,
  `music` varchar(64) NOT NULL,
  `places` varchar(2056) NOT NULL,
  `isActive` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`room_name`, `rowNumber`, `colNumber`, `creator`, `music`, `places`, `isActive`) VALUES
('4Room', 2, 2, 'admin_magi', '4Music', '1111', 0),
('FMI-Room', 5, 10, 'admin_magi', 'FMI-Music', '10101010100101010101101010101001010101011010101010', 0),
('room101', 5, 4, 'admin_user', 'WebIsTheBest', '11110100111001101101', 0),
('SpecialRoom', 10, 10, 'admin_magi', 'SpecialMusic', '1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111', 0),
('TestRoom', 3, 3, 'admin_magi', 'TestMusic', '111000111', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `isAdmin` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `username`, `password`, `email`, `isAdmin`) VALUES
(7, 'admin_magi', '$2y$10$gtA9HyWvq2NQPgymyv0DoOij851EGUC0z1t7omoe/8ZBxBh2lpbJy', 'magi@abv.bg', 1),
(12, 'admin_ivan', '$2y$10$1OespRyYn.Arsk8aN0cWceYFSNiqtx/P7NS.oCuObibGqSonwxTha', 'ivan@abv.bg', 1),
(17, 'admin_4LastTime', '$2y$10$tXVDpKHmPOx7C0MGbPYBZe1CsYKdWLVR1/TVXdTo3m0j02ETT.NDa', 'lastTimeFour@abv.bg', 1),
(22, 'gosho', '$2y$10$KtJJUzPEPA6ZtXmvVtXJjOmxcZBSqE53u/b5.mJwBSBZBtrinLjSS', 'gosho@gmail.com', 0),
(27, 'magdalena', '$2y$10$gvTA4OmvY5amsqIeAtdg9.ln7zb6LTj.zdww8fwgWnOH6FF7qsHvy', 'magdalena@yahoo.com', 0),
(32, 'AzNishoNeZnam', '$2y$10$0xrVFlQ1EPVZxjuOrGfmnueaQ3HuAjCD2Xix91EJPk.pTcon3gsfG', 'aznishoneznam@abv.bg', 0),
(37, 'Sesiq2021', '$2y$10$I549WxVMSzkLh9YsxDpko.YfIXbX4WxOh8WfL9kbSnSV2Or0Y4ThK', 'sesiq@abv.bg', 0),
(42, 'TheBestLektor', '$2y$10$czYr9fv6eYJZRfya4ITOROjUFBADAtqORm8WyW9I/Tg496jcAJvqm', 'lektor@gmail.com', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
