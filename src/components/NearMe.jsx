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
    <div className="nearMeBackground">
      <h1 className="nearMeTitle">Near Me</h1>
      <div className="nearMe">
        <div className="nearMyLists">
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
        <div className="searchContainer">
          <input
            type="text"
            name="myListSearch"
            className="myListSearch"
            value={searchInput}
             placeholder="Search Map..."
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="list-search-input"
          />
          </div>
          <MapComponent searchInput={searchInput} />
        </div>
      </div>
      </div>
    </>
  );
}

export default NearMe;
