-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Nov 30, 2025 at 09:29 AM
-- Server version: 8.0.44
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations_are_us_db`
--
CREATE DATABASE IF NOT EXISTS `vacations_are_us_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `vacations_are_us_db`;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `vacation_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`user_id`, `vacation_id`, `created_at`, `updated_at`) VALUES
('8cafe52d-ec83-4d7a-aae4-b9e0a4694dcf', '7632e323-8053-4309-a8ea-057e3f5a2fd6', '2025-11-30 08:52:17', '2025-11-30 08:52:17'),
('8cafe52d-ec83-4d7a-aae4-b9e0a4694dcf', '7e4726c0-f11f-472c-943d-2313c24ef7a5', '2025-11-30 08:52:16', '2025-11-30 08:52:16'),
('8cafe52d-ec83-4d7a-aae4-b9e0a4694dcf', 'b0bb10f5-1eab-44eb-a668-7da1e8178b38', '2025-11-30 08:52:20', '2025-11-30 08:52:20'),
('8cafe52d-ec83-4d7a-aae4-b9e0a4694dcf', 'b3888b32-34b8-41a2-b000-39a21be87011', '2025-11-30 09:21:25', '2025-11-30 09:21:25'),
('d2cf517d-fb11-4c9f-af9c-296747db0aca', 'b0bb10f5-1eab-44eb-a668-7da1e8178b38', '2025-11-30 08:12:11', '2025-11-30 08:12:11'),
('d2cf517d-fb11-4c9f-af9c-296747db0aca', 'b3888b32-34b8-41a2-b000-39a21be87011', '2025-11-30 08:12:16', '2025-11-30 08:12:16');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `created_at`, `updated_at`) VALUES
('0e301faa-ad5b-43d7-87a0-dc2e10d04831', 'USER', '2025-11-27 18:02:08', '2025-11-27 18:02:08'),
('89e0d123-de15-47df-b748-71d7adc22c65', 'ADMIN', '2025-11-27 18:02:08', '2025-11-27 18:02:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role_id`, `created_at`, `updated_at`) VALUES
('0329f786-a614-4000-9192-adf439a630e3', 'Admin', 'admin', 'admin@gmail.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', '89e0d123-de15-47df-b748-71d7adc22c65', '2025-11-27 20:20:23', '2025-11-27 20:20:23'),
('8cafe52d-ec83-4d7a-aae4-b9e0a4694dcf', 'Michael', 'Uzan', 'mu@gmail.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', '0e301faa-ad5b-43d7-87a0-dc2e10d04831', '2025-11-29 19:45:24', '2025-11-29 19:45:24'),
('d2cf517d-fb11-4c9f-af9c-296747db0aca', 'anotherOne', 'AnotherOne', 'au@gmail.com', '7f7737fddd2842bc2afdbf1868aaa8e986b83133a1f010fe96535c15e4584628', '0e301faa-ad5b-43d7-87a0-dc2e10d04831', '2025-11-29 22:27:48', '2025-11-29 22:27:48');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `destination` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `price` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `start_time`, `end_time`, `price`, `image_url`, `created_at`, `updated_at`) VALUES
('3f7a9590-117d-4382-a246-6a74cf1d6c99', 'Manali\r\n', 'Nestled on the banks of River Beas, Manali will take your breath away with its snow-kissed peaks, lush valleys and heart-pumping adventure experiences in the heart of Himalayas.\r\n', '2025-12-03 09:19:00', '2026-01-13 09:19:00', 1197, '/images-vacations-r-us/3fa77d7a-76af-446a-8c25-1df5a969202a.jpeg', '2025-11-30 09:19:52', '2025-11-30 09:19:52'),
('595b726a-9724-46b9-b2f9-d78692771e97', 'Havelock Island', 'Also known as Swaraj Island, Havelock Island is a part of Ritchie’s Archipelago in the Andamans. Its dazzling white sand beaches and fascinating coral reefs are admired by nature lovers from around the world.', '2025-12-04 09:20:00', '2026-02-26 09:20:00', 700, '/images-vacations-r-us/390735a2-3650-4fb2-b722-66a63113d270.jpeg', '2025-11-30 09:20:50', '2025-11-30 09:20:50'),
('5dbcdaeb-0430-4ebb-8964-1cb38dd0bb51', 'Istanbul', 'With History dating back to Ancient Greeks and varied landscape, Istanbul is home to delightful cuisine, a rich culture, and sights that will take your breath away.', '2025-12-19 09:17:00', '2026-02-03 09:15:00', 350, '/images-vacations-r-us/588cf8ff-ced7-4a49-9049-38a104cad463.jpeg', '2025-11-30 09:16:20', '2025-11-30 09:16:20'),
('646a5f04-51ca-487d-9a98-5d6b25054a55', 'Israel', 'unbelivielalelakesdfsfas', '2025-11-30 07:44:00', '2026-01-22 07:32:00', 9996, '/images-vacations-r-us/c234d5c8-2936-4829-8ec7-5eb3093d3740.jpg', '2025-11-30 07:32:44', '2025-11-30 07:32:44'),
('7632e323-8053-4309-a8ea-057e3f5a2fd6', 'Barcelona', 'Founded as a Roman city, present day Barcelona is the capital of Spain\'s Catalonia region. Standing as an embodiment of model architecture and classic art, the city is known for its many attractions designed by Antoni Gaudi.', '2025-12-03 08:13:00', '2025-12-31 08:13:00', 2222, '/images-vacations-r-us/8a05bc90-ecea-4d10-b9a0-1ee5e830c143.jpeg', '2025-11-30 08:13:38', '2025-11-30 09:18:09'),
('7e4726c0-f11f-472c-943d-2313c24ef7a5', 'Bali', 'An exotic tropical destination that flaunts scenic beaches and mountains, Bali is deep-rooted in culture and tradition, which adds to the charm of this scenic island.', '2025-12-03 07:38:00', '2025-12-24 07:38:00', 5553, '/images-vacations-r-us/e1e3c9c6-7626-4c00-8bef-5afe431b3991.jpeg', '2025-11-30 07:39:19', '2025-11-30 09:18:34'),
('8766c07c-05f3-475d-ac4d-d0955fce7277', 'Rome', 'romeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', '2025-12-01 07:31:00', '2025-12-04 07:31:00', 111, '/images-vacations-r-us/e3fa3496-21d5-4341-acfa-22753292f2e4.jpg', '2025-11-30 07:31:55', '2025-11-30 07:31:55'),
('9e7526fc-61de-4bdc-a442-9d5ca0bd9845', 'Varkala', 'Flaunting one of the best cliff beaches in Kerala, Varkala is a lesser known yet absolutely paradisiacal destination that houses forts, pilgrimage sites, springs, natural fisheries and more.', '2025-11-30 09:19:00', '2025-12-05 09:17:00', 1754, '/images-vacations-r-us/d29097ee-4abf-4c83-b7a4-b99c12051224.jpeg', '2025-11-30 09:17:21', '2025-11-30 09:17:21'),
('b0bb10f5-1eab-44eb-a668-7da1e8178b38', 'Jerusalem', 'if i ever forget youuuuuuuuuuuuuuuuuuuuuuuuu', '2025-12-02 07:32:00', '2025-12-05 07:33:00', 8888, '/images-vacations-r-us/0b05d146-5faa-4ba7-a391-892151dd95eb.jpg', '2025-11-30 07:33:32', '2025-11-30 07:33:32'),
('b3888b32-34b8-41a2-b000-39a21be87011', 'Greece', 'santonininininiiiiiiiiiiiiiiiiiiiiii', '2026-02-18 07:39:00', '2026-04-01 06:39:00', 2222, '/images-vacations-r-us/31ed178e-1b0e-4e18-a5ca-9f3a1c327c66.jpeg', '2025-11-30 07:41:03', '2025-11-30 07:41:03'),
('dd21895b-85f2-45f7-a4a4-9605a9cc72c4', 'Aleppey', 'Also known as Alappuzha, Aleppey will take your breath away with its emerald green backwaters, palm-fringed lakes and beautiful stretches of lush paddy fields in the heart of Kerala.', '2025-12-17 09:24:00', '2026-03-26 09:24:00', 4444, '/images-vacations-r-us/c6a08573-f309-42e4-b755-0c0c5a09d914.jpeg', '2025-11-30 09:24:41', '2025-11-30 09:24:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`user_id`,`vacation_id`),
  ADD UNIQUE KEY `follows_vacationId_userId_unique` (`user_id`,`vacation_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
