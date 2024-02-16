import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import personService from "./services/person";

import Input from "./routes/input";
import RouteError from "./components/RouteError";
import Data, { loader as dataLoader } from "./routes/data";
import TagPage from "./components/TagPage";
import UserPage from "./components/UserPage";
import OverallPage from "./components/OverallPage";
import UserListPage from "./components/UserListPage";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    personService.getAll().then((input) => setData(input));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Data />,
      errorElement: <RouteError />,
      loader: dataLoader,
      children: [
        {
          path: "",
          element: <OverallPage />,
        },
        {
          path: "tag/:tag",
          element: <TagPage />,
        },
        {
          path: "u/:user",
          element: <UserPage />,
        },
        {
          path: "u/",
          element: <UserListPage />,
        },
      ],
    },
    {
      path: "i/:user",
      element: <Input />,
      errorElement: <RouteError />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
