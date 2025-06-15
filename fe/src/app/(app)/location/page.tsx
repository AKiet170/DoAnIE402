/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BusFront, Coffee, School, Store } from "lucide-react";
import { useEffect, useRef } from "react";

// Import dữ liệu polygon
import { CotPhongLonData } from "@/resources/CotPhongLon1";
import { CotPhongNhoData } from "@/resources/CotPhongNho1.js";
import { TangTrechBenPhaiData } from "@/resources/TangTrechBenPhai.js";
import { DuongNoiBenPhaiData } from "@/resources/DuongNoiBenPhai.js";
import { PhongLon2Data } from "@/resources/PhongLon2.js";
import { PhongGiuaTraiData } from "@/resources/PhongGiuaTrai.js";
import { PhongGiuaPhaiData } from "@/resources/PhongGiuaPhai.js";

export default function LocationPage() {
  const utilities = [
    {
      icon: School,
      name: "Trường Đại học Bách khoa",
      distance: "300m",
      color: "text-blue-600",
    },
    {
      icon: BusFront,
      name: "Bến Xe Suối Tiên",
      distance: "150m",
      color: "text-green-500",
    },
    {
      icon: Coffee,
      name: "Yes Café KTX",
      distance: "100m",
      color: "text-yellow-500",
    },
    {
      icon: Store,
      name: "Vinmart, chợ địa phương",
      distance: "200m",
      color: "text-red-600",
    },
  ];

  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let view: __esri.SceneView | null = null;

    // Tải ArcGIS modules
    Promise.all([
      import("@arcgis/core/Map"),
      import("@arcgis/core/views/SceneView"),
      import("@arcgis/core/geometry/Point"),
      import("@arcgis/core/Graphic"),
      import("@arcgis/core/layers/GraphicsLayer"),
      import("@arcgis/core/geometry/Polygon"),
    ])
      .then(
        ([
          MapModule,
          SceneViewModule,
          PointModule,
          GraphicModule,
          GraphicsLayerModule,
          PolygonModule,
        ]) => {
          const { default: Map } = MapModule;
          const { default: SceneView } = SceneViewModule;
          const { default: Point } = PointModule;
          const { default: Graphic } = GraphicModule;
          const { default: GraphicsLayer } = GraphicsLayerModule;
          const { default: Polygon } = PolygonModule;

          // Khởi tạo Map
          const map = new Map({
            basemap: "topo-vector",
            ground: "world-elevation",
          });

          // Khởi tạo GraphicsLayer
          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);

          // Hàm tạo Graphic cho polygon
          const createGraphic = (data: any) =>
            new Graphic({
              geometry: new Polygon({
                rings: data.rings,
                spatialReference: { wkid: 4326 },
              }),
              symbol: data.symbol,
              attributes: data.attributes,
              popupTemplate: data.popupTemplate,
            });

          // Thêm các đối tượng 3D từ GLB
          const balconyDoorGraphic = new Graphic({
            geometry: new Point({
              longitude: 106.7929876805271,
              latitude: 10.8935749263745,
              z: 32,
            }),
            symbol: {
              type: "point-3d",
              symbolLayers: [
                {
                  type: "object",
                  resource: { href: "/mesh/banCong.glb" },
                  heading: 208,
                },
              ],
            },
          });
          graphicsLayer.add(balconyDoorGraphic);

          const balconyDoorGraphic2 = new Graphic({
            geometry: new Point({
              longitude: 106.793200987,
              latitude: 10.8934622631,
              z: 32,
            }),
            symbol: {
              type: "point-3d",
              symbolLayers: [
                {
                  type: "object",
                  resource: { href: "/mesh/banCong.glb" },
                  heading: -64,
                },
              ],
            },
          });
          graphicsLayer.add(balconyDoorGraphic2);

          const WindowGraphic = new Graphic({
            geometry: new Point({
              longitude: 106.7929534244384,
              latitude: 10.8935052931004,
              z: 32,
            }),
            symbol: {
              type: "point-3d",
              symbolLayers: [
                {
                  type: "object",
                  resource: { href: "/mesh/cuaSo.glb" },
                  heading: 206,
                },
              ],
            },
          });
          graphicsLayer.add(WindowGraphic);

          const Window1Graphic = new Graphic({
            geometry: new Point({
              longitude: 106.7930365336328,
              latitude: 10.8935509400074,
              z: 32,
            }),
            symbol: {
              type: "point-3d",
              symbolLayers: [
                {
                  type: "object",
                  resource: { href: "/mesh/cuaSo1.glb" },
                  heading: 26,
                },
              ],
            },
          });
          graphicsLayer.add(Window1Graphic);

          const RoofGraphic = new Graphic({
            geometry: new Point({
              longitude: 106.7930582152184,
              latitude: 10.8934873101101,
              z: 65,
            }),
            symbol: {
              type: "point-3d",
              symbolLayers: [
                {
                  type: "object",
                  resource: { href: "/mesh/maiNha.glb" },
                  heading: 26,
                },
              ],
            },
          });
          graphicsLayer.add(RoofGraphic);

          const DoorGraphic = new Graphic({
            geometry: new Point({
              longitude: 106.7930717073925,
              latitude: 10.8935050163874,
              z: 32,
            }),
            symbol: {
              type: "point-3d",
              symbolLayers: [
                {
                  type: "object",
                  resource: { href: "/mesh/cuaChinh.glb" },
                  heading: 26,
                },
              ],
            },
          });
          graphicsLayer.add(DoorGraphic);

          const BigWindowGraphic = new Graphic({
            geometry: new Point({
              longitude: 106.79319493,
              latitude: 10.89350821,
              z: 31.58,
            }),
            symbol: {
              type: "point-3d",
              symbolLayers: [
                {
                  type: "object",
                  resource: { href: "/mesh/CuaSoLon.glb" },
                  heading: 206,
                },
              ],
            },
          });
          graphicsLayer.add(BigWindowGraphic);

          const BigWindowGraphic2 = new Graphic({
            geometry: new Point({
              longitude: 106.79309606,
              latitude: 10.89341321,
              z: 31.58,
            }),
            symbol: {
              type: "point-3d",
              symbolLayers: [
                {
                  type: "object",
                  resource: { href: "/mesh/CuaSoLon.glb" },
                  heading: 26,
                },
              ],
            },
          });
          graphicsLayer.add(BigWindowGraphic2);

          const CuaSoGiua2 = new Graphic({
            geometry: new Point({
              longitude: 106.7930127154656,
              latitude: 10.8934216135931,
              z: 32,
            }),
            symbol: {
              type: "point-3d",
              symbolLayers: [
                {
                  type: "object",
                  resource: { href: "/mesh/haiCuaSoGiua.glb" },
                  heading: 26.5,
                },
              ],
            },
          });
          graphicsLayer.add(CuaSoGiua2);

          const CuaSoGiuaNho2 = new Graphic({
            geometry: new Point({
              longitude: 106.7930717073925,
              latitude: 10.8935050163874,
              z: 32,
            }),
            symbol: {
              type: "point-3d",
              symbolLayers: [
                {
                  type: "object",
                  resource: { href: "/mesh/haiCuaSoGiuaNho.glb" },
                  heading: 26.5,
                },
              ],
            },
          });
          graphicsLayer.add(CuaSoGiuaNho2);

          // Thêm polygon từ dữ liệu
          const allPolygons = [
            ...(CotPhongLonData || []),
            ...(CotPhongNhoData || []),
            ...(TangTrechBenPhaiData || []),
            ...(DuongNoiBenPhaiData || []),
            ...(PhongLon2Data || []),
            ...(PhongGiuaTraiData || []),
            ...(PhongGiuaPhaiData || []),
          ];

          allPolygons.forEach((polygon) => {
            graphicsLayer.add(createGraphic(polygon));
          });

          // Khởi tạo SceneView
          view = new SceneView({
            container: mapRef.current!,
            map: map,
            camera: {
              position: {
                longitude: 106.7915,
                latitude: 10.885,
                z: 700,
              },
              heading: 10,
              tilt: 60,
            },
          });

          view.when(() => console.log("SceneView loaded"));
        }
      )
      .catch((err) => console.error("Error loading ArcGIS:", err));

    // Cleanup
    return () => {
      if (view) {
        view.destroy();
        view = null;
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Section 1: Giới thiệu với mô hình 3D */}
      <section className="flex flex-col lg:flex-row items-center gap-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl shadow-lg p-8 lg:p-12">
        <div className="flex-1">
          <div
            ref={mapRef}
            className="w-full h-[1000px] rounded-2xl overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-[1.02]"
            aria-label="Mô hình 3D Bcons City"
          ></div>
        </div>
      </section>

      {/* Section 2: Tiện ích xung quanh */}
      <section className="mt-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-10">
          Tiện ích xung quanh
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {utilities.map((item, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2"
            >
              <item.icon className={`w-14 h-14 ${item.color} mb-6`} />
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Cách {item.distance}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Bản đồ nơi ở */}
      <section id="map" className="mt-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-10">
          Bản đồ vị trí
        </h2>
        <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4509.699324773858!2d106.7936648!3d10.8930138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d9cc4abaf755%3A0x4dbea8bcb0b7cb38!2sBcons%20City!5e1!3m2!1sen!2s!4v1749977247106!5m2!1sen!2s"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bản đồ Bcons City"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
