import React from "react";
import { ReactDOM } from "react";
import App from "./App.jsx";
import { RouterProvider } from "react-dom/client";
import router from "./router";
import store from "./app/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
