import MyLists from "../features/myLists/MyLists";
import MapComponent from "./map/GoogleMap";
import "../css/Shopping.css";
import ShoppingCart from "./ShoppingCart/ShopCart";

function Shopping() {
  return (
    <>
      <div className="nearMe">
        <div className="myLists">
          <MyLists />
        </div>
        <div className="rightColumn">
          <div classname="shopcart">
            <ShoppingCart />
          </div>
          <div className="map">
            <input type="text" name="myListSearch" className="myListSearch" />
            <MapComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export default Shopping;
