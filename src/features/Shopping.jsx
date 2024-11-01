import MyLists from "../features/myLists/MyLists";
import MapComponent from "./map/GoogleMap";
import "../css/NearMe.css";

function Shopping() {
  return (
    <>
      <h1>Near Me</h1>
      <div className="nearMe">
        <div className="myLists">
          <h2>My Lists</h2>
          <MyLists />
        </div>
        <div className="map">
          <input type="text" name="myListSearch" className="myListSearch" />
          <MapComponent />
        </div>
      </div>
    </>
  );
}

export default Shopping;
