import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useGetListItemsQuery } from "../listItems/listItemsSlice";

const center = {
  lat: 40.76,
  lng: -111.891,
};

function MyComponent({ searchInput }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAvWbZNQYen7dVRqVFPMvphhJY2FRYdP1E",
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 40.24, lng: -96.491 });
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  const { data: listItems, isLoading: isListItemsLoading } =
    useGetListItemsQuery();

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

  useEffect(() => {
    if (searchInput && map) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        query: searchInput,
        fields: ["name", "geometry"],
      };
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setMarkers(
            results.map((place) => ({
              position: place.geometry.location,
              name: place.name,
            }))
          );
          if (results[0]) {
            setCenter(results[0].geometry.location);
            map.setCenter(results[0].geometry.location);
          }
        }
      });
    }
  }, [searchInput, map]);

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

  return isLoaded && !loading && !isListItemsLoading ? (
    <GoogleMap
      mapContainerClassName={"map"}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} title={marker.name} />
      ))}
      <></>
    </GoogleMap>
  ) : (
    <p>Loading map...</p>
  );
}

export default React.memo(MyComponent);
