CREATE TABLE `listings` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`owner_id` bigint unsigned NOT NULL,
	`category` varchar(191) NOT NULL,
	`country` varchar(191) NOT NULL,
	`state` varchar(191) NOT NULL,
	`city` varchar(191) NOT NULL,
	`postal_code` varchar(191) NOT NULL,
	`address_line_1` text NOT NULL,
	`address_line_2` text,
	`guests_count` int NOT NULL,
	`bedrooms_count` int NOT NULL,
	`beds_count` int NOT NULL,
	`baths_count` int NOT NULL,
	`image_csv` text NOT NULL,
	`title` varchar(191) NOT NULL,
	`description` text NOT NULL,
	`price` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP);

CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(191) NOT NULL,
	`email` varchar(191) NOT NULL,
	`email_verified` datetime,
	`image` text,
	`password` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`is_mock_account` boolean NOT NULL DEFAULT false);

ALTER TABLE listings ADD CONSTRAINT listings_owner_id_users_id_fk FOREIGN KEY (`owner_id`) REFERENCES users(`id`) ON DELETE cascade ;
CREATE UNIQUE INDEX email_idx ON users (`email`);