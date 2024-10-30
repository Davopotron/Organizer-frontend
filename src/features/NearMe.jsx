import MyLists from "../features/lists/MyLists";
import MapComponent from "./map/GoogleMap";
import "../css/NearMe.css";
//import ListItems from "../features/listItems/ListItems";
const GOOGLE_API_KEY = "AIzaSyAvWbZNQYen7dVRqVFPMvphhJY2FRYdP1E";

function initMap() {
  const location = { lat: 40.76, lng: -111.891 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: location,
  });
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
}

function NearMe() {
  return (
    <>
      <h1>Near Me</h1>
      <div>
        <h2>My Lists</h2>
        <MyLists />
      </div>
      <div>
        <MapComponent />
      </div>
    </>
  );
}

export default NearMe;
