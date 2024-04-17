import React, { useState } from 'react';
import styles from "../common/styles/ShowPage.module.scss";
import { Button } from '@mui/material';

function Viewer() {
    const [currentPage, setCurrentPage] = useState(1);

    const images = [
        process.env.PUBLIC_URL + '/cv1.jpg',
        process.env.PUBLIC_URL + '/cv2.jpg',
        process.env.PUBLIC_URL + '/cv3.jpg',
    ];

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, images.length));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div className={styles.container}>
            <div className={styles.images}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Wczytany obraz JPG ${index + 1}`}
                        style={{ display: index + 1 === currentPage ? 'block' : 'none' }}
                    />
                ))}
            </div>

            <div className={styles.middleButton}>
                <Button onClick={prevPage} disabled={currentPage === 1}>
                    Poprzednia strona
                </Button>
                <span>Strona {currentPage}</span>
                <Button onClick={nextPage} disabled={currentPage === images.length}>
                    Następna strona
                </Button>
            </div>
        </div>
    );
}

export default Viewer;
