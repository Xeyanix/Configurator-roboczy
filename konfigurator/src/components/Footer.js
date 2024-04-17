import React, { useState } from 'react';
import Button from "@mui/material/Button";
import styles from "../common/styles/Footer.module.scss";
import { Link } from 'react-router-dom';



function Footer() {
    const [setScrollPosition] = useState(0);



    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setScrollPosition(0);
    };


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

    return (
        <footer className={styles.footer}>
            <div id="contactSection" className={styles.contactSection}>
                <div >


                    <div className={styles.buttonsContainer}>
                        <Link to="/MainPage">
                            <Button variant="contained" color="error">
                                Strona Główna
                            </Button>
                        </Link>
                        <Link to="/LoginPage">
                            <Button variant="contained">
                                Zaloguj
                            </Button>
                        </Link>
                        <Button onClick={scrollToContactSection} variant="contained" color="secondary">
                            Kontakt
                        </Button>
                        <Button onClick={scrollToTop} variant="contained" color="success">
                            Do góry
                        </Button>
                    </div>
                </div>


            </div>
            <div className={styles.downMenu}>
                <p className={styles.copyrightText}>
                    <Link to="/MainPage" >
                        Configurator
                    </Link>
                    {' '}&copy; {new Date().getFullYear()} |
                    Wszystkie prawa zastrzeżone.
                </p>
                <div >
                    <ul className={styles.socialMediaLinks}>
                        <li>
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                title="LinkedIn WebTune"
                                href="https://www.linkedin.com/in/jan-goralewski/"
                            >
                                <svg
                                    fill="#000000"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1em"
                                    viewBox="0 0 448 512"
                                >
                                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                title="Facebook WebTune"
                                href="https://www.facebook.com/jan.goralewski2"
                            >
                                <svg
                                    fill="#000000"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1em"
                                    viewBox="0 0 320 512"
                                >
                                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                </svg>

                            </a>
                        </li>
                        <li>
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                title="Instagram WebTune"
                                href="https://www.instagram.com/bboyjohnny/"
                            >
                                <svg
                                    fill="#000000"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="1em"
                                    viewBox="0 0 24 24" 
                                >
                                    <path d="m16 12v-.001c0-2.209-1.791-4-4-4s-4 1.791-4 4 1.791 4 4 4c1.104 0 2.104-.448 2.828-1.171.723-.701 1.172-1.682 1.172-2.768 0-.021 0-.042-.001-.063v.003zm2.16 0c-.012 3.379-2.754 6.114-6.135 6.114-3.388 0-6.135-2.747-6.135-6.135s2.747-6.135 6.135-6.135c1.694 0 3.228.687 4.338 1.797 1.109 1.08 1.798 2.587 1.798 4.256 0 .036 0 .073-.001.109v-.005zm1.687-6.406v.002c0 .795-.645 1.44-1.44 1.44s-1.44-.645-1.44-1.44.645-1.44 1.44-1.44c.398 0 .758.161 1.018.422.256.251.415.601.415.988v.029-.001zm-7.84-3.44-1.195-.008q-1.086-.008-1.649 0t-1.508.047c-.585.02-1.14.078-1.683.17l.073-.01c-.425.07-.802.17-1.163.303l.043-.014c-1.044.425-1.857 1.237-2.272 2.254l-.01.027c-.119.318-.219.695-.284 1.083l-.005.037c-.082.469-.14 1.024-.159 1.589l-.001.021q-.039.946-.047 1.508t0 1.649.008 1.195-.008 1.195 0 1.649.047 1.508c.02.585.078 1.14.17 1.683l-.01-.073c.07.425.17.802.303 1.163l-.014-.043c.425 1.044 1.237 1.857 2.254 2.272l.027.01c.318.119.695.219 1.083.284l.037.005c.469.082 1.024.14 1.588.159l.021.001q.946.039 1.508.047t1.649 0l1.188-.024 1.195.008q1.086.008 1.649 0t1.508-.047c.585-.02 1.14-.078 1.683-.17l-.073.01c.425-.07.802-.17 1.163-.303l-.043.014c1.044-.425 1.857-1.237 2.272-2.254l.01-.027c.119-.318.219-.695.284-1.083l.005-.037c.082-.469.14-1.024.159-1.588l.001-.021q.039-.946.047-1.508t0-1.649-.008-1.195.008-1.195 0-1.649-.047-1.508c-.02-.585-.078-1.14-.17-1.683l.01.073c-.07-.425-.17-.802-.303-1.163l.014.043c-.425-1.044-1.237-1.857-2.254-2.272l-.027-.01c-.318-.119-.695-.219-1.083-.284l-.037-.005c-.469-.082-1.024-.14-1.588-.159l-.021-.001q-.946-.039-1.508-.047t-1.649 0zm11.993 9.846q0 3.578-.08 4.953c.005.101.009.219.009.337 0 3.667-2.973 6.64-6.64 6.64-.119 0-.237-.003-.354-.009l.016.001q-1.375.08-4.953.08t-4.953-.08c-.101.005-.219.009-.337.009-3.667 0-6.64-2.973-6.64-6.64 0-.119.003-.237.009-.354l-.001.016q-.08-1.375-.08-4.953t.08-4.953c-.005-.101-.009-.219-.009-.337 0-3.667 2.973-6.64 6.64-6.64.119 0 .237.003.354.009l-.016-.001q1.375-.08 4.953-.08t4.953.08c.101-.005.219-.009.337-.009 3.667 0 6.64 2.973 6.64 6.64 0 .119-.003.237-.009.354l.001-.016q.08 1.374.08 4.953z" /></svg>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </footer >
    );
}

export default Footer;

