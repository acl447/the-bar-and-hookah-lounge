-- Drops the hookah_flavorsDB if it exists currently --
DROP DATABASE IF EXISTS hookah_flavorsDB;
-- Creates the "hookah_flavorsDB" database --
CREATE DATABASE hookah_flavorsDB;

USE hookah_flavorsDB;
CREATE TABLE flavors (
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(60),
    category VARCHAR(30),
    description TEXT,
    quantity INTEGER,

    PRIMARY KEY (id)
);

CREATE TABLE reservations (
    id INTEGER AUTO_INCREMENT NOT NULL,
    customerName VARCHAR(60),
    customerEmail VARCHAR(30),
    customerID VARCHAR(30),
    phoneNumber VARCHAR(30),

    PRIMARY KEY (id)
);

CREATE TABLE waitlist (
    id INTEGER AUTO_INCREMENT NOT NULL,
    customerName VARCHAR(60),
    customerEmail VARCHAR(30),
    customerID VARCHAR(30),
    phoneNumber VARCHAR(30),

    PRIMARY KEY (id)
);