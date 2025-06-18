-- Script SQL tạo bảng theo ERD bạn gửi

-- 1. Building
CREATE TABLE Building (
    buildingID SERIAL PRIMARY KEY,
    name TEXT,
    lod INTEGER
);

-- 2. Floor
CREATE TABLE Floor (
    floorID SERIAL PRIMARY KEY,
    number INTEGER,
    buildingID INTEGER REFERENCES Building(buildingID)
);

-- 3. Point
CREATE TABLE Point (
    pointID SERIAL PRIMARY KEY,
    x DOUBLE PRECISION,
    y DOUBLE PRECISION,
    z DOUBLE PRECISION
);

-- 4. Node
CREATE TABLE Node (
    nodeID SERIAL PRIMARY KEY,
    type TEXT,
    pointID INTEGER REFERENCES Point(pointID)
);

-- 5. Color
CREATE TABLE Color (
    colorID SERIAL PRIMARY KEY,
    name TEXT,
    value TEXT -- ví dụ: "#FFFFFF"
);

-- 6. Face
CREATE TABLE Face (
    faceID SERIAL PRIMARY KEY,
    name TEXT,
    colorID INTEGER REFERENCES Color(colorID)
);

-- 7. Face_Node (một mặt gồm nhiều node)
CREATE TABLE Face_Node (
    faceID INTEGER REFERENCES Face(faceID),
    nodeID INTEGER REFERENCES Node(nodeID),
    PRIMARY KEY (faceID, nodeID)
);

-- 8. BodyComp
CREATE TABLE BodyComp (
    bodyID SERIAL PRIMARY KEY,
    name TEXT,
    floorID INTEGER REFERENCES Floor(floorID)
);

-- 9. Face_Body (mỗi body gồm nhiều mặt)
CREATE TABLE Face_Body (
    bodyID INTEGER REFERENCES BodyComp(bodyID),
    faceID INTEGER REFERENCES Face(faceID),
    PRIMARY KEY (bodyID, faceID)
);

-- 10. Cylinder (dùng cho các cột)
CREATE TABLE Cylinder (
    cylinderID SERIAL PRIMARY KEY,
    type TEXT,
    height DOUBLE PRECISION,
    radius DOUBLE PRECISION,
    floorID INTEGER REFERENCES Floor(floorID),
    nodeID INTEGER REFERENCES Node(nodeID),
    colorID INTEGER REFERENCES Color(colorID)
);

-- 11. MeshObject (dùng cho GLB/glTF)
CREATE TABLE MeshObject (
    objectID SERIAL PRIMARY KEY,
    filePath TEXT
);

-- 12. Mesh_Point (gắn 1 GLB vào 1 point)
CREATE TABLE Mesh_Point (
    meshPointID SERIAL PRIMARY KEY,
    objectID INTEGER REFERENCES MeshObject(objectID),
    pointID INTEGER REFERENCES Point(pointID),
    buildingID INTEGER REFERENCES Building(buildingID)
);