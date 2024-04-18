import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import styles from "../common/styles/WelcomePage.module.scss";
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import ResponsiveAppBar from "./ResponsiveAppBar";

function Welcome() {
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
        window.location.href = "/MainPage";
    }


    const projectsData = [
        { title: "Tworzenie stron", description: "Zamów swoją strone internetową", buttonText: "Zamów swoją stronę" },
        { title: "Konfigurator PC", description: "Zbuduj swój komputer", buttonText: "Konfigurator" },
        { title: "Składanie Komputerów", description: "Komputer na zamówienie", buttonText: "Zamów swój komputer" },
        { title: "CV", description: "Znajdź wszystkie informacje o mnie.", buttonText: "CV Page" },
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
            <ResponsiveAppBar />
            <main>
                <div className={styles.MainContainer}>
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
                    <div id="contactSection">
                        <Footer />
                    </div>

                </div>
            </main>
        </div>
    );
}

export default Welcome;
