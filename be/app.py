from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, MetaData, Table, select
from sqlalchemy.orm import sessionmaker
from fastapi.responses import JSONResponse

app = FastAPI()

# Cho phép gọi từ frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = "postgresql://postgres:123456@localhost:5432/new"
engine = create_engine(DATABASE_URL)
metadata = MetaData()
metadata.reflect(bind=engine)
Session = sessionmaker(bind=engine)

# Load bảng từ CSDL
Point = Table("point", metadata, autoload_with=engine)
Node = Table("node", metadata, autoload_with=engine)
Face = Table("face", metadata, autoload_with=engine)
Face_Node = Table("face_node", metadata, autoload_with=engine)

@app.get("/polygons")
def get_polygons():
    session = Session()
    polygons = []

    # Lấy dữ liệu
    face_node_map = session.execute(select(Face_Node)).fetchall()
    node_map = session.execute(select(Node)).fetchall()
    point_map = session.execute(select(Point)).fetchall()

    # Tạo các dict ánh xạ nhanh
    point_dict = {p.pointid: p for p in point_map}
    node_dict = {n.nodeid: n for n in node_map}
    face_dict = {}

    # Gom các điểm theo từng mặt (face)
    for fn in face_node_map:
        fid = fn.faceid
        nid = fn.nodeid
        pid = node_dict[nid].pointid
        pt = point_dict[pid]
        if fid not in face_dict:
            face_dict[fid] = []
        face_dict[fid].append([pt.x, pt.y, pt.z])

    # Xử lý từng polygon
    for fid, coords in face_dict.items():
        if coords[0] != coords[-1]:
            coords.append(coords[0])  # Đóng polygon

        polygons.append({
            "geometry": {
                "type": "polygon",
                "rings": coords
            },
            "symbol": {
                "type": "polygon-3d",
                "symbolLayers": [
                    {
                        "type": "fill",
                        "material": { "color": [235, 235, 235, 0.85] },  # màu sáng hơn
                        "outline": {
                            "color": [160, 160, 160, 0.6],  # viền mờ xám
                            "size": 1.5
                        }
                    }
                ],
            }
        })

    return JSONResponse(content=polygons)
