console.log("CotPhongLonData", window.CotPhongLonData);
console.log("CotPhongNhoData", window.CotPhongNhoData);
console.log("TangTrechBenPhaiData", window.TangTrechBenPhaiData);
console.log("DuongNoiBenPhaiData", window.DuongNoiBenPhaiData);

// main.js
require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/GraphicsLayer",
  "esri/Graphic"
], function (Map, SceneView, GraphicsLayer, Graphic) {
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

  // Gộp tất cả data lại
  const allPolygons = [
    ...(window.CotPhongLonData || []),
    ...(window.CotPhongNhoData || []),
    ...(window.TangTrechBenPhaiData || []),
    ...(window.DuongNoiBenPhaiData || [])
  ];

  allPolygons.forEach((polygon) => {
    graphicsLayer.add(createGraphic(polygon));
  });
});
