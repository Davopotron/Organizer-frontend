import { createBrowserRouter } from "react-router-dom";
import AuthForm from "./features/auth/AuthForm";
import Root from "./layout/Root";
import HomePage from "./features/HomePage";
//import AddListForm from "./features/lists/AddListForm";
//import ListDetails from "./features/lists/ListDetails";
//import MyLists from "./features/lists/MyLists";
//import UpdateListForm from "./features/lists/UpdateListForm";
//import AddListItemForm from "./features/listItems/AddListItemForm";
//import ListItems from "./features/listItems/ListItems";
//import UpdateListItemForm from "./features/listItems/UpdateListItemForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage />, path: "/" },
      //{ path: "/auth", element: <AuthForm /> },
      //{ path: "/login", element: <AuthForm /> },
      //{ path: "/MyList", element: <MyLists /> },
      //{ path: "/MyList/:id", element: <ListDetails /> },
      //{ path: "/MyList", element: <AddListForm /> },
      //{ path: "/MyList/:id", element: <UpdateListForm /> },
      //{ path: "/listItem", element: <ListItems /> },
      //{ path: "/listItem/:id", element: <UpdateListItemForm /> },
      //{ path: "/listItem", element: <AddListItemForm /> },
    ],
  },
]);

export default router;
