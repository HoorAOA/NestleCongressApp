interface MapHtmlOptions {
    latitude: number;
    longitude: number;
    zoom?: number;
    markerColor: string;
    markerIconColor: string;
    backgroundColor: string;
}

export const buildMapHtml = ({
    latitude,
    longitude,
    zoom = 15,
    markerColor,
    markerIconColor,
    backgroundColor,
}: MapHtmlOptions) => `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.css" />
<style>
  html, body, #map { height: 100%; width: 100%; margin: 0; padding: 0; background: ${backgroundColor}; }
  .maplibregl-ctrl-attrib { font-size: 8px; background: rgba(255,255,255,0.7) !important; }
  .pin {
    width: 56px; height: 56px; border-radius: 50%;
    background: ${markerColor};
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 0 10px ${markerColor}40, 0 6px 18px ${markerColor}99;
  }
</style>
</head>
<body>
<div id="map"></div>
<script src="https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.js"></script>
<script>
  var position = [${longitude}, ${latitude}];

  var map = new maplibregl.Map({
    container: 'map',
    style: 'https://tiles.openfreemap.org/styles/positron',
    center: position,
    zoom: ${zoom},
    interactive: false,
    attributionControl: { compact: true }
  });

  var el = document.createElement('div');
  el.className = 'pin';
  el.innerHTML =
    '<svg viewBox="0 0 24 24" width="26" height="26">' +
    '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" fill="${markerIconColor}"/>' +
    '<circle cx="12" cy="10" r="3" fill="${markerColor}"/></svg>';

  new maplibregl.Marker({ element: el }).setLngLat(position).addTo(map);
</script>
</body>
</html>`;