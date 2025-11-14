-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Nov 04, 2025 at 08:25 AM
-- Server version: 9.4.0
-- PHP Version: 8.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `teams_meetings_db`
--
CREATE DATABASE IF NOT EXISTS `teams_meetings_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `teams_meetings_db`;

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `team_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `meet_room` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `meetings`
--

INSERT INTO `meetings` (`id`, `team_id`, `start_time`, `end_time`, `description`, `meet_room`, `created_at`, `updated_at`) VALUES
('a34614c0-b957-11f0-9dfc-168e488ace6f', 'c1a6f6b2-5b10-4e4c-9f6e-18bfa04b6a6f', '2025-11-05 09:00:00', '2025-11-05 10:30:00', 'Sprint planning for Frontend Team', 'Room A', '2025-11-04 08:24:10', '2025-11-04 08:24:10'),
('a3467cea-b957-11f0-9dfc-168e488ace6f', 'c1a6f6b2-5b10-4e4c-9f6e-18bfa04b6a6f', '2025-11-06 14:00:00', '2025-11-06 15:00:00', 'Code review session', 'Room B', '2025-11-04 08:24:10', '2025-11-04 08:24:10'),
('a346c24d-b957-11f0-9dfc-168e488ace6f', '8b9f7c41-7a23-4c82-9475-8a2a18dca8d3', '2025-11-05 11:00:00', '2025-11-05 12:30:00', 'Backend API design discussion', 'Room C', '2025-11-04 08:24:10', '2025-11-04 08:24:10'),
('a346c5dc-b957-11f0-9dfc-168e488ace6f', 'b4e2c2d1-46c1-4dbf-bf07-81c89c0d1f6a', '2025-11-07 16:00:00', '2025-11-07 17:30:00', 'Server monitoring setup review', 'Room C', '2025-11-04 08:24:10', '2025-11-04 08:24:10'),
('a346c9ae-b957-11f0-9dfc-168e488ace6f', 'e3c5487a-bf75-43de-aee3-9a8b0f902e6f', '2025-11-08 10:00:00', '2025-11-08 11:00:00', 'Testing automation improvements', 'Room A', '2025-11-04 08:24:10', '2025-11-04 08:24:10');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `name`, `created_at`, `updated_at`) VALUES
('8b9f7c41-7a23-4c82-9475-8a2a18dca8d3', 'Backend Team', '2025-11-04 08:15:47', '2025-11-04 08:15:47'),
('b4e2c2d1-46c1-4dbf-bf07-81c89c0d1f6a', 'DevOps Team', '2025-11-04 08:15:47', '2025-11-04 08:15:47'),
('c1a6f6b2-5b10-4e4c-9f6e-18bfa04b6a6f', 'Frontend Team', '2025-11-04 08:15:47', '2025-11-04 08:15:47'),
('e3c5487a-bf75-43de-aee3-9a8b0f902e6f', 'QA Team', '2025-11-04 08:15:47', '2025-11-04 08:15:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `meetings`
--
ALTER TABLE `meetings`
  ADD CONSTRAINT `meetings_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
