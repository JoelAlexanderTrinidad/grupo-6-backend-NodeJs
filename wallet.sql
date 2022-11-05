CREATE TABLE `transactions` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `user_id` integer NOT NULL,
  `category_id` integer NOT NULL,
  `date` date NOT NULL,
  `create_at` timestamp DEFAULT now()
);
