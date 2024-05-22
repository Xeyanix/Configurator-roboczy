import React from "react";
import { useSelector } from "react-redux";
import styles from '../common/styles/LastViewed.module.scss';

function LastViewed() {
    const lastViewedProducts = useSelector((state) => state.app.lastViewed);

    return (
        <div className={styles.LastViewed}>
            <div className={styles.font}>
                <header>
                    <h1>Ostatnio oglądane</h1>
                    {lastViewedProducts.length === 0 ? (
                        <div className={styles.emptyMessage }>
                            <p>Jeszcze nic nie oglądałeś</p>
                        </div>
                    ) : (
                        <div className={styles.lastViewedProducts}>
                            {lastViewedProducts.map((product) => (
                                <div key={product.id} className={styles.productList}>{product.name}</div>
                            ))}
                        </div>
                    )}
                </header>
            </div>
        </div>
    );
}

export default LastViewed;
