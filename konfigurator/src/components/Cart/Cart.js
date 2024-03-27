import React, { useState } from "react";
import styles from "../../common/styles/Columns.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  loadCartList,
  setProductsLoadingState,
  clearCart,
  setCurrentPrice,
} from "../../redux/appSlice";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function Cart() {
  const cart = useSelector((state) => state.app.cart);
  const currentPrice = useSelector((state) => state.app.currentPrice);
  const loadingStatus = useSelector((state) => state.app.loadingStatus);
  const [deletedItemId, setdeletedItemId] = useState(0);
  const dispatch = useDispatch();

  const handleItemClick = async (product) => {
    try {
      setdeletedItemId(product.id);
      dispatch(setProductsLoadingState("RemovingItem"));
      await axios.delete(
        `http://localhost:9000/products/shoppingList/${product.id}`
      );

      const response = await axios.get(
        `http://localhost:9000/products/shoppingList`
      );
      dispatch(loadCartList(response.data));
      dispatch(setProductsLoadingState("success"));
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromShoppingList = async (event, productId) => {
    event.preventDefault();
    try {
      setdeletedItemId(productId);
      dispatch(setProductsLoadingState("RemovingItem"));
      await axios.delete(
        `http://localhost:9000/products/shoppingList/${productId}`
      );

      const response = await axios.get(
        `http://localhost:9000/products/shoppingList`
      );
      dispatch(loadCartList(response.data));
      dispatch(setProductsLoadingState("success"));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAll = async () => {
    try {
      dispatch(setProductsLoadingState("RemovingItem"));
      console.log("Sending request to delete all items...");
      const response = await axios.delete(`http://localhost:9000/products/shoppingList`);
      console.log("Response from server:", response.data);

      dispatch(clearCart());
      dispatch(setProductsLoadingState("success"));
      console.log("Cart cleared successfully.");
    } catch (error) {
      console.error("Error while clearing cart:", error);
      dispatch(setProductsLoadingState("error"));
    }
  };

  const formatPrice = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    return `${formattedPrice} PLN`;
  };

  const totalPrice = () => {
    const Price = cart.reduce((acc, product) => {
      const productPrice = parseFloat(product.price);
      if (!isNaN(productPrice)) {
        return acc + productPrice;
      }
      return acc;
    }, 0);

    // Dodajemy cenę aktualnie dodawanego produktu (jeśli istnieje)
    if (!isNaN(parseFloat(currentPrice))) {
      return (Price + parseFloat(currentPrice)).toFixed(2);
    }

    return Price.toFixed(2);
  };


  const AddedItem = cart.map((product, index) => (
    <li
      className={styles.productsCartNames}
      key={product.id}
      onContextMenu={(event) => { removeFromShoppingList(event, product.id); }}
      customTitle={`Kliknij prawym, aby usunąć`}
      title={`${product.name}`}
    >
      {product.name} - {product.price}PLN

      <span onClick={() => handleItemClick(product, index)}>
        {loadingStatus === "RemovingItem" &&
          deletedItemId === product.id ? (
          <CircularProgress />
        ) : (
          ""
        )}
      </span>
      <button
        className={styles.myButton}
        onClick={() => handleItemClick(product, index)}
      >
        Usuń
      </button >
    </li >
  ));

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <div className={styles.smallerFont}>
          <h2>Koszyk</h2>
          {cart.length === 0 ? (
            <p className={styles.cartIsEmpty}>Twój koszyk jest pusty</p>
          ) : (
            <div className={styles.cart}>
              <ol className={styles.cartList}>
                {AddedItem}
              </ol>
              <button
                className={styles.myButton}
                onClick={handleRemoveAll}
              >
                Usuń wszystko
              </button>
            </div>
          )}
          <p id="total"> Łącznie: {formatPrice(totalPrice())}</p>

        </div>
      </header >
    </div >
  );
}

export default Cart;



