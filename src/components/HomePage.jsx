import "../css/homePage.css";

function HomePage() {
  return (
    <>
      <div className="container">
        <h1 className="htitle">TasteTracker</h1>
        <p className="hpara">
          Introducing #TasteTrack, the ultimate app for organizing all your
          favorite recipes in one place! With Recipe List, you can easily create
          a personalized collection of recipes and view a detailed list of
          ingredients with just a tap.
        </p>
        <p className="hpara">
          Simply add the names of your recipes to the list, and whenever you are
          ready, click on any recipe name to add all the ingredients you will
          need.
        </p>
        <p className="hpara">
          Perfect for meal planning/prepping, grocery shopping, or cooking up
          something new, Recipe List makes finding and preparing delicious
          dishes a breeze.
        </p>
      </div>
    </>
  );
}

export default HomePage;
