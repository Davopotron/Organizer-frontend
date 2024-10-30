import react from "@vitejs/plugin-react-swc";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const MapComponent = () => {
  const mapStyles = {
    height: "80vh",
    width: "70%",
  };
  const defaultCenter = {
    lat: 40.76,
    lng: -111.891,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAvWbZNQYen7dVRqVFPMvphhJY2FRYdP1E">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={defaultCenter}
      />
    </LoadScript>
  );
};
export default MapComponent;
