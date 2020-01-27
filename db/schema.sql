CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    role_id VARCHAR (64) NOT NULL,
    display_name VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS raids (
    id SERIAL PRIMARY KEY,
    display_name VARCHAR (64) NOT NULL,
    description VARCHAR (255),
    day VARCHAR(15),
    time VARCHAR(15),
    team_id NUMERIC
);

CREATE TABLE IF NOT EXISTS characters (
   id SERIAL PRIMARY KEY,
   user_id VARCHAR (64) UNIQUE NOT NULL,
   team_id NUMERIC,
   display_name VARCHAR (255) NOT NULL,
   class VARCHAR (10) NOT NULL,
   is_tank BOOLEAN,
   is_healer BOOLEAN,
   is_main BOOLEAN
);