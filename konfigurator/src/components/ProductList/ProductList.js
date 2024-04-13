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
  const [ssds, setSSDs] = useState([]);
  const [chargers, setChargers] = useState([]);
  const [gpus, setGpus] = useState([]);
  const [cases, setCases] = useState([]);
  const [addedItemId, setAddedItemId] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedMotherboard, setSelectedMotherboard] = useState(null);
  const [selectedProcessor, setSelectedProcessor] = useState(null);
  const [selectedRAM, setSelectedRAM] = useState(null);
  const [selectedSSD, setSelectedSSD] = useState(null);
  const [selectedCharger, setSelectedCharger] = useState(null);
  const [selectedGPU, setSelectedGPU] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [isComputerBuilt, setIsComputerBuilt] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setProductsLoadingState("Loading"));
        const response = await axios.get("http://localhost:9000/products");
        const allProducts = response.data;

        const motherboardProducts = filterProductsByType(allProducts, "Płyta główna");
        const processorProducts = filterProductsByType(allProducts, "Procesor");
        const ramProducts = filterProductsByType(allProducts, "RAM");
        const ssdProducts = filterProductsByType(allProducts, "SSD");
        const chargerProducts = filterProductsByType(allProducts, "Charger");
        const gpuProducts = filterProductsByType(allProducts, "GPU");
        const caseProducts = filterProductsByType(allProducts, "Cases");

        setMotherboards(motherboardProducts);
        setProcessors(processorProducts);
        setRAMs(ramProducts);
        setCases(caseProducts);
        setChargers(chargerProducts);
        setGpus(gpuProducts);
        setSSDs(ssdProducts);

        dispatch(setProductsLoadingState("success"));
      } catch (error) {
        console.log(error);
        dispatch(setProductsLoadingState("error"));
      }
    };

    fetchProducts();
  }, [dispatch]);

  const filterProductsByType = (products, type) => {
    return products.filter((product) => product.type === type);
  };

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

      switch (product.type) {
        case "Płyta główna":
          endpoint = `http://localhost:9000/products/motherboards/${product.id}`;
          setSelectedMotherboard(product);
          setSelectedProcessor(null);
          setSelectedRAM(null);
          setSelectedSSD(null);
          setSelectedCharger(null);
          setSelectedGPU(null);
          setSelectedCase(null);
          setSelectedProduct(product);
          break;
        case "Procesor":
          endpoint = `http://localhost:9000/products/cpus/${product.id}`;
          setSelectedProcessor(product);
          setSelectedRAM(null);
          setSelectedSSD(null);
          setSelectedCharger(null);
          setSelectedGPU(null);
          setSelectedCase(null);
          setSelectedProduct(product);
          break;
        case "RAM":
          endpoint = `http://localhost:9000/products/rams/${product.id}`;
          setSelectedRAM(product);
          setSelectedSSD(null);
          setSelectedCharger(null);
          setSelectedCase(null);
          setSelectedProduct(product);
          break;
        case "SSD":
          endpoint = `http://localhost:9000/products/ssds/${product.id}`;
          setSelectedSSD(product);
          setSelectedCharger(null);
          setSelectedGPU(null);
          setSelectedCase(null);
          setSelectedProduct(product);
          break;
        case "Charger":
          endpoint = `http://localhost:9000/products/chargers/${product.id}`;
          setSelectedCharger(product);
          setSelectedGPU(null);
          setSelectedCase(null);
          setSelectedProduct(product);
          break;
        case "GPU":
          endpoint = `http://localhost:9000/products/gpus/${product.id}`;
          setSelectedGPU(product);
          setSelectedCase(null);
          setSelectedProduct(product);
          break;
        case "Cases":
          endpoint = `http://localhost:9000/products/cases/${product.id}`;
          setSelectedCase(product);
          setSelectedProduct(product);
          break;
        default:
          break;
      }

      const productResponse = await axios.get(endpoint);
      setSelectedProduct(productResponse.data);



    } catch (error) {
      console.log(error);
    }
  };

  const handleBackTo = (type) => {
    switch (type) {
      case "Motherboard":
        setSelectedMotherboard(null);
        setSelectedProcessor(null);
        setSelectedRAM(null);
        setSelectedSSD(null);
        setSelectedCharger(null);
        setSelectedGPU(null);
        setSelectedCase(null);
        setSelectedProduct([]);
        break;
      case "Procesor":
        setSelectedProcessor(null);
        setSelectedRAM(null);
        setSelectedSSD(null);
        setSelectedCharger(null);
        setSelectedGPU(null);
        setSelectedCase(null);
        setSelectedProduct([]);
        break;
      case "RAM":
        setSelectedRAM(null);
        setSelectedSSD(null);
        setSelectedCharger(null);
        setSelectedGPU(null);
        setSelectedCase(null);
        setSelectedProduct([]);
        break;
      case "SSD":
        setSelectedSSD(null);
        setSelectedCharger(null);
        setSelectedGPU(null);
        setSelectedCase(null);
        setSelectedProduct([]);
        break;
      case "Charger":
        setSelectedCharger(null);
        setSelectedGPU(null);
        setSelectedCase(null);
        setSelectedProduct([]);
        break;
      case "GPU":
        setSelectedGPU(null);
        setSelectedCase(null);
        setSelectedProduct([]);
        break;
      case "Cases":
        setSelectedCase(null);
        setSelectedProduct([]);
        break;
      default:
        break;
    }
  };

  const handleRebuild = () => {
    setIsComputerBuilt(false);
    handleBackTo("Motherboard");
  };

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <div className={styles.smallerFont}>

          {/* {selectedProduct && (
            <div className={styles.productDetail}>
              <h2>Wybrany produkt:</h2>
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>
              <p>Cena: {selectedProduct.price}zł</p>
            </div>
          )} */}



          {selectedCase ? (
            <>
              <button className={styles.myButton} onClick={() => handleBackTo("Cases")}>
                Wróć do listy obudów
              </button>
              <br />
              <h2>Podsumowanie:</h2>
              <ul>
                <li>Płyta główna: {selectedMotherboard.name} - {selectedMotherboard.price} zł</li>
                <li>Procesor: {selectedProcessor.name} - {selectedProcessor.price} zł</li>
                <li>Ram: {selectedRAM.name} - {selectedRAM.price} zł</li>
                <li>SSD: {selectedSSD.name} - {selectedSSD.price} zł</li>
                <li>Zasilacz: {selectedCharger.name} - {selectedCharger.price} zł</li>
                <li>GPU: {selectedGPU.name} - {selectedGPU.price} zł</li>
                <li>Obudowa: {selectedCase.name} - {selectedCase.price} zł</li>
              </ul>
              <button className={styles.myButton} onClick={handleRebuild}>
                Złóż komputer ponownie
              </button>
            </>
          ) : selectedGPU ? (
            <>
              <h2>Wybrana płyta główna: {selectedMotherboard.name}</h2>
              <button className={styles.myButton} onClick={() => handleBackTo("Motherboard")}>
                Wróć do listy płyt głównych
              </button>

              <h3>Wybrany procesor: {selectedProcessor.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("Processor")}>
                Wróć do wyboru procesora
              </button>

              <h3>Wybrany RAM: {selectedRAM.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("RAM")}>
                Wróć do wyboru RAM
              </button>

              <h3>Wybrany SSD: {selectedSSD.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("SSD")}>
                Wróć do wyboru SSD
              </button>

              <h3>Wybrany Charger: {selectedCharger.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("Charger")}>
                Wróć do wyboru Charger
              </button>

              <h3>Wybrany GPU: {selectedGPU.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("GPU")}>
                Wróć do wyboru GPU
              </button>

              <h3>Wybierz obudowę:</h3>
              {cases.length > 0 ? (
                cases.map((Case) => (
                  <div className={styles.productsListNames} key={Case.id}>
                    <span onClick={() => handleItemClick(Case)}>
                      {Case.name} - {Case.price}zł<br />
                      {loadingStatus === "AddingItem" && addedItemId === Case.id ? (
                        <CircularProgress />
                      ) : (
                        ""
                      )}
                    </span>
                    <button className={styles.myButton} onClick={() => handleItemClick(Case)}>
                      Dodaj do koszyka
                    </button>
                  </div>
                ))
              ) : (
                <p>Loading Cases...</p>
              )}
            </>
          ) : selectedCharger ? (
            <>
              <h2>Wybrana płyta główna: {selectedMotherboard.name}</h2>
              <button className={styles.myButton} onClick={() => handleBackTo("Motherboard")}>
                Wróć do listy płyt głównych
              </button>

              <h3>Wybrany procesor: {selectedProcessor.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("Processor")}>
                Wróć do wyboru procesora
              </button>

              <h3>Wybrany RAM: {selectedRAM.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("RAM")}>
                Wróć do wyboru RAM
              </button>

              <h3>Wybrany SSD: {selectedSSD.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("SSD")}>
                Wróć do wyboru SSD
              </button>

              <h3>Wybrany Charger: {selectedCharger.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("Charger")}>
                Wróć do wyboru Charger
              </button>

              <h3>Wybierz GPU:</h3>
              {gpus.length > 0 ? (
                gpus.map((gpu) => (
                  <div className={styles.productsListNames} key={gpu.id}>
                    <span onClick={() => handleItemClick(gpu)}>
                      {gpu.name} - {gpu.price}zł<br />
                      {loadingStatus === "AddingItem" && addedItemId === gpu.id ? (
                        <CircularProgress />
                      ) : (
                        ""
                      )}
                    </span>
                    <button className={styles.myButton} onClick={() => handleItemClick(gpu)}>
                      Dodaj do koszyka
                    </button>
                  </div>
                ))
              ) : (
                <p>Loading Case...</p>
              )}
            </>
          ) : selectedSSD ? (
            <>
              <h2>Wybrana płyta główna: {selectedMotherboard.name}</h2>
              <button className={styles.myButton} onClick={() => handleBackTo("Motherboard")}>
                Wróć do listy płyt głównych
              </button>

              <h3>Wybrany procesor: {selectedProcessor.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("Processor")}>
                Wróć do wyboru procesora
              </button>

              <h3>Wybrany RAM: {selectedRAM.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("RAM")}>
                Wróć do wyboru RAM
              </button>

              <h3>Wybrany SSD: {selectedSSD.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("SSD")}>
                Wróć do wyboru SSD
              </button>

              <h3>Wybierz Charger:</h3>
              {chargers.length > 0 ? (
                chargers.map((charger) => (
                  <div className={styles.productsListNames} key={charger.id}>
                    <span onClick={() => handleItemClick(charger)}>
                      {charger.name} - {charger.price}zł<br />
                      {loadingStatus === "AddingItem" && addedItemId === charger.id ? (
                        <CircularProgress />
                      ) : (
                        ""
                      )}
                    </span>
                    <button className={styles.myButton} onClick={() => handleItemClick(charger)}>
                      Dodaj do koszyka
                    </button>
                  </div>
                ))
              ) : (
                <p>Loading Chargers...</p>
              )}
            </>
          ) : selectedRAM ? (
            <>
              <h2>Wybrana płyta główna: {selectedMotherboard.name}</h2>
              <button className={styles.myButton} onClick={() => handleBackTo("Motherboard")}>
                Wróć do listy płyt głównych
              </button>

              <h3>Wybrany procesor: {selectedProcessor.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("Processor")}>
                Wróć do wyboru procesora
              </button>

              <h3>Wybrany RAM: {selectedRAM.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("RAM")}>
                Wróć do wyboru RAM
              </button>

              <h3>Wybierz SSD:</h3>
              {ssds.length > 0 ? (
                ssds.map((ssd) => (
                  <div className={styles.productsListNames} key={ssd.id}>
                    <span onClick={() => handleItemClick(ssd)}>
                      {ssd.name} - {ssd.price}zł<br />
                      {loadingStatus === "AddingItem" && addedItemId === ssd.id ? (
                        <CircularProgress />
                      ) : (
                        ""
                      )}
                    </span>
                    <button className={styles.myButton} onClick={() => handleItemClick(ssd)}>
                      Dodaj do koszyka
                    </button>
                  </div>
                ))
              ) : (
                <p>Loading SSDs...</p>
              )}
            </>
          ) : selectedProcessor ? (
            <>
              <h2>Wybrana płyta główna: {selectedMotherboard.name}</h2>
              <button className={styles.myButton} onClick={() => handleBackTo("Motherboard")}>
                Wróć do listy płyt głównych
              </button>

              <h3>Wybrany procesor: {selectedProcessor.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("Procesor")}>
                Wróć do wyboru procesora
              </button>

              <h3>Wybierz RAM:</h3>
              {rams.length > 0 ? (
                rams.map((ram) => (
                  <div className={styles.productsListNames} key={ram.id}>
                    <span onClick={() => handleItemClick(ram)}>
                      {ram.name} - {ram.price}zł<br />
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
                <p>Loading RAMs...</p>
              )}
            </>
          ) : selectedMotherboard ? (
            <>
              <h2>Wybrana płyta główna: {selectedMotherboard.name}</h2>
              <button className={styles.myButton} onClick={() => handleBackTo("Motherboard")}>
                Wróć do listy płyt głównych
              </button>

              <h3>Wybierz procesor:</h3>
              {processors.length > 0 ? (
                processors.map((processor) => (
                  <div className={styles.productsListNames} key={processor.id}>
                    <span onClick={() => handleItemClick(processor)}>
                      {processor.name} - {processor.price}zł<br />
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
                <p>Loading Processors...</p>
              )}
            </>
          ) : (
            <>
              <h2>Wybierz płytę główną:</h2>
              {motherboards.length > 0 ? (
                motherboards.map((motherboard) => (
                  <div className={styles.productsListNames} key={motherboard.id}>
                    <span onClick={() => handleItemClick(motherboard)}>
                      {motherboard.name} - {motherboard.price}zł<br />
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
                <p>Loading Motherboards...</p>
              )}
            </>
          )}


        </div>
      </header>
    </div>
  );
}

export default ProductList;
