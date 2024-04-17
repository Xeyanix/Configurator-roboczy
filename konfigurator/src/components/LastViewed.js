import React from "react";
import { useSelector, } from "react-redux";
import styles from '../common/styles/LastViewed.module.scss'

function LastViewed() {
    const lastViewedProducts = useSelector((state) => state.app.lastViewed);

    const renderProduct = lastViewedProducts.map((product) =>
        <li
            className={styles.productList}
            key={product.id}
            title={`${product.name}`}
        >
            {product.name}
        </li >
    );

    return (
        <div className={styles.LastViewed}>
            <div className={styles.font}>
                <header >
                    <h1>Ostatnio oglądane</h1>
                    <div className={styles.smallerFont}>
                        {lastViewedProducts.length === 0 ? (
                            <p className={styles.cartIsEmpty}>Ostatnio nic nie dodawałes do koszyka</p>
                        ) : (

                            <div className={styles.cart}>
                                <ol className={styles.cartList}>
                                    {renderProduct}
                                </ol>

                            </div>
                        )}
                    </div>
                </header >
            </div >
        </div >
    );
}

export default LastViewed;


//dodaje itemy ale po usunieciu i dodaniu nowego aktualizuje liste
