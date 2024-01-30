import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import personService from "./services/person";

import Root from "./routes/root";
import User, { loader as userLoader } from "./routes/user";
import Users, { loader as usersLoader } from "./routes/users";
import Input from "./routes/input";
import Error from "./routes/error";
import Dashboard from "./routes/dashboard";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
