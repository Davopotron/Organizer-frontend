import MyListsShop from "../components/ShoppingCart/MyListsShop";
import MapComponent from "./map/GoogleMap";
import ShoppingCart from "./ShoppingCart/ShopCart";
import "../css/shopping.css";

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
