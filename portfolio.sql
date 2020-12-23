DROP DATABASE IF EXISTS Portfolio;
CREATE DATABASE Portfolio;
\c portfolio

DROP TABLE IF EXISTS public.Users;
CREATE TABLE public.Users
(
    id SERIAL PRIMARY KEY NOT NULL,
    first_name varchar(100),
    last_name varchar(100),
    email TEXT,
    password TEXT
);

INSERT INTO public.Users (
    first_name,
    last_name,
    email,
    password
)
VALUES (
    'admin',
    'admin',
    'adresse@mail.com',
    '$2b$10$BHoNLZSU1Q5fntQNQ5pyluhtlduIyz8dCoJD7sNzxXqUuCYzu3BJO'
);