import React, { useState } from 'react';
import styles from "../common/styles/About.module.scss";
import { useLocation } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Footer from './Footer';

function About() {
    const { state } = useLocation();
    const loggedInUser = state?.loggedInUser;
    const [setScrollPosition] = useState(0);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setScrollPosition(0);
    };


    return (
        <div>
            <ResponsiveAppBar />
            <div className={styles.mainContainer}>
                <section id="aboutSection" className={styles.about}>
                    <div class="container" className={styles.header}>
                        <h2>O nas</h2>
                        <p>Web Tune to firma zajmująca się tworzeniem profesjonalnych stron internetowych oraz budowaniem komputerów na zamówienie od lat. Nasz zespół ekspertów składa się z doświadczonych programistów, grafików i specjalistów od sprzętu komputerowego.</p>
                        <p>Jesteśmy dumni z naszego podejścia do projektowania, które skupia się na precyzji, kreatywności i zadowoleniu klienta. Bez względu na to, czy potrzebujesz nowoczesnej strony internetowej dla swojej firmy czy też wydajnego komputera do pracy, jesteśmy tutaj, aby Ci pomóc.</p>
                    </div>
                </section>
            </div>

            <div id="contactSection">
                <Footer />
            </div>
        </div>
    );
}

export default About;
