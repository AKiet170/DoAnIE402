console.log("CotPhongLonData", window.CotPhongLonData);
console.log("CotPhongNhoData", window.CotPhongNhoData);
console.log("TangTrechBenPhaiData", window.TangTrechBenPhaiData);
console.log("DuongNoiBenPhaiData", window.DuongNoiBenPhaiData);

// main.js
require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/geometry/Point",
  "esri/Graphic",
  "esri/layers/GraphicsLayer"
], function (Map, SceneView, Point, Graphic, GraphicsLayer) {
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
        resource: { href: "./banCong1.glb"},
        heading: 28,
      },
    ],
  },
});
graphicsLayer.add(balconyDoorGraphic);

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
        resource: { href: "./cuaSo.glb"},
        heading: 206,
      },
    ],
  },
});
graphicsLayer.add(WindowGraphic);

  // Gộp tất cả data lại
  const allPolygons = [
    ...(window.CotPhongLonData || []),
    ...(window.CotPhongNhoData || []),
    ...(window.TangTrechBenPhaiData || []),
    ...(window.DuongNoiBenPhaiData || []),
    ...(window.PhongLon2Data || [])
  ];

  allPolygons.forEach((polygon) => {
    graphicsLayer.add(createGraphic(polygon));
  });
});
