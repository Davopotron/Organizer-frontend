// import MyLists from "../features/myLists/MyLists";
// import MapComponent from "./map/GoogleMap";
// import "../css/NearMe.css";
// import { useState } from "react";
// const GOOGLE_API_KEY = "AIzaSyAvWbZNQYen7dVRqVFPMvphhJY2FRYdP1E";

// function NearMe() {
//   const [searchInput, setSearchInput] = useState("");

//   return (
//     <>
//       <h1>Near Me</h1>
//       <div className="nearMe">
//         <div className="myLists">
//           <h2>My Lists</h2>
//           <MyLists />
//         </div>
//         <div className="map">
//           <input
//             type="text"
//             name="myListSearch"
//             className="myListSearch"
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//           />
//           <MapComponent searchInput={searchInput} />
//         </div>
//       </div>
//     </>
//   );
// }

// export default NearMe;

import MyLists from "../features/myLists/MyLists";
import MapComponent from "./map/GoogleMap";
import "../css/NearMe.css";
import { useState } from "react";
const GOOGLE_API_KEY = "AIzaSyAvWbZNQYen7dVRqVFPMvphhJY2FRYdP1E";

function NearMe() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <h1>Near Me</h1>
      <div className="nearMe">
        <div className="myLists">
          <h2>My Lists</h2>
          <MyLists className="nearMeMyLists" showAddForm={false} />
        </div>
        <div className="map">
          <input
            type="text"
            name="myListSearch"
            className="myListSearch"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <MapComponent searchInput={searchInput} />
        </div>
      </div>
    </>
  );
}

export default NearMe;
