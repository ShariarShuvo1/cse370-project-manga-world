-- Drop user first if they exist
DROP USER if exists 'cse370_admin'@'localhost' ;

-- Create user
CREATE USER 'cse370_admin'@'localhost' IDENTIFIED BY 'cse370_pass';

-- Grant all privileges to the user
GRANT ALL PRIVILEGES ON * . * TO 'cse370_admin'@'localhost';