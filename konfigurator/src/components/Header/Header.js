import React from "react";
import styles from "../../common/styles/Headers.module.scss";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { loadProducts, loadCartList } from "../../redux/appSlice";
import axios from "axios";

function Header(props) {
  // const searchFilter = useSelector((state) => state.products.searchFilter);

  const dispatch = useDispatch();

  const getProductsFromAPI = async (path) => {
    try {
      const resProducts = await axios.get(`http://localhost:9000/${path}`);
      dispatch(loadProducts(resProducts.data));
      
   
      const resShoppingList = await axios.get(
        `http://localhost:9000/products/shoppingList`
      );
      dispatch(loadCartList(resShoppingList.data));
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className={styles.headerWrapper}>
      <div className={styles.signedUserInfo}>
       
        <Button
          variant="contained"
          onClick={() => getProductsFromAPI("products")}
        >
          Załaduj produkty
        </Button>
      </div>
    </div>
  );
}

export default Header;
