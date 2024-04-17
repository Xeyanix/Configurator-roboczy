import React, { useState, useEffect } from 'react';
import ProductList from "./ProductList";
import Cart from "./Cart";
import styles from "../App.module.scss"
import { useAuth } from '../context/Context';
import LastViewed from './LastViewed';

function Dashboard() {
  const [cart, setCart] = useState([]);
  // const [selectedMotherboard, setSelectedMotherboard] = useState(Motherboards);
  // const [MotherboardsToDisplay] = useState(selectedMotherboard);
  const [scrollPosition] = useState(0);
  const { login, loggedInUser } = useAuth();
  const [listViewed, setListViewed] = useState([]); // Użyj osobnego stanu dla listy ostatnio oglądanych

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    if (loggedInUser) {
      login(loggedInUser);
    } else {

    }
  }, [scrollPosition, loggedInUser, login]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    // setSelectedMotherboard((prev) => [...prev, product]);
    setListViewed((prev) => [...prev, product]);
  };

  const removeItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    const productIndex = cart.findIndex((item) => item.id === productId);      // Find the index of the product in the cart
    // If the product is in the cart, remove one instance
    if (productIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(productIndex, 1);
      setCart(updatedCart);
    }
  };
  const removeAllItems = () => {
    setCart([]);
  };

  return (
    <div className={styles.appWrapper}>
      <div className={styles.columnsWrapper}>
        <ProductList
          // Motherboards={MotherboardsToDisplay}
          dodawanie={addToCart} />
        <Cart
          cart={cart}
          removeByRightClick={setCart}
          remove={removeItem}
          removeAll={removeAllItems}
        />

      </div>
      <div>
        <LastViewed cart={listViewed} />
      </div>

    </div>




  );
}

export default Dashboard;
