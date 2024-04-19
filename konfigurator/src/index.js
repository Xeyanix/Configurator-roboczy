import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from "./components/LoginPage";
import ConfigurePage from "./components/ConfigurePage";
import UserPage from "./components/UserPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthProvider } from './context/Context';
import MainPage from './components/MainPage';
import ShowPage from './components/ShowPage';
import Contact from './components/Contact';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    // errorElement: <Page404 />,
  },
  {
    path: "/ShowPage",
    element: <ShowPage />,

  },
  {
    path: "/ConfigurePage",
    element: <ConfigurePage />,

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