import React, { useState, useEffect } from "react";
import styles from "../../common/styles/Columns.module.scss";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  loadCartList,
  setProductsLoadingState,
  addToLastViewed,
} from "../../redux/appSlice";
import { CircularProgress } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

function ProductList() {
  const loadingStatus = useSelector((state) => state.app.loadingStatus);
  const lastViewedProducts = useSelector((state) => state.app.lastViewed);
  const dispatch = useDispatch();

  const [motherboards, setMotherboards] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [rams, setRAMs] = useState([]);
  const [addedItemId, setAddedItemId] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedMotherboard, setSelectedMotherboard] = useState(null);
  const [selectedProcessor, setSelectedProcessor] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setProductsLoadingState("Loading"));
        const response = await axios.get("http://localhost:9000/products");
        const allProducts = response.data;

        // Filtrujemy produkty na trzy kategorie: płyty główne, procesory i RAM
        const motherboardProducts = allProducts.filter(
          (product) => product.type === "Płyta główna"
        );
        const processorProducts = allProducts.filter(
          (product) => product.type === "Procesor"
        );
        const ramProducts = allProducts.filter(
          (product) => product.type === "RAM"
        );

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
      dispatch(addToLastViewed(shoppingListResponse.data));

      let endpoint = `http://localhost:9000/products`;

      if (product.type === "Płyta główna") {
        endpoint = `http://localhost:9000/products/motherboards/${product.id}`;
        setSelectedMotherboard(product); // Ustawienie wybranej płyty głównej
        setSelectedProcessor(null); // Zresetowanie wybranego procesora
      } else if (product.type === "Procesor") {
        endpoint = `http://localhost:9000/products/cpus/${product.id}`;
        setSelectedProcessor(product); // Ustawienie wybranego procesora
      } else if (product.type === "RAM") {
        endpoint = `http://localhost:9000/products/rams/${product.id}`;
      }

      const productResponse = await axios.get(endpoint);
      setSelectedProduct(productResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackToMotherboard = () => {
    setSelectedMotherboard(null);
    setSelectedProcessor(null);
    setSelectedProduct([]);
  };

  const handleBackToProcessor = () => {
    setSelectedMotherboard([]);
    setSelectedProcessor(null);
    setSelectedProduct(null);
  };

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <div className={styles.smallerFont}>
          {selectedProcessor ? (
            <>
              <h2>Wybrana płyta główna: {selectedMotherboard.name}</h2>
              <button
                className={styles.myButton}
                onClick={handleBackToMotherboard}
              >
                Wróć do listy płyt głównych
              </button>

              <h3>Wybrany procesor: {selectedProcessor.name}</h3>
              <button
                className={styles.myButton}
                onClick={handleBackToProcessor}
              >
                Wróć do wyboru procesora
              </button>
              <h3>Wybierz moduł RAM:</h3>
              {rams.length > 0 ? (
                rams.map((ram) => (
                  <div className={styles.productsListNames} key={ram.id}>
                    <span onClick={() => handleItemClick(ram)}>
                      {ram.name} - {ram.price}zł<br />
                      {loadingStatus === "AddingItem" &&
                        addedItemId === ram.id ? (
                        <CircularProgress />
                      ) : (
                        ""
                      )}
                    </span>
                    <button
                      className={styles.myButton}
                      onClick={() => handleItemClick(ram)}
                    >
                      Dodaj do koszyka
                    </button>
                  </div>
                ))
              ) : (
                <p>Loading RAM...</p>
              )}

            </>
          ) : selectedMotherboard ? (
            <>
              <h2>Wybrana płyta główna: {selectedMotherboard.name}</h2>
              <button
                className={styles.myButton}
                onClick={handleBackToMotherboard}
              >
                Wróć do listy płyt głównych
              </button>
              <h3>Wybierz procesor: </h3>
              {processors.length > 0 ? (
                processors.map((cpu) => (
                  <div className={styles.productsListNames} key={cpu.id}>
                    <span onClick={() => handleItemClick(cpu)}>
                      {cpu.name} - {cpu.price}zł<br />
                      {loadingStatus === "AddingItem" &&
                        addedItemId === cpu.id ? (
                        <CircularProgress />
                      ) : (
                        ""
                      )}
                    </span>
                    <button
                      className={styles.myButton}
                      onClick={() => handleItemClick(cpu)}
                    >
                      Dodaj do koszyka
                    </button>
                  </div>
                ))
              ) : (
                <p>Loading processors...</p>
              )}

            </>
          ) : (
            <>
              <h2>Wybierz płytę główną:</h2>
              
              {motherboards.length > 0 ? (
                motherboards.map((motherboard) => (
                  <div
                    className={styles.productsListNames}
                    key={motherboard.id}
                  >
                    <span onClick={() => handleItemClick(motherboard)}>
                      {motherboard.name} - {motherboard.price}zł <br />
                      {loadingStatus === "AddingItem" &&
                        addedItemId === motherboard.id ? (
                        <CircularProgress />
                      ) : (
                        ""
                      )}
                    </span>
                    <button
                      className={styles.myButton}
                      onClick={() => handleItemClick(motherboard)}
                    >
                      Dodaj do koszyka
                    </button>
                  </div>
                ))
              ) : (
                <p>Loading motherboards...</p>
              )}
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default ProductList;
