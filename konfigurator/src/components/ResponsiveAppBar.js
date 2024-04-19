import React, { useState, useEffect } from "react";
import styles from '../common/styles/Columns.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Snackbar, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from "../context/Context";
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Brightness7 from '@mui/icons-material/Brightness7';
import Brightness4 from '@mui/icons-material/Brightness4';

function ResponsiveAppBar() {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { loggedInUser } = useAuth();
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    console.log("toggleDarkMode called");
    setDarkMode(!darkMode);
    console.log("Stan darkMode po aktualizacji:", !darkMode);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleKontoClick = (event) => {
    event.preventDefault();
    if (!loggedInUser) {
      setOpenSnackbar(true);
    } else {
      navigate("/UserPage");
    }
  };

  useEffect(() => {
    // Resetuj stan "open" przy zmianie ścieżki
    setOpenSnackbar(false);
  }, [navigate]);

  const scrollToContactSection = () => {
    const contactSection = document.getElementById("contactSection");
    if (contactSection) {
      const contactSectionPosition = contactSection.offsetTop;
      window.scrollTo({
        top: contactSectionPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToProjectSection = () => {
    const projectSection = document.getElementById("projectSection");
    if (projectSection) {
      const projecttSectionPosition = projectSection.offsetTop;
      window.scrollTo({
        top: projecttSectionPosition,
        behavior: "smooth",
      });
    }
  };
  const BarItems = [
    { label: "Strona Główna", path: "/" },
    { label: "O nas", path: "" },
    { label: "Oferta", onClick: scrollToProjectSection },
    { label: "Realizacje", path: "" },
    { label: "Konfiguruj !", path: "/ConfigurePage" },
    { label: "Zaloguj", path: "/LoginPage" },
    { label: "Konto", path: "/UserPage", onClick: handleKontoClick },
    { label: "Kontakt", path: "/Contact", onClick: scrollToContactSection },
  ];

  const menuItems = [
    { label: "Strona Główna", path: "/" },
    { label: "O nas", path: "" },
    { label: "Oferta", onClick: scrollToProjectSection },
    { label: "Realizacje", path: "" },
    { label: "Konfiguruj !", path: "/ConfigurePage" },
    { label: "Zaloguj", path: "/LoginPage" },
    { label: "Konto", path: "/UserPage", onClick: handleKontoClick },
    { label: "Kontakt", path: "/Contact", onClick: scrollToContactSection },
  ];



  return (
    <div>
      <AppBar position="static" className={darkMode ? styles.darkMode : styles.lightMode}>
        <Toolbar className={styles.wrapper}>
          <div className={styles.otherPageButtons}>
            <h3 className="navbar-title">
              <Link to="/">
                WebTune <span className="navbar-sign">+</span>
              </Link>
            </h3>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />

            </IconButton>

            {BarItems.map((item, index) => (
              item.label && (

                <MenuItem
                  button
                  key={index}
                  component={item.path ? Link : "button"}
                  to={item.path}
                  onClick={item.onClick}
                >
                  <ListItemText primary={item.label} />

                </MenuItem>

              )
            ))}
            <IconButton
              edge="end"
              color="inherit"
              aria-label="dark mode toggle"
              onClick={toggleDarkMode}
            >
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            {!loggedInUser && (
              <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                message={`Zaloguj się ! `}
                action={
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={() => setOpenSnackbar(false)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
              />
            )}

            {loggedInUser && (
              <Alert
                severity="success"
                open={openSnackbar}
              // onClose={() => setOpenSnackbar(false)}
              >
                Zalogowany jako: {loggedInUser}
              </Alert>
            )}

          </div>

        </Toolbar>

      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              component={item.path ? Link : "button"}
              to={item.path}
              onClick={item.onClick}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}

        </List>
      </Drawer>

    </div>
  );
}

export default ResponsiveAppBar;
