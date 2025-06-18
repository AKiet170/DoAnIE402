SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

-- Bước 1: Tạo Building với ID = 1
INSERT INTO building (buildingid, name, lod)
VALUES (1, 'Default Building', 1)
ON CONFLICT DO NOTHING;

-- Bước 2: Tạo Floor với floorid = 1, buildingid = 1
INSERT INTO floor (floorid, number, buildingid)
VALUES (1, 1, 1)
ON CONFLICT DO NOTHING;

INSERT INTO color (colorid, name, value)
VALUES (1, 'Default White', '#FFFFFF')
ON CONFLICT DO NOTHING;

SELECT * FROM bodycomp;
SELECT * FROM face;
SELECT * FROM point;

-- Xem một body gồm những face nào
SELECT b.name AS body, f.name AS face
FROM bodycomp b
JOIN face_body fb ON b.bodyid = fb.bodyid
JOIN face f ON f.faceid = fb.faceid
LIMIT 10;

-- Kiểm tra một face gồm các điểm nào
SELECT f.name AS face, p.x, p.y, p.z
FROM face f
JOIN face_node fn ON f.faceid = fn.faceid
JOIN node n ON fn.nodeid = n.nodeid
JOIN point p ON n.pointid = p.pointid
LIMIT 10;