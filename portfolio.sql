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
),
(
    'Jean',
    'DONG',
    'jean@dong.com',
    '$2b$10$xC1GtrzOo90/TLor44jkqeWbOvvmlwpU0v2hRe4tLg3Gd6xlF9A5W'
),
(
    'Wilfried',
    'PONNOU',
    'wilfried@ponnou.com',
    '$2b$10$xC1GtrzOo90/TLor44jkqeWbOvvmlwpU0v2hRe4tLg3Gd6xlF9A5W'
)
;