import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "./routes/App";
import { Login } from "./routes/Login.tsx";
import { Register } from "./routes/Register.tsx";
import { GlobalProvider } from "./components/GlobalContext.tsx";

const router = createBrowserRouter([
  {
    element: <GlobalProvider />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
