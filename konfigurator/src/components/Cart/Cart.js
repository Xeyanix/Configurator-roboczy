import commonColumnsStyles from '../../common/styles/Columns.module.scss'
import { useEffect, useState } from "react";


function Cart(props) {
  const [productsToBuy, setProductsToBuy] = useState([]);
  const [removeAllClicked, setRemoveAllClicked] = useState([]);

  useEffect(() => {
    setProductsToBuy(props.cart);
  }, [props.cart]);

  const removeFromShoppingList = (event, id) => {
    props.removeByRightClick(productsToBuy.filter((Motherboards) => Motherboards.id !== id));
    event.preventDefault();
  };

  const removeAllItems = () => {
    props.removeAll();
    setRemoveAllClicked(true);
  };

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

  const totalPrice = () => {
    const Price = props.cart.reduce((acc, product) => acc + product.price, 0);
    return Price.toLocaleString('pl-PL', { minimumFractionDigits: 2 });
  };

  const AddedItem = cartItems.map((product) => (
    <li
      className={commonColumnsStyles.productsCartNames}
      key={product.id}
      onContextMenu={(event) => { removeFromShoppingList(event, product.id); }}
      customTitle={`Kliknij prawym, aby usunąć`}
      title={`${product.name}`}
    >
      {product.name} - {product.price.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} zł x{product.count} {" "}

      <button className={commonColumnsStyles.myButton} onClick={() => props.remove(product.id)}>Usuń</button >
    </li >
  ));


  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <div className={commonColumnsStyles.smallerFont}>
          <h2 >Koszyk</h2>
          {props.cart.length === 0 ? (
            <p className={commonColumnsStyles.cartIsEmpty}>Twój koszyk jest pusty</p>
          ) : (
            <div className={commonColumnsStyles.cart}>
              <ol className={commonColumnsStyles.cartList}>
                {AddedItem}
              </ol>
              <button
                className={commonColumnsStyles.myButton}
                onClick={removeAllItems}
              >
                Usuń wszystko
              </button>
            </div>
          )}
          <p id="total"> Łącznie: {totalPrice()} PLN</p>
        </div>
      </header>
    </div>
  );
}

export default Cart;














// import React, { useState } from "react";
// import styles from "../../common/styles/Columns.module.scss";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   loadCartList,
//   setProductsLoadingState,
// } from "../../redux/appSlice";
// import axios from "axios";
// import CircularProgress from "@mui/material/CircularProgress";

// function Cart() {
//   const cart = useSelector((state) => state.app.cart);
//   const loadingStatus = useSelector((state) => state.app.loadingStatus);
//   const [deletedItemId, setdeletedItemId] = useState(0);
//   const dispatch = useDispatch();

//   const handleRemoveItem = async (productId) => {
//     try {
//       setdeletedItemId(productId);
//       dispatch(setProductsLoadingState("RemovingItem"));
//       await axios.delete(
//         `http://localhost:9000/products/shoppingList/${productId}`
//       );

//       const response = await axios.get(
//         `http://localhost:9000/products/shoppingList`
//       );
//       dispatch(loadCartList(response.data));
//       dispatch(setProductsLoadingState("success"));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleRemoveAllClick = async () => {
//     try {
//       dispatch(setProductsLoadingState("RemovingAllItems"));
//       await axios.delete(
//         `http://localhost:9000/products/shoppingList`
//       );
//       await Promise.all([
//         axios.get(`http://localhost:9000/products/shoppingList`),
//         dispatch(loadCartList([])),
//       ]);


//       dispatch(setProductsLoadingState("success"));
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   return (
//     <div className={styles.App}>
//       <header className={styles.AppHeader}>
//         <p>Shopping List</p>
//         <div>
//           {cart.length > 0
//             ? cart.map((product) => (
//               <div key={product.id} className={styles.ProductItem}>
//                 <div>
//                   <span>
//                     {product.name}{" "}
//                     {loadingStatus === "RemovingItem" &&
//                       deletedItemId === product.id ? (
//                       <CircularProgress />
//                     ) : (
//                       ""
//                     )}
//                   </span>
//                   <button
//                     className={styles.myButton}
//                     onClick={() => handleRemoveItem(product.id)}
//                   >
//                     Usuń
//                   </button>
//                 </div>

//               </div >
//             ))
//             : "Brak produktów do wyświetlenia w koszyku!"}
//         </div>
//         <button
//           onClick={handleRemoveAllClick}>Usuń wszystkie
//         </button>
//       </header>
//     </div >

//   );
// }

// export default Cart;


