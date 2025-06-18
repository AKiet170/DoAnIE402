console.log("CotPhongLonData", window.CotPhongLonData);
console.log("CotPhongNhoData", window.CotPhongNhoData);
console.log("TangTrechBenPhaiData", window.TangTrechBenPhaiData);
console.log("DuongNoiBenPhaiData", window.DuongNoiBenPhaiData);

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
      geometry: data.geometry,
      symbol: data.symbol,
      attributes: data,
      popupTemplate: {
        title: "Polygon",
        content: "This is a polygon object.",
      },
    });

  // GLB components
  const glbGraphics = [
    {
      lon: 106.7929876805271,
      lat: 10.8935749263745,
      z: 32,
      url: "./mesh/banCong.glb",
      heading: 208,
    },
    {
      lon: 106.793200987,
      lat: 10.8934622631,
      z: 32,
      url: "./mesh/banCong.glb",
      heading: -64,
    },
    {
      lon: 106.7929534244384,
      lat: 10.8935052931004,
      z: 32,
      url: "./mesh/cuaSo.glb",
      heading: 206,
    },
    {
      lon: 106.7930365336328,
      lat: 10.8935509400074,
      z: 32,
      url: "./mesh/cuaSo1.glb",
      heading: 26,
    },
    {
      lon: 106.7930582152184,
      lat: 10.8934873101101,
      z: 65,
      url: "./mesh/maiNha.glb",
      heading: 26,
    },
    {
      lon: 106.7930717073925,
      lat: 10.8935050163874,
      z: 32,
      url: "./mesh/cuaChinh.glb",
      heading: 26,
    },
    {
      lon: 106.79319493,
      lat: 10.89350821,
      z: 31.58,
      url: "./mesh/CuaSoLon.glb",
      heading: 206,
    },
    {
      lon: 106.79309606,
      lat: 10.89341321,
      z: 31.58,
      url: "./mesh/CuaSoLon.glb",
      heading: 26,
    }
  ];

  glbGraphics.forEach((item) => {
    graphicsLayer.add(
      new Graphic({
        geometry: new Point({ longitude: item.lon, latitude: item.lat, z: item.z }),
        symbol: {
          type: "point-3d",
          symbolLayers: [
            {
              type: "object",
              resource: { href: item.url },
              heading: item.heading,
            },
          ],
        },
      })
    );
  });

  // Fetch polygon data from API
  fetch("http://localhost:8000/polygons")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((polygon) => {
        graphicsLayer.add(
          createGraphic({
            geometry: {
              type: "polygon",
              rings: polygon.geometry.rings,
              spatialReference: { wkid: 4326 },
            },
            symbol: {
              type: "polygon-3d",
              symbolLayers: [
                {
                  type: "fill",
                  material: {
                    color: [235, 235, 235, 0.85], // màu xám sáng dễ nhìn hơn
                  },
                  outline: {
                    color: [160, 160, 160, 0.6], // viền xám nhạt
                    size: 1.5,
                  }
                },
              ],
            },
          })
        );
      });
    })
    .catch((err) => console.error("Lỗi khi fetch từ API:", err));