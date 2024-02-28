import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import Homepage from "./pages/homepage";
import Tiktok from "./pages/tiktok";
import Facebook from "./pages/facebook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>,
  },
  {
    path: "/tiktok",
    element: <Tiktok/>,
  },
  {
    path: "/facebook",
    element: <Facebook/>,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);