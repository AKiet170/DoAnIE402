let popup_template = {
  title: "{Name}",
  content: "This {type} at <b>{Location}</b>.",
};
let jsondata = {
  polygons: [
    /*
    //VD: Phòng 1
    {
      type: "polygon",
      rings: [
        [106.7929680942796, 10.8936195949769, 120],
        [106.793217993696, 10.893496896961, 120],
        [106.7931483361572, 10.8933550252432, 120],
        [106.7928984367409, 10.8934777232591, 120],
        [106.7929680942796, 10.8936195949769, 120],
      ],
      symbol: {
        type: "simple-fill",
        color: [0, 255, 0, 0.7],
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
      },
    },
    {
      type: "polygon",
      rings: [
        [106.7929680942796, 10.8936195949769, 32],
        [106.793217993696, 10.893496896961, 32],
        [106.7931483361572, 10.8933550252432, 32],
        [106.7928984367409, 10.8934777232591, 32],
        [106.7929680942796, 10.8936195949769, 32],
      ],
      symbol: {
        type: "simple-fill",
        color: [0, 255, 0, 0.7],
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
      },
    },
    {
      type: "polygon",
      rings: [
        [106.7929680942796, 10.8936195949769, 32],
        [106.793217993696, 10.893496896961, 32],
        [106.793217993696, 10.893496896961, 120],
        [106.7929680942796, 10.8936195949769, 120],
        [106.7929680942796, 10.8936195949769, 32],
      ],
      symbol: {
        type: "simple-fill",
        color: [0, 255, 0, 0.7],
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
      },
    },
    {
      type: "polygon",
      rings: [
        [106.793217993696, 10.893496896961, 32],
        [106.7931483361572, 10.8933550252432, 32],
        [106.7931483361572, 10.8933550252432, 120],
        [106.793217993696, 10.893496896961, 120],
        [106.793217993696, 10.893496896961, 32],
      ],
      symbol: {
        type: "simple-fill",
        color: [0, 255, 0, 0.7],
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
      },
    },
    {
      type: "polygon",
      rings: [
        [106.7931483361572, 10.8933550252432, 32],
        [106.7928984367409, 10.8934777232591, 32],
        [106.7928984367409, 10.8934777232591, 120],
        [106.7931483361572, 10.8933550252432, 120],
        [106.7931483361572, 10.8933550252432, 32],
      ],
      symbol: {
        type: "simple-fill",
        color: [0, 255, 0, 0.7],
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
      },
    },
    {
      type: "polygon",
      rings: [
        [106.7928984367409, 10.8934777232591, 32],
        [106.7929680942796, 10.8936195949769, 32],
        [106.7929680942796, 10.8936195949769, 120],
        [106.7928984367409, 10.8934777232591, 120],
        [106.7928984367409, 10.8934777232591, 32],
      ],
      symbol: {
        type: "simple-fill",
        color: [0, 255, 0, 0.7],
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
      },
    },*/
  ],
};
require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/GraphicsLayer",
  "esri/Graphic",
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
  var createGraphic = function (data) {
    return new Graphic({
      geometry: data,
      symbol: data.symbol,
      attributes: data,
      popupTemplate: data.popupTemplate,
    });
  };
  var graphicsLayer = new GraphicsLayer();

  jsondata.polygons.forEach(function (data) {
    graphicsLayer.add(createGraphic(data));
  });

  map.add(graphicsLayer);
});
