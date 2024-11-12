import MyListsShop from "../features/ShoppingCart/MyListsShop";
import MapComponent from "./map/GoogleMap";
import "../css/Shopping.css";
import ShoppingCart from "./ShoppingCart/ShopCart";

function Shopping() {
  return (
    <>
      <div className="shoppingPage">
        <div className="myLists">
          <MyListsShop />
        </div>
        <div className="rightColumn">
          <div className="map">
            <input
              type="text"
              name="myListSearch"
              className="myListSearch"
              aria-label="map-input"
            />
            <MapComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export default Shopping;
