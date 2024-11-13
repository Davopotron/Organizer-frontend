import "../css/homePage.css";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div className="homepage-background">
        <div className="container">
          <h1 className="htitle">TasteTracker</h1>
          <p className="hpara">
            Introducing #TasteTracker, the ultimate app for organizing all your
            favorite recipes in one place! With TasteTracker, you can easily
            create a personalized collection of recipes and view a detailed list
            of ingredients with just a tap.
          </p>
          <p className="hpara">
            Simply add the names of your recipes to the list, and whenever you
            are ready, click on any recipe name to add all the ingredients you
            will need.
          </p>
          <p className="hpara">
            Perfect for meal planning/prepping, grocery shopping, or cooking up
            something new, TasteTracker makes finding and preparing delicious
            dishes a breeze.
          </p>
          <p className="hpara">
            Sign up{" "}
            <NavLink className="here-SU" to="/users/login">
              here
            </NavLink>{" "}
            today so you can start easily locating all of your ingredients in
            one convenient place!
          </p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
