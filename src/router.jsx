import {createBrowserRouter} from 'react-router-dom';
import AuthForm from './features/auth/AuthForm';
import Root from './layout/Root';
import HomePage from './features/HomePage';
import Login from './features/auth/AuthForm';
import ListDetails from './features/myLists/MyListDetails';
import MyLists from './features/myLists/MyLists';
import AddListItemForm from './features/listItems/AddListItemForm';
import ListItems from './features/listItems/ListItems';
import NearMe from './features/NearMe';
import Shopping from './features/Shopping';
import About from './features/About';
import Contact from './features/contact';
import PrivacyPolicy from './features/PrivacyPolicy';
import TermsOfService from './features/TermsOfService';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {index: true, element: <HomePage />, path: '/'},
      {path: '/auth', element: <AuthForm />},
      {path: '/users/login', element: <Login />},
      {path: '/MyList', element: <MyLists />},
      {path: '/MyList/:id', element: <ListDetails />},
      {path: '/listItem', element: <ListItems />},
      {path: '/listItem', element: <AddListItemForm />},
      {path: '/nearMe', element: <NearMe />},
      {path: '/shopping', element: <Shopping />},
      {path: '/About', element: <About />},
      {path: '/Contact', element: <Contact />},
      {path: '/PrivacyPolicy', element: <PrivacyPolicy />},
      {path: '/TermsOfService', element: <TermsOfService />},
    ],
  },
]);

export default router;
