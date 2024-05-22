import React, { useState, useEffect } from "react";
import styles from "../common/styles/Columns.module.scss";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  loadCartList,
  setProductsLoadingState,
  addToLastViewed,
} from "../redux/appSlice";
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
      if (!lastViewedProducts.find((p) => p.id === product.id)) {
        dispatch(addToLastViewed([...lastViewedProducts, product]));
      }
      dispatch(setProductsLoadingState("success"));

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

          {selectedCase ? (
            <>
              <button className={styles.myButton} onClick={() => handleBackTo("Cases")}>
                Wróć do listy obudów
              </button>
              <br />
              <h2>Podsumowanie:</h2>
              <ul className={styles.productsListNames}>
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
              <button className={styles.myButton} onClick={() => handleBackTo("Procesor")}>
                Wróć do listy procesorów
              </button>

              <h3>Wybrany RAM: {selectedRAM.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("RAM")}>
                Wróć do listy RAM
              </button>

              <h3>Wybrany SSD: {selectedSSD.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("SSD")}>
                Wróć do listy SSD
              </button>

              <h3>Wybrany zasilacz: {selectedCharger.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("Charger")}>
                Wróć do listy zasilaczy
              </button>

              <h3>Wybrane GPU: {selectedGPU.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("GPU")}>
                Wróć do listy GPU
              </button>

              <h3>Wybierz obudowę:</h3>
              <div className={styles.productContainer}>
                {cases.length > 0 ? (
                  cases.map((Case) => (
                    <div key={Case.id} className={styles.productsListNames}>
                      <h3>{Case.name}</h3>
                      {/* <img src={Case.img} alt={Case.name} className={styles.productImage} /> */}
                      <p>Cena: {Case.price} zł</p>
                      <button className={styles.myButton} onClick={() => handleItemClick(Case)}>
                        Dodaj do koszyka
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Loading Cases...</p>
                )}
              </div>
            </>
          ) : selectedCharger ? (
            <>
              <h2>Wybrana płyta główna: {selectedMotherboard.name}</h2>
              <button className={styles.myButton} onClick={() => handleBackTo("Motherboard")}>
                Wróć do listy płyt głównych
              </button>

              <h3>Wybrany procesor: {selectedProcessor.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("Procesor")}>
                Wróć do listy procesorów
              </button>

              <h3>Wybrany RAM: {selectedRAM.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("RAM")}>
                Wróć do listy RAM
              </button>

              <h3>Wybrany SSD: {selectedSSD.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("SSD")}>
                Wróć do listy SSD
              </button>

              <h3>Wybrany zasilacz: {selectedCharger.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("Charger")}>
                Wróć do listy zasilaczy
              </button>

              <h3>Wybierz GPU:</h3>
              <div className={styles.productContainer}>
                {gpus.length > 0 ? (
                  gpus.map((gpu) => (
                    <div key={gpu.id} className={styles.productsListNames}>
                      <h3>{gpu.name}</h3>
                      {/* <img src={gpu.img} alt={gpu.name} className={styles.productImage} /> */}
                      <p>Cena: {gpu.price} zł</p>
                      <button className={styles.myButton} onClick={() => handleItemClick(gpu)}>
                        Dodaj do koszyka
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Loading Gpus...</p>
                )}
              </div>
            </>
          ) : selectedSSD ? (
            <>
              <h2>Wybrana płyta główna: {selectedMotherboard.name}</h2>
              <button className={styles.myButton} onClick={() => handleBackTo("Motherboard")}>
                Wróć do listy płyt głównych
              </button>

              <h3>Wybrany procesor: {selectedProcessor.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("Procesor")}>
                Wróć do listy procesorów
              </button>

              <h3>Wybrany RAM: {selectedRAM.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("RAM")}>
                Wróć do listy RAM
              </button>

              <h3>Wybrany SSD: {selectedSSD.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("SSD")}>
                Wróć do listy SSD
              </button>

              <h3>Wybierz zasilacz:</h3>
              <div className={styles.productContainer}>
                {chargers.length > 0 ? (
                  chargers.map((charger) => (
                    <div key={charger.id} className={styles.productsListNames}>
                      <h3>{charger.name}</h3>
                      {/* <img src={charger.img} alt={charger.name} className={styles.productImage} /> */}
                      <p>Cena: {charger.price} zł</p>
                      <button className={styles.myButton} onClick={() => handleItemClick(charger)}>
                        Dodaj do koszyka
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Loading Chargers...</p>
                )}
              </div>
            </>
          ) : selectedRAM ? (
            <>
              <h2>Wybrana płyta główna: {selectedMotherboard.name}</h2>
              <button className={styles.myButton} onClick={() => handleBackTo("Motherboard")}>
                Wróć do listy płyt głównych
              </button>

              <h3>Wybrany procesor: {selectedProcessor.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("Procesor")}>
                Wróć do listy procesorów
              </button>

              <h3>Wybrany RAM: {selectedRAM.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("RAM")}>
                Wróć do listy RAM
              </button>

              <h3>Wybierz SSD:</h3>
              <div className={styles.productContainer}>
                {ssds.length > 0 ? (
                  ssds.map((ssd) => (
                    <div key={ssd.id} className={styles.productsListNames}>
                      <h3>{ssd.name}</h3>
                      {/* <img src={ssd.img} alt={ssd.name} className={styles.productsListNames} /> */}
                      <p>Cena: {ssd.price} zł</p>
                      <button className={styles.myButton} onClick={() => handleItemClick(ssd)}>
                        Dodaj do koszyka
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Loading SSDs...</p>
                )}
              </div>
            </>
          ) : selectedProcessor ? (
            <>
              <h2>Wybrana płyta główna: {selectedMotherboard.name}</h2>
              <button className={styles.myButton} onClick={() => handleBackTo("Motherboard")}>
                Wróć do listy płyt głównych
              </button>

              <h3>Wybrany procesor: {selectedProcessor.name}</h3>
              <button className={styles.myButton} onClick={() => handleBackTo("Procesor")}>
                Wróć do listy procesorów
              </button>

              <h3>Wybierz RAM:</h3>
              <div className={styles.productContainer}>
                {rams.map((ram) => (
                  <div key={ram.id} className={styles.productsListNames}>
                    <h3>{ram.name}</h3>
                    {/* <img src={ram.img} alt={ram.name} className={styles.productImage} /> */}
                    <p>Cena: {ram.price} zł</p>
                    <button className={styles.myButton} onClick={() => handleItemClick(ram)}>
                      Wybierz
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : selectedMotherboard ? (
            <>
              <h2>Wybrana płyta główna: {selectedMotherboard.name}</h2>
              <button className={styles.myButton} onClick={() => handleBackTo("Motherboard")}>
                Wróć do listy płyt głównych
              </button>

              <h3>Wybierz procesor:</h3>
              <div className={styles.productContainer}>
                {processors.length > 0 ? (
                  processors.map((processor) => (
                    <div key={processor.id} className={styles.productsListNames}>
                      <h3>{processor.name}</h3>
                      {/* <img src={processor.img} alt={processor.name} className={styles.productImage} /> */}
                      <p>Cena: {processor.price} zł</p>
                      <button className={styles.myButton} onClick={() => handleItemClick(processor)}>
                        Dodaj do koszyka
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Loading Processors...</p>
                )}
              </div>
            </>
          ) : (
            <>
              <h1>Wybierz płytę główną:</h1>
              <div className={styles.productContainer}>
                {motherboards.length > 0 ? (
                  motherboards.map((motherboard) => (
                    <div key={motherboard.id} className={styles.productsListNames}>
                      <h3>{motherboard.name}</h3>
                      {/* <img src={motherboard.img} alt={motherboard.name} className={styles.productImage} /> */}
                      <p>Cena: {motherboard.price} zł</p>
                      <button className={styles.myButton} onClick={() => handleItemClick(motherboard)}>
                        Dodaj do koszyka
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Loading Motherboards...</p>
                )}
              </div>
            </>
          )}
        </div>
      </header >
    </div >
  );
};

export default ProductList;
