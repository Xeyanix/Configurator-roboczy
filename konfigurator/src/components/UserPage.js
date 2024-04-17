import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import { useAuth } from "../context/Context";
import styles from "../common/styles/UserForm.module.scss";
import UserForm from "../components/UserForm";
import { Navigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

function UserPage() {
  const { loggedInUser, logout } = useAuth();
  const userExist = localStorage.getItem("user");

  useEffect(() => {
    if (loggedInUser) {
      console.log("Zalogowany użytkownik:", loggedInUser);
    }
  }, [loggedInUser]);


  //make this part into Use Effect 
  if (!loggedInUser) {
    return <Navigate to="/Configurator" />;
  }

    const handleLogout = () => {
      window.sessionStorage.removeItem("user");
      logout();
      console.log("Użytkownik został wylogowany");
    }

    return (

      <div className={styles.mainContainer}>
        {loggedInUser ? (

          <div>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Zalogowany jako: {loggedInUser}
            </Alert>
            <Link to="/LoginPage">
              <Button variant="contained" color="error" onClick={handleLogout}>
                Wyloguj
              </Button>
            </Link>
            <div
              className={styles.tooltip}

            >
            </div>
            <h3>
              Witaj na swojej stronie użytkownika! Tutaj możesz zarządzać swoim kontem oraz korzystać z różnych funkcji.
            </h3>
            <h2>Profil Twojego Konta</h2>
            <UserForm loggedInUser={loggedInUser} />
          </div>
        ) : (
          <div>
            <Alert
              severity="error">
              Nie jesteś zalogowany.
            </Alert>
            <Link to="/configurator">
              <Button variant="contained" >
                Powrót
              </Button>
            </Link>
          </div>
        )}

      </div>

    );
  }

  export default UserPage;

//po klikneicu powrot resetuje sie pamiec w aplikacji i nie poakzuje stanu ze ktos jest zalogowany 
