import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./storage/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage.tsx";
import Login from "./pages/Login/Login.tsx";
import RequireAuth from "./helpers/RequireAuth.tsx";
import ErrorPage from "./pages/Error.tsx";
import Menu from "./pages/Menu.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu></Menu>,
    children: [
      {
        path: "/",
        element: (
          <RequireAuth>
            <CalendarPage />
          </RequireAuth>
        ),
      },
      {
        path: "/auth",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>,
);
