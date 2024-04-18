import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import UserPage from "./components/UserPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from './context/Context';
import Welcome from './components/Welcome';
import ShowPage from './components/ShowPage';
import Contact from './components/Contact';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    // errorElement: <Page404 />,
  },
  {
    path: "/ShowPage",
    element: <ShowPage />,

  },
  {
    path: "/MainPage",
    element: <MainPage />,

  },
  {
    path: "/configurator",
    element: <App />,
  },
  {
    path: "/LoginPage",
    element: <LoginPage />,

  },
  {
    path: "/UserPage",
    element: <UserPage />,

  },
  {
    path: "/Contact",
    element: <Contact />,

  },
 
]);

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </AuthProvider>
  </Provider>,
  document.getElementById("root")

);

reportWebVitals();