import React, { useState, useEffect } from "react";
import styles from "../common/styles/Columns.module.scss"
import { useSelector, useDispatch } from "react-redux";
import {
  loadCartList,
  setProductsLoadingState,
  clearCart,
} from "../redux/appSlice";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function Cart() {
  const cart = useSelector((state) => state.app.cart);
  const loadingStatus = useSelector((state) => state.app.loadingStatus);
  const [deletedItemId, setDeletedItemId] = useState(0);
 
  const dispatch = useDispatch();

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);
 

  const handleItemClick = async (product) => {
    try {
      setDeletedItemId(product.id);
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
      setDeletedItemId(productId);
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

  const AddedItem = cart.map((product) => (
    <li
      className={styles.productsCartNames}
      key={product.id}
      onContextMenu={(event) => { removeFromShoppingList(event, product.id); }}
      customTitle={`Kliknij prawym, aby usunąć`}
      title={`${product.name}`}
    >
      <div className={styles.productInfo}>
        {product.name} - {product.price} zł

        <span onClick={() => handleItemClick(product)}>
        </span>
        <button
          className={styles.myButton}
          onClick={() => handleItemClick(product)}
        >
          Usuń
        </button>
      </div>
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
              <div>
                <p>Łącznie {totalPrice} zł</p>
                <button
                  className={styles.myButton}
                  onClick={handleRemoveAll}
                >
                  Usuń wszystko
                </button>
              </div>
            </div>
          )}
        
        </div>
      </header>
    </div>
  );
}

export default Cart;
