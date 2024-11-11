import { createBrowserRouter } from "react-router-dom";
import Root from "./layout/Root";
import AddListItemForm from "./components/listItems/AddListItemForm";
import AuthForm from "./components/auth/AuthForm";
import HomePage from "./components/HomePage";
import ListDetails from "./components/myLists/MyListDetails";
import ListItems from "./components/listItems/ListItems";
import Login from "./components/auth/AuthForm";
import MyLists from "./components/myLists/MyLists";
import NearMe from "./components/NearMe";
import Shopping from "./components/Shopping";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage />, path: "/" },
      { path: "/auth", element: <AuthForm /> },
      { path: "/users/login", element: <Login /> },
      { path: "/my-lists", element: <MyLists /> },
      { path: "/my-lists/:id", element: <ListDetails /> },
      { path: "/list-items", element: <ListItems /> },
      { path: "/list-items", element: <AddListItemForm /> },
      { path: "/near-me", element: <NearMe /> },
      { path: "/shopping", element: <Shopping /> },
    ],
  },
]);

export default router;
