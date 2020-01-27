TRUNCATE TABLE instances;
TRUNCATE TABLE instance_encounters;
TRUNCATE TABLE instance_debuff_slots;

INSERT INTO instances(id, display_name) VALUES(1, 'Molten Core');

INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(1, 1, 'Trash');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(2, 1, 'Lucifron');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(3, 1, 'Magmadar');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(4, 1, 'Gehennas');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(5, 1, 'Garr');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(6, 1, 'Baron Geddon');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(7, 1, 'Shazzrah');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(8, 1, 'Sulfuron Harbinger');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(9, 1, 'Golemagg');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(10, 1, 'Majordomo Executus');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(11, 1, 'Ragnaros');

INSERT INTO instances(id, display_name) VALUES(2, 'Onyxia''s Lair');

INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(12, 2, 'Trash');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(13, 2, 'Onyxia');

INSERT INTO instances(id, display_name) VALUES(3, 'Blackwing Lair');

INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(14, 3, 'Trash');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(15, 3, 'Suppression');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(16, 3, 'Lab Packs');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(17, 3, 'Wyrmguards');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(18, 3, 'Garr');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(19, 3, 'Razorgore');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(20, 3, 'Vaelastrazs');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(21, 3, 'Broodlord');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(22, 3, 'Firemaw');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(23, 3, 'Ebonroc');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(24, 3, 'Flamegor');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(25, 3, 'Chromaggus');
INSERT INTO instance_encounters(id, instance_id, display_name) VALUES(26, 3, 'Nefarian');

INSERT INTO instances(id, display_name) VALUES(4, 'Zul''Gurub');
INSERT INTO instances(id, display_name) VALUES(5, 'Temple of Ahn''Qiraj');
INSERT INTO instances(id, display_name) VALUES(6, 'Ruins of Ahn''Qiraj');
INSERT INTO instances(id, display_name) VALUES(7, 'Naxxramas');