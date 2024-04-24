import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import styles from "../common/styles/WelcomePage.module.scss";
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import ResponsiveAppBar from "./ResponsiveAppBar";

function MainPage() {
    const [openSnackbar, setOpenSnackbar] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setOpenSnackbar(false);
    }, [navigate]);



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
        window.location.href = "/ConfigurePage";
    }


    const projectsData = [
        { title: "Tworzenie stron", description: "Zamów swoją strone internetową", buttonText: "Zamów swoją stronę" },
        { title: "Konfigurator PC", description: "Zbuduj swój komputer", buttonText: "Konfigurator" },
        { title: "Składanie Komputerów", description: "Komputer na zamówienie", buttonText: "Zamów swój komputer" },
        { title: "CV", description: "Znajdź wszystkie informacje o mnie.", buttonText: "CV Page" },
    ];


    return (
        <div>
            <ResponsiveAppBar />
            <main>
                <div className={styles.MainContainer}>

                    <header id="projectSection" className={styles.header}>
                        <h1>Oferta</h1>
                    </header>
                    <section  className={styles.projects}>

                        {projectsData.map((project, index) => (
                            <div
                                key={index}
                                className={styles.option}
                                onClick={index === 0 ? redirectToOrderWebsite : index === 2 ? redirectToOrderPC : index === 3 ? redirectToCV : () => redirectToConfigurator(index)}>

                                <h2>{project.title}</h2>

                                <p>{project.description}</p>
                                <Link to={index === 0 ? "/OrderWebsite" : index === 2 ? "/OrderPC" : index === 3 ? "/ShowPage" : "/ConfigurePage"}>
                                    <Button variant="contained">
                                        {project.buttonText}
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </section>
                </div>

                <div>
                    <div id="contactSection">
                        <Footer />
                    </div>

                </div>
            </main>
        </div>
    );
}

export default MainPage;
