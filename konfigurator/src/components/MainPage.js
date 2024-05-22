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
                    <section id="aboutSection" className={styles.about}>
                        <div class="container" className={styles.header}>
                            <h2>O nas</h2>
                            <p>Web Tune to firma zajmująca się tworzeniem profesjonalnych stron internetowych oraz budowaniem komputerów na zamówienie od lat. Nasz zespół ekspertów składa się z doświadczonych programistów, grafików i specjalistów od sprzętu komputerowego.</p>
                            <p>Jesteśmy dumni z naszego podejścia do projektowania, które skupia się na precyzji, kreatywności i zadowoleniu klienta. Bez względu na to, czy potrzebujesz nowoczesnej strony internetowej dla swojej firmy czy też wydajnego komputera do pracy, jesteśmy tutaj, aby Ci pomóc.</p>
                        </div>
                    </section>
                    <section className={styles.offer}>
                        <div id="projectSection" className={styles.header}>

                            <p>Oferta</p>
                            <h2 class="section__title section__title--no-margin">
                                Sukces w zasięgu ręki – zapoznaj się z naszymi usługami.
                            </h2>
                        </div>
                        <div className={styles.projects}>
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
                        </div>
                        <div className={styles.aboutButton} >
                            <Link to="/Offer">
                                <Button variant="contained">

                                    Zobacz wszystkie nasze usługi

                                </Button>
                            </Link>
                        </div>
                    </section>
                </div>
                <div>
                    <div id="contactSection">
                        <Footer />
                    </div>
                </div>
            </main >
        </div >
    );
}

export default MainPage;
