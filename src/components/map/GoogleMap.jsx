import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

//List of Google Maps libraries to load
const libraries = ["places", "marker"];
const GOOGLE_MAPS_API_KEY = "AIzaSyAvWbZNQYen7dVRqVFPMvphhJY2FRYdP1E";
// Fields to request from the google Places API
const markerFields = [
  "place_id",
  "name",
  "geometry",
  "formatted_address",
  "formatted_phone_number",
];
// ID for a specific Google map style
const mapId = "DEMO_MAP_ID";

// Use searchInput prop from NearMe page
function MapComponent({ searchInput }) {
  // Load Google Maps JS API with the libraries array
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
    options: {
      csp: {
        // Disable the content security policy check
        enabled: false,
      },
    },
  });

  //State
  const [map, setMap] = useState(null);
  const [markerLib, setMarkerLib] = useState(null);
  const [center, setCenter] = useState({ lat: 40.24, lng: -96.491 });
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Set the map center to the user's current location
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

  // Import the marker library once the API and map are loaded
  useEffect(() => {
    if (isLoaded && map) {
      google.maps.importLibrary("marker").then((module) => {
        setMarkerLib(module);
      });
    }
  }, [isLoaded, map]);

  // Performs a text search based on the users input
  useEffect(() => {
    if (searchInput && map && markerLib) {
      // Clear existing markers
      markers.forEach((marker) => marker.setMap(null));
      setMarkers([]);

      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        query: searchInput,
        fields: markerFields,
      };

      /*
      The call to Googles API, limit the results to 15 out of a possible 20
      Then creates a map marker for each result
      */
      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
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
                  // Click event to populate the InfoWindow of each marker
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
          // Center map on clicked marker
          setMarkers(newMarkers);
          if (results[0]) {
            setCenter(results[0].geometry.location);
            map.setCenter(results[0].geometry.location);
          }
        }
      });
    }
  }, [searchInput, map, markerLib]);

  //Initialized the map with a specific zoom level and sets the map state
  const onLoad = useCallback(
    (map) => {
      const zoom = 13;
      const bounds = new window.google.maps.LatLngBounds(center);
      map.setZoom(zoom);
      setMap(map);
    },
    [center]
  );

  // Cleans up by removing markers and resetting the map state
  const onUnmount = useCallback(
    (map) => {
      setMap(null);
      markers.forEach((marker) => marker.setMap(null));
      setMarkers([]);
    },
    [markers]
  );

  // Renders the map, sets its center, zoom, options, and handles load and unload events
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

// Uses React.memo to optimize the component by preventing unnecessary re-renders
export default React.memo(MapComponent);
