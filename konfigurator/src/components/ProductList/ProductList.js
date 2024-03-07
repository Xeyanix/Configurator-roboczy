import React, { useState, useEffect} from 'react';
import styles from '../../common/styles/Columns.module.scss';
import CPUs from '../../common/consts/cpu';
import RAMs from '../../common/consts/ram';

function ProductList (props) {
  const [selectedMotherboard, setSelectedMotherboard] = useState(null);
  const [koszyk, setKoszyk] = useState([]);
  const [showMotherboardList, setShowMotherboardList] = useState(true);
  const [showCpuList, setShowCpuList] = useState(false);
  const [selectedCpu, setSelectedCpu] = useState(null);
  const [showRamList, setShowRamList] = useState(false);
  const [Motherboards, setMotherboards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/motherboards')
      .then(response => response.json())
      .then(data => {
        setMotherboards(data); // Ustaw tablicę Motherboards
      })
      .catch(error => {
        console.error('Błąd podczas pobierania danych:', error);
      });
  }, []);

  const handlePlytaClick = (motherboard) => {
    setSelectedMotherboard(motherboard);
    setShowMotherboardList(false);
  };

  const handleCPUsClick = (cpu) => {
    setSelectedCpu(cpu);
    setShowRamList(true);
  };

  const handleShowMotherboardList = () => {
    setSelectedMotherboard(null);
    setShowMotherboardList(true);
  };

  const handleShowCpuList = () => {
    setSelectedCpu(null);
    setShowRamList(false); 
  };

  const handleDodajDoKoszyka = (item) => {
    setKoszyk((prevKoszyk) => [...prevKoszyk, item]);
    props.dodawanie(item);
    if (item.compatibleMotherboards) {
      setSelectedCpu(item);
      setShowRamList(true);
      setShowCpuList(false);

    }
  };

  const RenderMotherboardOptions = () => (
    <div>
      <h2>Wybierz płytę główną:</h2>
      <div className={styles.productsListNames}>
        {props.Motherboards.map((motherboard) => (
          <div key={motherboard.id} onClick={() => handlePlytaClick(motherboard)}>
            {motherboard.name}, {motherboard.chipset} <br />
            <button className={styles.myButton} onClick={() => handleDodajDoKoszyka(motherboard)}>
              Dodaj do koszyka
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const RenderCPUsOptions = () => (
    <div>
      <h3>Kompatybilne procesory dla: {selectedMotherboard?.name}</h3>
      <h2>Wybierz Procesor:</h2>
      <div className={styles.productsListNames}>
        {selectedMotherboard &&
          CPUs.filter((cpu) => cpu.compatibleMotherboards.includes(selectedMotherboard.id)).map((cpu) => (
            <div key={cpu.id} onClick={() => handleCPUsClick(cpu)}>
              {cpu.name}<br />
              <button className={styles.myButton} onClick={() => handleDodajDoKoszyka(cpu)}>
                Dodaj do koszyka
              </button>
            </div>
          ))}
      </div>
    </div>
  );

  const RenderRAMOptions = () => (
    <div>
      <h3>Wybrana Pamięć RAM: {selectedCpu?.name}</h3>
      <h2>Wybierz RAM:</h2>
      <div className={styles.productsListNames}>
        {RAMs.map((ram) => (
          <li key={ram.id}>
            {ram.name}
            <br />
            <button className={styles.myButton} onClick={() => handleDodajDoKoszyka(ram)}>
              Dodaj do koszyka
            </button>
          </li>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <div className={styles.smallerFont}>
          {!selectedMotherboard && showMotherboardList ? (
            <RenderMotherboardOptions />
          ) : (
            <div>
              <h3>Wybrana płyta główna: {selectedMotherboard?.name}</h3>
              {!showMotherboardList && (
                <button className={styles.myButton} onClick={handleShowMotherboardList}>
                  Wyświetl listę płyt głównych
                </button>
              )}

              {selectedMotherboard && !selectedCpu && <RenderCPUsOptions />}


              {selectedCpu && (
                <>
                  <h3>Wybrany Procesor: {selectedCpu?.name}</h3>
                  {!showCpuList && (
                    <button className={styles.myButton} onClick={handleShowCpuList}>
                      Wyświetl listę Procesorów
                    </button>
                  )}
                </>
              )}
              {showRamList && <RenderRAMOptions />}
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default ProductList;