import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import personService from "./services/person";

import Root from "./routes/root";
import User, { loader as userLoader } from "./routes/user";
import Users, { loader as usersLoader } from "./routes/users";
import Input from "./routes/input";
import Error from "./routes/error";
import Data, { loader as dataLoader } from "./routes/data";
import Dashboard from "./routes/dashboard";
import Display from "./routes/display";
import TagFilter from "./components/TagFilter";
import UserFilter from "./components/UserFilter";
import NoFilter from "./components/NoFilter";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    personService.getAll().then((input) => setData(input));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "i/:user",
          element: <Input />,
          loader: userLoader,
        },
        { path: "u/:user", element: <User />, loader: userLoader },
        {
          path: "u/",
          element: <Users />,
          loader: usersLoader,
        },
        {
          path: ":tag",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "/v2",
      element: <Data />,
      errorElement: <Error />,
      loader: dataLoader,
      children: [
        {
          path: "",
          element: <NoFilter />,
        },
        // {
        //   path: "i/:user",
        //   element: <Input />,
        //   loader: userLoader,
        // },
        // { path: "u/:user", element: <User />, loader: userLoader },
        // {
        //   path: "u/",
        //   element: <Users />,
        //   loader: usersLoader,
        // },
        {
          path: "tag/:tag",
          element: <TagFilter />,
        },
        {
          path: "u/:user",
          element: <UserFilter />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
