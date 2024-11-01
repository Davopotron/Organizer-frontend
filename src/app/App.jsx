import {useState} from 'react';
import {useSelector} from 'react-redux';
import AuthForm from '../features/auth/AuthForm';

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <h1>Recipe Organizer</h1>
      <p>The planner for all your recipe needs.</p>
      <p>
        Introducing Recipe List, the ultimate app for organizing all your
        favorite recipes in one place! With Recipe List, you can easily create a
        personalized collection of recipes and view a detailed list of
        ingredients with just a tap.
      </p>
      <p>
        Simply add the names of your recipes to the list, and whenever you are
        ready, click on any recipe name to add all the ingredients you will
        need.
      </p>
      <p>
        Perfect for meal planning, grocery shopping, or cooking up something
        new, Recipe List makes finding and preparing delicious dishes a breeze.
      </p>
    </>
  );
}
