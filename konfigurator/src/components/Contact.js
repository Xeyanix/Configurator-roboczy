import React from 'react';
import styles from "../common/styles/Contact.module.scss";
import ResponsiveAppBar from './ResponsiveAppBar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faClock, faMapMarkerAlt, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";

function Contact() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        consent: false,
    });
    useEffect(() => {
        window.scrollTo({
            // top: 0,
            behavior: 'smooth',
        });
    }, []);
    const handleScrollToContact = () => {
        const contactSection = document.getElementById('contactSection');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Tutaj możesz przekazać dane formularza do funkcji obsługującej wysłanie
    };

    return (
        <div>
            <ResponsiveAppBar />
            <main>
                <div className={styles.MainContainer}>
                    <div className={styles.banner}>
                        <div className={styles.banner__containerwrapper}>
                            <div>
                                <h1 className={styles.banner__title}>Kontakt</h1>
                                <p className={styles.banner__sub_title}>
                                    WebTune to firma specjalizująca się w tworzeniu stron internetowych na zamówienie oraz składaniu komputerów dopasowanych do indywidualnych potrzeb użytkownika i jego pracy. Znajdziesz nas w Białymstoku.

                                    Skontaktuj się z nami i dostosuj stronę internetową do swoich możliwości!
                                </p>
                            </div>

                            <button
                                href="#contactSection"
                                onClick={handleScrollToContact}
                                className={styles.banner__btn}
                                title="Link kierujący do kolejnej sekcji 'Kontakt' zawierającej formularz kontaktowy."
                            >
                                <svg
                                    width="22px"
                                    height="22px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={styles.banner__btn_icon}
                                >
                                    <path
                                        d="M6 15L11.2929 9.70711C11.6834 9.31658 12.3166 9.31658 12.7071 9.70711L18 15"
                                        stroke="#f9f9ff"
                                        strokeWidth="2.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className={styles.contact} id="contactSection">
                        <div className={`${styles.contact__container} ${styles.contact__wrapper}`}>
                            <div className={`${styles.contact__content} ${styles.contact__content__left}`}>
                                <div className={styles.contact_text}>
                                    <h2 className={styles.contact__title}>Skontaktuj się z nami!</h2>
                                    <p className={styles.contact__caption}>
                                        Masz pytanie lub potrzebujesz wyceny? Wypełnij poniższy formularz, a
                                        nasi specjaliści skontaktują się z Tobą!
                                    </p>
                                </div>
                                <form className={styles.contact__form} onSubmit={handleSubmit}>
                                    <div class={styles.contact__form_row}>
                                        <div className={styles.contact__form_item}>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="Imię"
                                                className={styles.contact__form_inputField}
                                            />
                                            <p class="error-text"></p>
                                        </div>
                                        <div className={styles.contact__form_item}>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                placeholder="Nazwisko"
                                                className={styles.contact__form_inputField}
                                            />
                                            <p class="error-text"></p>
                                        </div>
                                    </div>
                                    <div class={styles.contact__form_row}>
                                        <div className={styles.contact__form_item}>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Adres e-mail"
                                                className={styles.contact__form_inputField}
                                            />
                                            <p class="error-text"></p>
                                        </div>
                                        <div className={styles.contact__form_item}>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Numer telefonu"
                                                className={styles.contact__form_inputField}
                                            />
                                            <p class="error-text"></p>
                                        </div>
                                    </div>
                                    <div className={styles.contact__form_row}>
                                        <div className={styles.contact__form_item}>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className={styles.contact__form_selectField}
                                            >
                                                <option value="">Wybierz temat wiadomości</option>
                                                <option value="Wycena">Wycena</option>
                                                <option value="Kontakt">Kontakt</option>
                                                <option value="Oferta">Oferta</option>
                                                <option value="Współpraca">Współpraca</option>
                                                <option value="Błąd">Błąd na stronie</option>
                                                <option value="Inny">Inny</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.contact__form_row}>
                                        <div className={styles.contact__form_item}>
                                            <textarea
                                                type="text"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Treść wiadomości"
                                                className={styles.contact__form_areaField}
                                            />
                                            <p class="error-text"></p>
                                        </div>
                                    </div>
                                    <div className={`${styles.contact__form_row} ${styles.contact__form_row_consent}`}>
                                        <div className={styles.contact__form_consent}>
                                            <label className={styles.contact__form_checkboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    name="consent"
                                                    checked={formData.consent}
                                                    onChange={handleChange}
                                                    className={styles.contact__form_checkboxField}
                                                />
                                                Wyrażam zgodę na przetwarzanie moich danych osobowych przez WebTune w celach kontaktowych. Więcej informacji o tym, jak przetwarzamy Twoje dane, znajdziesz w naszej polityce prywatności.
                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" className={styles.contact__form_submitButton}>
                                        Wyślij
                                    </button>
                                </form>
                            </div>
                            <div className={`${styles.contact__content} ${styles.contact__content__right}`}>
                                <div className={styles.contact__info_card}>
                                    <div className={styles.contact__info_card_content}>
                                        <FontAwesomeIcon icon={faPhone} size="2x" />
                                        <div className={styles.contact__info_card_text}>
                                            <h4 className={styles.contact__info_card_title}>Dane kontaktowe</h4>
                                            <p className={styles.contact__info_card_caption}>
                                                <a href="tel:+48514316481"  title="Link z numerem telefonu do naszej firmy.">
                                                    <span>+48 514 316 481</span>
                                                </a>
                                            </p>
                                            <p className={styles.contact__info_card_caption}>
                                                <a href="mailto:biuro@digidraft.pl" className={styles.contact__info_card_phone} title="Link z adresem e-mail do naszej firmy.">
                                                    <span>biuro@digidraft.pl</span>
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.contact__info_card}>
                                    <div className={styles.contact__info_card_content}>
                                        <FontAwesomeIcon icon={faClock} size="2x" />
                                        <div className={styles.contact__info_card_text}>
                                            <h4 className={styles.contact__info_card_title}>Godziny otwarcia</h4>
                                            <p className={styles.contact__info_card_caption}>9<sup>00</sup> - 18<sup>00</sup></p>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.contact__info_card}>
                                    <div className={styles.contact__info_card_content}>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
                                        <div className={styles.contact__info_card_text}>
                                            <h4 className={styles.contact__info_card_title}>Wirtualne biuro</h4>
                                            <p className={styles.contact__info_card_caption}>
                                                WebTune - Strony Internetowe <br />
                                                ul. Pogodna 27<br />
                                                15-694 Fasty<br />
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.contact__info_card}>
                                    <div className={styles.contact__info_card_content}>
                                        <FontAwesomeIcon icon={faBriefcase} size="2x" />
                                        <div className={styles.contact__info_card_text}>
                                            <h4 className={styles.contact__info_card_title}>Dane rozliczeniowe</h4>
                                            <p className={styles.contact__info_card_caption}>
                                                cos  jakastam <br />
                                                ul. asdasda 4/43<br />
                                                02-654 Białystok<br />
                                                NIP: 123456789<br />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
            <div id="contactSection">
                <Footer />
            </div>
        </div >

    );
}

export default Contact;
