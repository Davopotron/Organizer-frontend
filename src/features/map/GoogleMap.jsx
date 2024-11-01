import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const center = {
  lat: 40.76,
  lng: -111.891,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAvWbZNQYen7dVRqVFPMvphhJY2FRYdP1E",
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 40.24, lng: -96.491 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        () => {
          console.error("Error getting the user's location.");
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  const onLoad = useCallback(
    (map) => {
      const zoom = 13;
      const bounds = new window.google.maps.LatLngBounds(center);
      map.setZoom(zoom);
      setMap(map);
    },
    [center]
  );

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  return isLoaded && !loading ? (
    <GoogleMap
      mapContainerClassName={"map"}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <p>Loading map...</p>
  );
}

export default React.memo(MyComponent);
