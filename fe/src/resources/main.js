/* eslint-disable @typescript-eslint/no-unused-vars */
console.log("CotPhongLonData", window.CotPhongLonData);
console.log("CotPhongNhoData", window.CotPhongNhoData);
console.log("TangTrechBenPhaiData", window.TangTrechBenPhaiData);
console.log("DuongNoiBenPhaiData", window.DuongNoiBenPhaiData);

// main.js
import Map from "esri/Map";
import SceneView from "esri/views/SceneView";
import Point from "esri/geometry/Point";
import Graphic from "esri/Graphic";
import GraphicsLayer from "esri/layers/GraphicsLayer";

const map = new Map({
  basemap: "topo-vector",
  ground: "world-elevation",
});

const view = new SceneView({
  container: "viewDiv",
  map: map,
  camera: {
    position: [106.7915, 10.885, 700],
    heading: 10,
    tilt: 60,
  },
});

const graphicsLayer = new GraphicsLayer();
map.add(graphicsLayer);

const createGraphic = (data) =>
  new Graphic({
    geometry: data,
    symbol: data.symbol,
    attributes: data,
    popupTemplate: {
      title: "Polygon",
      content: "This is a polygon object.",
    },
  });

// Ban cong
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
        resource: { href: "./mesh/banCong.glb" },
        heading: 208,
      },
    ],
  },
});
graphicsLayer.add(balconyDoorGraphic);

// Ban cong 2
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
        resource: { href: "./mesh/banCong.glb" },
        heading: -64,
      },
    ],
  },
});
graphicsLayer.add(balconyDoorGraphic2);

// 2 Cua so
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
        resource: { href: "./mesh/cuaSo.glb" },
        heading: 206,
      },
    ],
  },
});
graphicsLayer.add(WindowGraphic);

// 1 Cua so
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
        resource: { href: "./mesh/cuaSo1.glb" },
        heading: 26,
      },
    ],
  },
});
graphicsLayer.add(Window1Graphic);

// Mai Nha
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
        resource: { href: "./mesh/maiNha.glb" },
        heading: 26,
      },
    ],
  },
});
graphicsLayer.add(RoofGraphic);

// Cua Chinh
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
        resource: { href: "./mesh/cuaChinh.glb" },
        heading: 26,
      },
    ],
  },
});
graphicsLayer.add(DoorGraphic);

// Cua So Lon
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
        resource: { href: "./mesh/CuaSoLon.glb" },
        heading: 206,
      },
    ],
  },
});
graphicsLayer.add(BigWindowGraphic);

// Cua So Lon
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
        resource: { href: "./mesh/CuaSoLon.glb" },
        heading: 26,
      },
    ],
  },
});
graphicsLayer.add(BigWindowGraphic2);

// 2 Cua So Giua Lon (V)
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
        resource: { href: "./mesh/haiCuaSoGiua.glb" },
        heading: 26.5,
      },
    ],
  },
});
graphicsLayer.add(CuaSoGiua2);

// 2 Cua So Giua Nho (V) (Cua Chinh)
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
        resource: { href: "./mesh/haiCuaSoGiuaNho.glb" },
        heading: 26.5,
      },
    ],
  },
});
graphicsLayer.add(CuaSoGiuaNho2);

// Gộp tất cả data lại
const allPolygons = [
  ...(window.CotPhongLonData || []),
  ...(window.CotPhongNhoData || []),
  ...(window.TangTrechBenPhaiData || []),
  ...(window.DuongNoiBenPhaiData || []),
  ...(window.PhongLon2Data || []),
  ...(window.PhongGiuaTraiData || []),
  ...(window.PhongGiuaPhaiData || []),
];

allPolygons.forEach((polygon) => {
  graphicsLayer.add(createGraphic(polygon));
});
