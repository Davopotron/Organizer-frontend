import React, { useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useGetListItemsQuery } from "../listItems/listItemsSlice";

const libraries = ["places", "marker"];
const markerFields = [
  "place_id",
  "name",
  "geometry",
  "formatted_address",
  "formatted_phone_number",
];
const mapId = "DEMO_MAP_ID";

function MapComponent({ searchInput }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAvWbZNQYen7dVRqVFPMvphhJY2FRYdP1E",
    libraries,
  });

  const [map, setMap] = useState(null);
  const [markerLib, setMarkerLib] = useState(null);
  const [center, setCenter] = useState({ lat: 40.24, lng: -96.491 });
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  // const { data: listItems, isLoading: isListItemsLoading } =
  //   useGetListItemsQuery();

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
    if (isLoaded && map) {
      google.maps.importLibrary("marker").then((module) => {
        setMarkerLib(module);
      });
    }
  }, [isLoaded, map]);

  useEffect(() => {
    if (searchInput && map && markerLib) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        query: searchInput,
        fields: markerFields,
      };
      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          console.log("Places API results:", results);
          const newMarkers = results.slice(0, 15).map((place) => {
            const marker = new markerLib.AdvancedMarkerElement({
              map: map,
              position: place.geometry.location,
              title: place.name,
            });

            //Request detailed information for each place
            const detailsRequest = {
              placeId: place.place_id,
              fields: markerFields,
            };

            service.getDetails(
              detailsRequest,
              (placeDetails, detailsStatus) => {
                if (
                  detailsStatus ===
                  window.google.maps.places.PlacesServiceStatus.OK
                ) {
                  marker.addListener("click", () => {
                    setSelectedMarker({
                      position: placeDetails.geometry.location,
                      name: placeDetails.name,
                      address: placeDetails.formatted_address,
                      phone:
                        placeDetails.formatted_phone_number ||
                        "Phone number not available",
                    });
                  });
                }
              }
            );

            return marker;
          });
          setMarkers(newMarkers);
          if (results[0]) {
            setCenter(results[0].geometry.location);
            map.setCenter(results[0].geometry.location);
          }
        }
      });
    }
  }, [searchInput, map, markerLib]);

  const onLoad = useCallback(
    (map) => {
      const zoom = 13;
      const bounds = new window.google.maps.LatLngBounds(center);
      map.setZoom(zoom);
      setMap(map);
    },
    [center]
  );

  const onUnmount = useCallback(
    (map) => {
      setMap(null);
      markers.forEach((marker) => marker.setMap(null));
      setMarkers([]);
    },
    [markers]
  );

  console.log(selectedMarker);

  return isLoaded && !loading ? (
    <GoogleMap
      mapContainerClassName={"map"}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapId: mapId,
      }}
    >
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker.position}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>
            <h3>{selectedMarker.name}</h3>
            <p>{selectedMarker.phone}</p>
            <p>{selectedMarker.address}</p>
          </div>
        </InfoWindow>
      )}
      <></>
    </GoogleMap>
  ) : (
    <p>Loading map...</p>
  );
}

export default React.memo(MapComponent);
