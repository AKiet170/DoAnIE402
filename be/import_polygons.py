import os
import json
import re
from sqlalchemy import create_engine, Column, Integer, Float, String, ForeignKey, Table, MetaData
from sqlalchemy.orm import sessionmaker
from shapely.geometry import Polygon

# --- CONFIG ---
DATABASE_URL = "postgresql://postgres:123456@localhost:5432/new"
DEFAULT_BUILDING_ID = 1
DEFAULT_FLOOR_ID = 1
DEFAULT_COLOR_ID = 1

# --- SETUP ---
engine = create_engine(DATABASE_URL)
metadata = MetaData()
metadata.reflect(bind=engine)
Session = sessionmaker(bind=engine)
session = Session()

# --- REFLECT EXISTING TABLES ---
Point = Table("point", metadata, autoload_with=engine)
Node = Table("node", metadata, autoload_with=engine)
Face = Table("face", metadata, autoload_with=engine)
Face_Node = Table("face_node", metadata, autoload_with=engine)
BodyComp = Table("bodycomp", metadata, autoload_with=engine)
Face_Body = Table("face_body", metadata, autoload_with=engine)
Color = Table("color", metadata, autoload_with=engine)

# --- FUNCTION TO PARSE JS FILE TO JSON ---
def extract_polygons_from_js(js_file_path):
    import ast
    import json5  # pip install json5

    with open(js_file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    match = re.search(r"jsondata_\d+\s*=\s*({[\s\S]+?});", content)
    if not match:
        print(f"Could not extract jsondata from: {js_file_path}")
        return None

    raw_js_object = match.group(1)

    try:
        # Dùng json5 để hỗ trợ cú pháp JS như: dấu phẩy cuối, không cần dấu ""
        data = json5.loads(raw_js_object)
        return data["polygons"]
    except Exception as e:
        print(f"Error parsing JSON in {js_file_path}: {e}")
        return None

# --- MAIN IMPORT FUNCTION ---
def import_polygons_from_folder(folder):
    js_files = [f for f in os.listdir(folder) if f.endswith('.js')]

    for file_name in js_files:
        polygons = extract_polygons_from_js(os.path.join(folder, file_name))
        if not polygons:
            continue

        body_name = os.path.splitext(file_name)[0]
        body_insert = BodyComp.insert().values(name=body_name, floorid=DEFAULT_FLOOR_ID).returning(BodyComp.c.bodyid)
        body_id = session.execute(body_insert).scalar()

        for i, polygon in enumerate(polygons):
            face_name = f"{body_name}_face_{i+1}"
            face_insert = Face.insert().values(name=face_name, colorid=DEFAULT_COLOR_ID).returning(Face.c.faceid)
            face_id = session.execute(face_insert).scalar()

            # Add Face_Body mapping
            session.execute(Face_Body.insert().values(bodyid=body_id, faceid=face_id))

            for pt in polygon['rings']:
                x, y, z = pt
                point_insert = Point.insert().values(x=x, y=y, z=z).returning(Point.c.pointid)
                point_id = session.execute(point_insert).scalar()

                node_insert = Node.insert().values(type='vertex', pointid=point_id).returning(Node.c.nodeid)
                node_id = session.execute(node_insert).scalar()

                session.execute(Face_Node.insert().values(faceid=face_id, nodeid=node_id))

        session.commit()
        print(f"Imported polygons from {file_name}")

# --- RUN ---
if __name__ == '__main__':
    import_polygons_from_folder("./data/")  # replace with actual folder path
