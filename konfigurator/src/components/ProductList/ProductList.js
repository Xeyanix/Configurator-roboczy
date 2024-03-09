import React, { useState, useEffect } from "react";
import styles from "../../common/styles/Columns.module.scss";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  loadCartList,
  setProductsLoadingState,
} from "../../redux/appSlice";
import { CircularProgress } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

function ProductList() {
  const loadingStatus = useSelector((state) => state.app.loadingStatus);
  const dispatch = useDispatch();

  const [motherboards, setMotherboards] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [rams, setRAMs] = useState([]);
  const [addedItemId, setAddedItemId] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setProductsLoadingState("Loading"));
        const response = await axios.get("http://localhost:9000/products");
        const allProducts = response.data;

        // Filtrujemy produkty na trzy kategorie: płyty główne, procesory i RAM
        const motherboardProducts = allProducts.filter(product => product.type === 'Płyta główna');
        const processorProducts = allProducts.filter(product => product.type === 'Procesor');
        const ramProducts = allProducts.filter(product => product.type === 'RAM');

        setMotherboards(motherboardProducts);
        setProcessors(processorProducts);
        setRAMs(ramProducts);

        dispatch(setProductsLoadingState("success"));
      } catch (error) {
        console.log(error);
        dispatch(setProductsLoadingState("error"));
      }
    };

    fetchProducts();

  }, [dispatch]);

  const handleItemClick = async (product) => {
    try {
      setAddedItemId(product.id);
      const newProduct = { ...product };
      newProduct.id = uuidv4();

      dispatch(setProductsLoadingState("AddingItem"));
      await axios.post(
        `http://localhost:9000/products/shoppingList/new`,
        newProduct
      );

      const shoppingListResponse = await axios.get(
        `http://localhost:9000/products/shoppingList`
      );
      dispatch(loadCartList(shoppingListResponse.data));
      dispatch(setProductsLoadingState("success"));


      let endpoint = `http://localhost:9000/products`;

      if (product.type === 'Płyta główna') {
        endpoint = `http://localhost:9000/products/motherboards/${product.id}`;
      } else if (product.type === 'Procesor') {
        endpoint = `http://localhost:9000/products/cpus/${product.id}`;
      } else if (product.type === 'RAM') {
        endpoint = `http://localhost:9000/products/rams/${product.id}`;
      }

      const productResponse = await axios.get(endpoint);
      setSelectedProduct(productResponse.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <div className={styles.smallerFont}>


          <h2>Wybierz płytę główną:</h2>
          {motherboards.length > 0 ? (
            motherboards.map((motherboard) => (
              <div className={styles.productsListNames} key={motherboard.id}>
                <span onClick={() => handleItemClick(motherboard)}>

                  {motherboard.name}<br />
                  {loadingStatus === "AddingItem" && addedItemId === motherboard.id ? (
                    <CircularProgress />
                  ) : (
                    ""
                  )}
                </span>
                <button className={styles.myButton} onClick={() => handleItemClick(motherboard)}>
                  Dodaj do koszyka
                </button>
              </div>
            ))
          ) : (
            <p>Loading motherboards...</p>
          )}

          <h3>Procesory:</h3>
          {processors.length > 0 ? (
            processors.map((processor) => (
              <div className={styles.productsListNames} key={processor.id}>
                <span onClick={() => handleItemClick(processor)}>
                  {processor.name}<br />
                  {loadingStatus === "AddingItem" && addedItemId === processor.id ? (
                    <CircularProgress />
                  ) : (
                    ""
                  )}
                </span>
                <button className={styles.myButton} onClick={() => handleItemClick(processor)}>
                  Dodaj do koszyka
                </button>
              </div>
            ))
          ) : (
            <p>Loading processors...</p>
          )}

          <h3>Moduły RAM:</h3>
          {rams.length > 0 ? (
            rams.map((ram) => (
              <div className={styles.productsListNames} key={ram.id}>
                <span onClick={() => handleItemClick(ram)}>
                  {ram.name}<br />
                  {loadingStatus === "AddingItem" && addedItemId === ram.id ? (
                    <CircularProgress />
                  ) : (
                    ""
                  )}
                </span>
                <button className={styles.myButton} onClick={() => handleItemClick(ram)}>
                  Dodaj do koszyka
                </button>
              </div>
            ))
          ) : (
            <p>Loading RAM...</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default ProductList;

//nie wsyswiertla sie last viewed po klikniecu na przycisk