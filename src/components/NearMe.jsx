import MyLists from "../components/myLists/MyLists";
import MapComponent from "./map/GoogleMap";
import { useState } from "react";
import { useGetListItemsQuery } from "../slices/listItemsSlice";
import "../css/nearMe.css";

function NearMe() {
  const [searchInput, setSearchInput] = useState("");
  const { data: fetchListItems = [], isLoading } = useGetListItemsQuery();

  const handleSetSearchInput = (term) => {
    setSearchInput(term);
  };

  return (
    <>
      <h1>Near Me</h1>
      <div className="nearMe">
        <div className="myLists">
          <MyLists
            className="nearMeMyLists"
            showAddForm={false}
            showDescription={false}
            isNearMe={true}
            fetchListItems={fetchListItems}
            onListClick={handleSetSearchInput}
          />
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
