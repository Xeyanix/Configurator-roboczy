import React, { useState, useEffect } from "react";
import styles from '../../common/styles/Columns.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Snackbar, Typography, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from "../../context/Context";
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

function ResponsiveAppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { loggedInUser } = useAuth();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleKontoClick = (event) => {
    event.preventDefault();
    if (!loggedInUser) {
      setOpen(true);
    } 
  };

  useEffect(() => {
    // Resetuj stan "open" przy zmianie ścieżki
    setOpen(false);
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

  const menuItems = [
    { label: "Witaj !", path: "/" },
    { label: "Strona Główna", path: "/MainPage" },
    { label: "Zaloguj", path: "/LoginPage" },
    { label: "Konto", path: "/UserPage", onClick: handleKontoClick },
    { label: "Kontakt", onClick: scrollToContactSection },
  ];

  const BarItems = [
    { label: "Witaj !", path: "/" },
    { label: "Strona Główna", path: "/MainPage" },
    { label: "Zaloguj", path: "/LoginPage" },
    { label: "Konto", path: "/UserPage", onClick: handleKontoClick },
    { label: "Kontakt", onClick: scrollToContactSection },
  ];

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={styles.wrapper}>
          <Typography
            variant="h4"
            noWrap
            component={Link}
            to="/MainPage"
            sx={{
              mr: 0,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PC Configurator
          </Typography>

          <div className={styles.otherPageButtons}>
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

            {!loggedInUser && (
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={`Zaloguj się ! `}
                action={
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={() => setOpen(false)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
              />
            )}

            {loggedInUser && (
              <Alert
                severity="success"
                open={open}
                onClose={() => setOpen(false)}
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
