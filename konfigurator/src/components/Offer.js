import React, { useState } from 'react';
import styles from "../common/styles/Offer.module.scss";
import { useLocation } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Footer from './Footer';

function Offer() {
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
                    <p>Oferta</p>
                            <h2 class="section__title section__title--no-margin">
                                Sukces w zasięgu ręki – zapoznaj się z naszymi usługami.
                            </h2>
                    </div>
                </section>
            </div>

            <div id="contactSection">
                <Footer />
            </div>
        </div>
    );
}

export default Offer;
