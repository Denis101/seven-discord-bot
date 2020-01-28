CREATE TABLE IF NOT EXISTS raids (
    id SERIAL PRIMARY KEY,
    instance_id NUMERIC,
    team_id NUMERIC,
    display_name VARCHAR (64) NOT NULL,
    description VARCHAR (255),
    day VARCHAR(15),
    time VARCHAR(15),
    create_date TIMESTAMP,
    modified_date TIMESTAMP,
    delete_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    role_id VARCHAR (64) NOT NULL,
    display_name VARCHAR(64),
    create_date TIMESTAMP,
    modified_date TIMESTAMP,
    delete_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR (64) NOT NULL,
    team_id NUMERIC,
    display_name VARCHAR (255) NOT NULL,
    class VARCHAR (10) NOT NULL,
    is_tank BOOLEAN,
    is_healer BOOLEAN,
    is_main BOOLEAN,
    create_date TIMESTAMP,
    modified_date TIMESTAMP,
    delete_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS character_assignments (
    id SERIAL PRIMARY KEY,
    type VARCHAR (50) NOT NULL,
    character_id NUMERIC NOT NULL,
    spell_id NUMERIC NOT NULL,
    order_number NUMERIC,
    is_backup BOOLEAN,
    create_date TIMESTAMP,
    modified_date TIMESTAMP,
    delete_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS character_assignment_groups (
    id SERIAL PRIMARY KEY,
    character_assignment_id NUMERIC,
    group_1 BOOLEAN,
    group_2 BOOLEAN,
    group_3 BOOLEAN,
    group_4 BOOLEAN,
    group_5 BOOLEAN,
    group_6 BOOLEAN,
    group_7 BOOLEAN,
    group_8 BOOLEAN,
    create_date TIMESTAMP,
    modified_date TIMESTAMP,
    delete_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS character_assignments_targets (
    id SERIAL PRIMARY KEY,
    character_assignment_id NUMERIC,
    target_table VARCHAR(100),
    target_id NUMERIC,
    create_date TIMESTAMP,
    modified_date TIMESTAMP,
    delete_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS character_assignment_raid_targets (
    id SERIAL PRIMARY KEY,
    character_assignment_id NUMERIC,
    raid_target_icon_id NUMERIC,
    create_date TIMESTAMP,
    modified_date TIMESTAMP,
    delete_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS instances (
    id SERIAL PRIMARY KEY,
    display_name VARCHAR (255) NOT NULL,
);

CREATE TABLE IF NOT EXISTS instance_debuff_slots (
    id SERIAL PRIMARY KEY,
    instance_id NUMERIC,
    debuff_slot_1 NUMERIC,
    debuff_slot_2 NUMERIC,
    debuff_slot_3 NUMERIC,
    debuff_slot_4 NUMERIC,
    debuff_slot_5 NUMERIC,
    debuff_slot_6 NUMERIC,
    debuff_slot_7 NUMERIC,
    debuff_slot_8 NUMERIC,
    debuff_slot_9 NUMERIC,
    debuff_slot_10 NUMERIC,
    debuff_slot_11 NUMERIC,
    debuff_slot_12 NUMERIC,
    debuff_slot_13 NUMERIC,
    debuff_slot_14 NUMERIC,
    debuff_slot_15 NUMERIC,
    debuff_slot_16 NUMERIC,
    create_date TIMESTAMP,
    modified_date TIMESTAMP,
    delete_date TIMESTAMP
);

-- CREATE TABLE IF NOT EXISTS instance_assignments (
--     id SERIAL PRIMARY KEY,
--     type VARCHAR(10),
--     encounter_id NUMERIC NOT NULL,
--     raid_target_id NUMERIC,
--     spell_id NUMERIC,
--     order_number NUMERIC,
--     is_backup BOOLEAN
-- );

CREATE TABLE IF NOT EXISTS instance_encounters (
    id SERIAL PRIMARY KEY,
    instance_id NUMERIC NOT NULL,
    display_name VARCHAR (255) NOT NULL,
    icon_id NUMERIC,
);

CREATE TABLE IF NOT EXISTS spells (
    id SERIAL PRIMARY KEY,
    game_spell_id NUMERIC,
    display_name VARCHAR (255),
    icon_id NUMERIC,
    
);

CREATE TABLE IF NOT EXISTS icons (
    id SERIAL PRIMARY KEY,
    icon_url VARCHAR (255),
    discord_emoji VARCHAR (255)
);