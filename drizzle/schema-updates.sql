-- Add spreadsheet configuration table
CREATE TABLE IF NOT EXISTS `spreadsheet_config` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `spreadsheet_id` VARCHAR(255) NOT NULL UNIQUE,
  `spreadsheet_url` VARCHAR(500) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add contact submissions table
CREATE TABLE IF NOT EXISTS `contact_submissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `contact` VARCHAR(255) NOT NULL,
  `revenue` VARCHAR(255),
  `situation` TEXT,
  `submission_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `spreadsheet_row_id` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
