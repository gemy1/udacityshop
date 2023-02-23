CREATE TABLE IF NOT EXISTS users(
    id serial primary key,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL
    );