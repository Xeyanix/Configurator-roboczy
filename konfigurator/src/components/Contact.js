import React from 'react';
import styles from "../common/styles/Contact.module.scss";
import ResponsiveAppBar from './ResponsiveAppBar';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faClock, faMapMarkerAlt, faBriefcase } from '@fortawesome/free-solid-svg-icons';

function Contact() {

    const handleScrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.box}>
            <div className={styles.container}>
                <ResponsiveAppBar />
                <main>
                    <section className={styles.banner}>
                        <div className={styles.banner__containerwrapper}>
                            <div className={styles.banner__text}>
                                <h1 className={styles.banner__title}>Kontakt</h1>
                                <p className={styles.banner__sub_title}>
                                    WebTune to firma specjalizująca się w tworzeniu stron internetowych na zamówienie oraz składaniu komputerów dopasowanych do indywidualnych potrzeb użytkownika i jego pracy. Znajdziesz nas w Białymstoku.

                                    Skontaktuj się z nami i dostosuj stronę internetową do swoich możliwości!
                                </p>
                            </div>
                            <button
                                href="#contact"
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
                    </section>

                    <section className={styles.contact} id="contact">
                        <div className={styles.contact__container}>
                            <div className={styles.contact__content}>
                                <div className={styles.contact__form}>
                                    <h2 className={styles.contact__title}>Skontaktuj się z nami!</h2>
                                    <p className={styles.contact__caption}>
                                        Masz pytanie lub potrzebujesz wyceny? Wypełnij poniższy formularz, a
                                        nasi specjaliści skontaktują się z Tobą!
                                    </p>
                                    <form action="post" >
                                        <div className={styles.contact__form_col}>
                                            <div className={styles.contact__form_item}>
                                                <input
                                                    type="text"
                                                    name="con_name"
                                                    id="con_name"
                                                    placeholder="Imię i nazwisko"
                                                    aria-label="Imię i nazwisko"
                                                    className={styles.contact__form_input}
                                                    required=""
                                                />
                                                <p className={styles.error_text}></p>
                                            </div>
                                            <div className={styles.contact__form_item}>
                                                <input
                                                    type="email"
                                                    name="con_email"
                                                    id="con_email"
                                                    placeholder="Adres e-mail"
                                                    aria-label="Adres e-mail"
                                                    className={styles.contact__form_input}
                                                    required=""
                                                />
                                                <p className={styles.error_text}></p>
                                            </div>
                                        </div>
                                        <div className={styles.contact__form_col}>
                                            <div className={styles.contact__form_item}>
                                                <input
                                                    type="tel"
                                                    name="con_tel"
                                                    id="con_tel"
                                                    placeholder="Nr. kontaktowy"
                                                    aria-label="Numer kontaktowy"
                                                    className={styles.contact__form_input}
                                                />
                                                <p className={styles.error_text}></p>
                                            </div>
                                            <div className={styles.contact__form_item}>
                                                <select
                                                    name="con_subject"
                                                    id="con_subject"
                                                    className={styles.contact__form_select}
                                                >
                                                    <option value="">Wybierz temat wiadomości</option>
                                                    <option value="Wycena">Wycena</option>
                                                    <option value="Kontakt">Kontakt</option>
                                                    <option value="Oferta">Oferta</option>
                                                    <option value="Współpraca">Współpraca</option>
                                                    <option value="Błąd">Błąd na stronie</option>
                                                    <option value="Inny">Inny</option>
                                                </select>
                                                <p className={styles.error_text}></p>
                                            </div>
                                        </div>
                                        <div className={styles.contact__form_row}>
                                            <div className={styles.contact__form_item_full}>
                                                <textarea
                                                    name="con_message"
                                                    id="con_message"
                                                    placeholder="Treść wiadomości"
                                                    aria-label="Treść wiadomości"
                                                    className={styles.contact__form_textarea}
                                                    required=""
                                                ></textarea>
                                                <p className={styles.error_text}></p>
                                            </div>
                                        </div>
                                        <div className={styles.contact__form_row}>
                                            <div className={styles.contact__form_item_full}>
                                                <div className={styles.contact__form_consents}>
                                                    <input
                                                        type="checkbox"
                                                        name="con_consent"
                                                        id="con_consent"
                                                        aria-label="Zgoda na przetwarzanie danych"
                                                        required=""
                                                    />
                                                    <label htmlFor="con_consent" className={styles.contact__form_consents_label}>
                                                        Wyrażam zgodę na przetwarzanie moich danych osobowych przez
                                                        DigiDraft w celach kontaktowych.
                                                    </label>
                                                </div>
                                                <p className={styles.error_text}></p>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className={`${styles.contact__form_submit}`}
                                            title="Przycisk służący do wysyłki formularza kontaktowego."
                                        >
                                            <span>Wyślij</span>
                                        </button>
                                    </form>

                                </div>

                                <div className={styles.contact__info}>
                                    <div className={styles.contact__card}>
                                        <div className={styles.contact__card_content}>
                                            <FontAwesomeIcon icon={faPhone} size="3x" />
                                            <div className={styles.contact__card_text}>
                                                <h4 className={styles.contact__card_title}>Dane kontaktowe</h4>
                                                <p className={styles.contact__card_caption}>
                                                    <a href="tel:+48514316481" className={styles.contact__card_phone} title="Link z numerem telefonu do naszej firmy.">
                                                        <span>+48 514 316 481</span>
                                                    </a>
                                                </p>
                                                <p className={styles.contact__card_caption}>
                                                    <a href="mailto:biuro@digidraft.pl" className={styles.contact__card_email} title="Link z adresem e-mail do naszej firmy.">
                                                        <span>biuro@digidraft.pl</span>
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.contact__card1}>
                                        <div className={styles.contact__card_content}>
                                            <FontAwesomeIcon icon={faClock} size="3x" />
                                            <div className={styles.contact__card_text}>
                                                <h4 className={styles.contact__card_title}>Godziny otwarcia</h4>
                                                <p className={styles.contact__card_caption}>9<sup>00</sup> - 18<sup>00</sup></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.contact__card}>
                                        <div className={styles.contact__card_content}>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" />
                                            <div className={styles.contact__card_text}>
                                                <h4 className={styles.contact__card_title}>Wirtualne biuro</h4>
                                                <p className={styles.contact__card_caption}>
                                                    WebTune - Strony Internetowe  / Komputery <br />
                                                    ul. Pogodna 27<br />
                                                    15-694 Fasty<br />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.contact__card1}>
                                        <div className={styles.contact__card_content}>
                                            <FontAwesomeIcon icon={faBriefcase} size="3x" />
                                            <div className={styles.contact__card_text}>
                                                <h4 className={styles.contact__card_title}>Dane rozliczeniowe</h4>
                                                <p className={styles.contact__card_caption}>
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
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default Contact;
