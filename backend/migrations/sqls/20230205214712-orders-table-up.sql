CREATE TABLE IF NOT EXISTS orders(
    id SERIAL primary key,
    status varchar(15),
    user_id bigint REFERENCES users(id)
);