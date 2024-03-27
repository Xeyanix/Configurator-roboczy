import React, { useState } from "react";
import styles from "../../common/styles/Columns.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  loadCartList,
  setProductsLoadingState,
} from "../../redux/appSlice";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function Cart() {
  const cart = useSelector((state) => state.app.cart);
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

  const totalPrice = () => {
    const Price = cart.reduce((acc, product) => acc + product.price, 0);
    return Price.toLocaleString('pl-PL', { minimumFractionDigits: 2 });
  };

  const AddedItem = cart.map((product, index) => (
    <li
      className={styles.productsCartNames}
      key={product.id}
      onContextMenu={(event) => { removeFromShoppingList(event, product.id); }}
      customTitle={`Kliknij prawym, aby usunąć`}
      title={`${product.name}`}
    >
      {product.name}
      <span onClick={() => handleItemClick(product, index)}>
        {loadingStatus === "RemovingItem" &&
          deletedItemId === product.id ? (
          <CircularProgress />
        ) : (
          ""
        )}
      </span>
      <button className={styles.myButton} onClick={() => handleItemClick(product, index)}>Usuń</button >
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
                onClick={() => handleItemClick()}
              >
                Usuń wszystko
              </button>
            </div>
          )}
          <p id="total"> Łącznie: {totalPrice()} PLN</p>
        </div>
      </header >
    </div >
  );
}

export default Cart;



