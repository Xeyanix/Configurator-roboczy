import React from 'react';
import styles from '../../common/styles/Contact.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Contact() {
    const linkDoLinkedIn = "https://www.linkedin.com/in/jan-goralewski/";
    const linkDoInstagram = "https://www.instagram.com/bboyjohnny/";
    const linkDoFacebook = "https://www.facebook.com/jan.goralewski2";

    return (
        <div id="contactSection" className={styles.contactSection}>
            <div >
                <h2 className={styles.h2} >
                    Zapraszam do kontaktu
                </h2>
                <p className={styles.p}>
                    <strong>Social media</strong>
                </p>
                <div >
                    <ul className={styles.socialMediaLinks}>
                        <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://www.linkedin.com/in/jan-goralewski/"
                            class="wp-block-social-link-anchor">
                            <a href={linkDoLinkedIn} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLinkedin} size="2x" />
                            </a> &nbsp;
                            <span class="wp-block-social-link-label">Janek Góralewski</span>
                        </a>
                        <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://www.linkedin.com/in/jan-goralewski/"
                            class="wp-block-social-link-anchor">
                            <a href={linkDoInstagram} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} size="2x" />
                            </a> &nbsp;

                            <span class="wp-block-social-link-label">Bboy Johnny</span>
                        </a>
                        <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://www.facebook.com/jan.goralewski2"
                            class="wp-block-social-link-anchor">
                            <a href={linkDoFacebook} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebook} size="2x" />
                            </a> &nbsp;
                            <span class="wp-block-social-link-label">Janek Góralewski</span>
                        </a>

                    </ul>
                </div>
            </div>
        </div >
    );
}

export default Contact;









