CREATE TABLE flavors (
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(60),
    category VARCHAR(30),
    description TEXT,
    quantity INTEGER,
	
    createdAt TIMESTAMP not null CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- creates reservations table -- 
CREATE TABLE reservations (
    id INTEGER auto_increment NOT NULL,
    customerName VARCHAR(60) DEFAULT NULL,
    customerEmail VARCHAR(30) DEFAULT NULL, 
    phoneNumber VARCHAR(30) DEFAULT NULL,
    flavor VARCHAR(30) DEFAULT NULL,
    reserved BOOLEAN DEFAULT false,
	
    createdAt TIMESTAMP not null default CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
-- waitlist table creation -- 
CREATE TABLE waitlist (
    id INTEGER AUTO_INCREMENT NOT NULL,
    customerName VARCHAR(60) DEFAULT NULL,
    customerEmail VARCHAR(30) DEFAULT NULL, 
    phoneNumber VARCHAR(30) DEFAULT NULL,
    flavor VARCHAR(30) DEFAULT NULL,
	
    createdAt TIMESTAMP not null default CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);