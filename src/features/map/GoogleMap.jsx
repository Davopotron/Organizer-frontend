import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 40.76,
  lng: -111.891,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAvWbZNQYen7dVRqVFPMvphhJY2FRYdP1E",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);

/*
import react from "@vitejs/plugin-react-swc";
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from "@react-google-maps/api";


const MapComponent = () => {
  const defaultCenter = {
    lat: 40.76,
    lng: -111.891,
  };

  const locations = [
    {
      name: "Location 1",
      location: {
        lat: 40.712776,
        lng: -74.005974,
      },
    },
    {
      name: "Location 2",
      location: {
        lat: 40.73061,
        lng: -73.935242,
      },
    },
  ];

  const onMapClick = (event) => {
    console.log(
      "Clicked coordinates: ",
      event.latLng.lat(),
      event.latLng.lng()
    );
  };

  const mapStyles = [
    {
      elementType: "geometry",
      stylers: [{ color: "#ebe3cd" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#523735" }],
    },

    // Add more styles as needed
  ];

  return (
    <LoadScript googleMapsApiKey="AIzaSyAvWbZNQYen7dVRqVFPMvphhJY2FRYdP1E">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={defaultCenter}
        onClick={onMapClick}
      />
      {locations.map((item, index) => (
        <Marker key={index} position={item.location} />
      ))}
    </LoadScript>
  );
};
export default MapComponent;
*/
