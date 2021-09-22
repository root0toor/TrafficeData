import React, { useRef, useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  "pk.eyJ1Ijoic25hYmhpcmFqYSIsImEiOiJja3RzanZiN3YxZ3luMm9yb2dwcmVreXFsIn0.oQfc91hb46bh828ESJcDPw";

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/snabhiraja/cktsstrjx5gkm18nowro23nvo"
      // center: [144.9953, -37.7922],
      // zoom: 9.5
    });
  });

  return (
    <div style={{ width: "60%" }}>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
