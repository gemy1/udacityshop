CREATE TABLE IF NOT EXISTS products(
    id serial primary key,
    name varchar(255) NOT NULL,
    description TEXT NOT NULL,
    price float NOT NULL,
    category varchar(50));