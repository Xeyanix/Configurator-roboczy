import styles from '../../common/styles/LastViewed.module.scss'
import { useEffect, useState } from "react";

function LastViewed(props) {
    const [LastViewedProducts, setLastViewedProducts] = useState([]);

    useEffect(() => {
        setLastViewedProducts(props.cart);
    }, [props.cart]);

    const countByProduct = props.cart.reduce((acc, product) => {
        acc[product.id] = (acc[product.id] || 0) + 1;
        return acc;
    }, {});

    const cartItems = Object.keys(countByProduct).map((productId) => {
        const product = props.cart.find((p) => p.id === parseInt(productId));

        return {
            ...product,
            count: countByProduct[productId]
        };
    });

    const renderProduct = cartItems.map((product) =>

        <li
            key={product.id}
            className={styles.productList}
        >
            <div>{product.name}</div>
            <div>{product.chipset}</div>
            {/* <div>Count: {product.count}</div> */}
            <hr />
        </li >
    );

    return (
        <div className={styles.LastViewed}>
            <div className={styles.font}>
                <header >
                    <h1>Ostatnio oglądane</h1>
                    {props.cart.length === 0 ? (
                        <p>Ostatnio nic nie dodawałes do koszyka</p>
                    ) : (
                        <div>{renderProduct}</div>

                    )}
                </header >
            </div>

        </div >
    );
}

export default LastViewed;





