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

