import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import styles from "../common/styles/WelcomePage.module.scss";
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import Footer from './Footer';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

function Welcome() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [goUp, setGoUp] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };
    const redirectToOrderWebsite = () => {
        window.location.href = "/OrderWebsite";
    }

    const redirectToOrderPC = () => {
        window.location.href = "/OrderPC";
    }

    const redirectToCV = () => {
        window.location.href = "/ShowPage";
    }

    const redirectToConfigurator = () => {
        window.location.href = "/MainPage";
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        const onPageScroll = () => {
            if (window.scrollY > 600) {
                setGoUp(true);
            } else {
                setGoUp(false);
            }
        };
        window.addEventListener("scroll", onPageScroll);

        return () => {
            window.removeEventListener("scroll", onPageScroll);
        };
    }, []);

    const projectsData = [
        { title: "Tworzenie stron", description: "Zamów swoją strone internetową", buttonText: "Zamów swoją stronę" },
        { title: "Konfigurator PC", description: "Zbuduj swój komputer", buttonText: "Konfigurator" },
        { title: "Składanie Komputerów", description: "Komputer na zamówienie", buttonText: "Zamów swój komputer" },
        { title: "CV", description: "Znajdź wszystkie informacje o mnie.", buttonText: "CV Page" },
    ];

    const menuItems = [
        { label: "Strona Główna", path: "" },
        { label: "O nas", path: "" },
        { label: "Realizacje", path: "" },
        { label: "Projekty", path: "Projects" },
        { label: "Kontakt", path: "Contact" },
    ];

    const BarItems = [
        { label: "Strona Główna", path: "" },
        { label: "O nas", path: "" },
        { label: "Realizacje", path: "" },
        { label: "Projekty", path: "Projects" },
        { label: "Kontakt", path: "Contact" },
    ];

    return (
        <div>
            {/* <div>
                <img src="%PUBLIC_URL%/logo192.png" alt="WebTune Logo" width="50" height="50" />
                <h1>WebTune</h1>
                <div class="description">
                    <p>Witaj w WebTune - Tworzymy nowoczesne strony internetowe
                        W WebTune tworzymy strony internetowe, które nie tylko przyciągają uwagę dzięki nowoczesnemu designowi, ale również są zoptymalizowane pod kątem UX/UI, co zapewnia najlepsze doświadczenia dla użytkowników.

                        Projektujemy strony z myślą o dostosowaniu do wszystkich urządzeń i optymalizacji SEO, co zapewnia maksymalną widoczność Twojej firmy online.</p>
                </div>
                <button class="start-button">Poproś o wycene</button>
            </div> */}

            <main>
                <div className={styles.MainContainer}>
                    <AppBar position="static">
                        <Toolbar className={styles.wrapper}>
                            <div className={styles.otherPageButtons}>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                    onClick={toggleDrawer(true)}
                                >
                                    <MenuIcon />
                                </IconButton>
                                {BarItems.map((item, index) => (
                                    item.label && (
                                        <div key={index}>
                                            {item.path === 'Projects' ? (
                                                <ScrollLink
                                                    to="projectSection"
                                                    smooth={true}
                                                    duration={500}
                                                    offset={-64}
                                                >
                                                    <MenuItem button component={Link}>
                                                        <ListItemText primary={item.label} />
                                                    </MenuItem>
                                                </ScrollLink>
                                            ) : item.path === 'Contact' ? (
                                                <ScrollLink
                                                    to="contactSection"
                                                    smooth={true}
                                                    duration={500}
                                                    offset={-64}
                                                >
                                                    <MenuItem button component={Link}>
                                                        <ListItemText primary={item.label} />
                                                    </MenuItem>
                                                </ScrollLink>
                                            ) : (
                                                <ScrollLink
                                                    to={item.path}
                                                    smooth={true}
                                                    duration={500}
                                                    offset={-64}
                                                >
                                                    <MenuItem button component={Link}>
                                                        <ListItemText primary={item.label} />
                                                    </MenuItem>
                                                </ScrollLink>
                                            )}
                                        </div>
                                    )
                                ))}
                            </div>
                        </Toolbar>
                    </AppBar>


                    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                        <List className={styles.menu}>
                            {menuItems.map((item, index) => (
                                item.label && (
                                    <div key={index}>
                                        {item.path === 'Projects' ? (
                                            <ScrollLink
                                                to="projectSection"
                                                smooth={true}
                                                duration={500}
                                                offset={-64}
                                            >
                                                <ListItem button component={Link}>
                                                    <ListItemText primary={item.label} />
                                                </ListItem>
                                            </ScrollLink>
                                        ) : item.path === 'Contact' ? (
                                            <ScrollLink
                                                to="contactSection"
                                                smooth={true}
                                                duration={500}
                                                offset={-64}
                                            >
                                                <ListItem button component={Link}>
                                                    <ListItemText primary={item.label} />
                                                </ListItem>
                                            </ScrollLink>
                                        ) : (
                                            <ListItem button>
                                                <ListItemText primary={item.label} />
                                            </ListItem>
                                        )}
                                    </div>
                                )
                            ))}
                        </List>
                    </Drawer>
                    <header className={styles.header}>
                        <h1>Oferta</h1>
                    </header>

                    <section id="projectSection" className={styles.projects}>
                        {projectsData.map((project, index) => (
                            <div
                                key={index}
                                className={styles.option}
                                onClick={index === 0 ? redirectToOrderWebsite : index === 2 ? redirectToOrderPC : index === 4 ? redirectToCV : () => redirectToConfigurator(index)}>

                                <h2>{project.title}</h2>

                                <p>{project.description}</p>
                                <Link to={index === 0 ? "/OrderWebsite" : index === 2 ? "/OrderPC" : index === 4 ? "/ShowPage" : "/MainPage"}>
                                    <Button variant="contained">
                                        {project.buttonText}
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </section>
                </div>

                <div>
                    <section id="contact">
                        <Footer />
                    </section>

                </div>
                <div
                    onClick={scrollToTop}
                    className={`${styles.scroll_up} ${goUp ? styles.showScroll : ""}`}
                    title="Lnik kierujący na początek strony"
                >
                    <FontAwesomeIcon icon={faAngleUp} />

                </div>

            </main>

            <footer className={styles.footer}>
                <div className={styles.downMenu}>
                    <p className={styles.copyrigthText}>
                        &copy; {new Date().getFullYear()}{' '}
                        <Link to="/MainPage" >
                            Configurator
                        </Link>
                        . All rights reserved.
                    </p>

                    <div className={styles.buttonsContainer}>
                        <ScrollLink
                            smooth={true}
                            duration={500}
                            offset={-64}
                            to="projectSection"
                        >
                            <Button variant="contained" color="error">
                                Projekty
                            </Button>
                        </ScrollLink>
                        <ScrollLink
                            smooth={true}
                            duration={500}
                            offset={-64}
                            to="contact"
                        >
                            <Button variant="contained" color="secondary">
                                Kontakt
                            </Button>
                        </ScrollLink>

                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Welcome;
