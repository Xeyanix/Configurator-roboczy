import styles from '../../common/styles/LastViewed.module.scss'
import React, { useEffect, useState } from "react";
import { useSelector, } from "react-redux";

function LastViewed() {
    const cart = useSelector((state) => state.app.cart);
    const [LastViewedProducts, setLastViewedProducts] = useState([]);

    useEffect(() => {
        setLastViewedProducts(cart);
    }, [cart]);

    const renderProduct = cart.map((product) =>
        <li
            className={styles.productsCartNames}
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
                        {cart.length === 0 ? (
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



