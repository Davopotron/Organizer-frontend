import { createBrowserRouter } from "react-router-dom";
import AuthForm from "./features/auth/AuthForm";
import Root from "./layout/Root";
import HomePage from "./features/HomePage";
import Login from "./features/auth/AuthForm";
//import AddListForm from "./features/lists/AddListForm";
import ListDetails from "./features/myLists/MyListDetails";
import MyLists from "./features/myLists/MyLists";
//import UpdateMyListForm from "./features/lists/UpdateListForm";
import AddListItemForm from "./features/listItems/AddListItemForm";
import ListItems from "./features/listItems/ListItems";
import UpdateListItemForm from "./features/listItems/UpdateListItemForm";
import NearMe from "./features/NearMe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage />, path: "/" },
      { path: "/auth", element: <AuthForm /> },
      { path: "/users/login", element: <Login /> },
      { path: "/MyList", element: <MyLists /> },
      { path: "/MyList/:id", element: <ListDetails /> },
      //{ path: "/MyList", element: <AddListForm /> },
      //{ path: "/MyList/:id", element: <UpdateMyListForm /> },
      { path: "/listItem", element: <ListItems /> },
      { path: "/listItem/:id", element: <UpdateListItemForm /> },
      { path: "/listItem", element: <AddListItemForm /> },
      { path: "/nearMe", element: <NearMe /> },
    ],
  },
]);

export default router;
