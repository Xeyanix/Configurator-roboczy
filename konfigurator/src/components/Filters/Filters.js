import React, { useState } from "react";
import styles from '../../common/styles/Headers.module.scss';

function Filters(props) {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [searchSocket, setSearchSocket] = useState('');
  const [searchChipset, setSearchChipset] = useState('');

  const handleSearchPhraseChange = (event) => {
    setSearchPhrase(event.target.value);
  };

  const handleSelectCategory = (event) => {
    setSearchSocket(event.target.value);
  };

  const handleProductType = (event) => {
    setSearchChipset(event.target.value);
    filterProdukty();
  };

  const handleSearchKeyUp = (event) => {
    if (event.key === 'Enter') {
      filterProdukty();
    }
  };

  const filterProdukty = () => {
    const filteredProducts = props.Motherboards.filter((Motherboard) =>
      Motherboard.name.toLowerCase().includes(searchPhrase.toLowerCase())
    );

    if (searchChipset) {
      const chipsetFilter = filteredProducts.filter((Motherboard) =>
        Motherboard.name.toLowerCase().includes(searchChipset.toLowerCase()) ||
        Motherboard.chipset.toLowerCase() === searchChipset.toLowerCase()
      );
      filteredProducts.length > 0 && props.sendfilteredProductsToAppComponent(chipsetFilter);
    } else if (searchSocket) {
      const socketFilter = filteredProducts.filter((Motherboard) =>
        Motherboard.socket.toLowerCase() === searchSocket.toLowerCase()
      );
      filteredProducts.length > 0 && props.sendfilteredProductsToAppComponent(socketFilter);
    } else {
      props.sendfilteredProductsToAppComponent(filteredProducts);
    }
  };

  const handleResetFilters = () => {
    setSearchPhrase('');
    setSearchSocket('');
    setSearchChipset('');
    filterProdukty();
  };

  const getUniqueCategory = () => {
    const CategoryList = props.Motherboards.map((Motherboard) => Motherboard.socket);
    return [...new Set(CategoryList)];
  };

  const uniqueCategory = getUniqueCategory();

  return (
    <div className={styles.name}>
      Filtr płyty głównej
      <div className={styles.productsFiltersWrapper}>
        Płyta Główna
        <input
          id={styles.searchPhraseInput}
          value={searchPhrase}
          placeholder="ASUS, Gigabyte, etc.."
          onChange={handleSearchPhraseChange}
          onKeyUp={handleSearchKeyUp}
        ></input>
        Chipset
        <input
          pattern="[0-9]+"
          type="text"
          required
          placeholder="X570,b450, etc.."
          id={styles.searchChipsetInput}
          value={searchChipset}
          onChange={handleProductType}
          title="Wprowadź tylko cyfry i litery"
        ></input>
        Socket
        <select
          value={searchSocket}
          onChange={handleSelectCategory}>
          <option key={'all'} value={''}>
            All Categories
          </option>{uniqueCategory.map((socket) => (
            <option key={socket} value={socket}>
              {socket}
            </option>
          ))}
        </select>
        <button onClick={filterProdukty}>Wyszukaj</button>
        <button onClick={handleResetFilters}>Zresetuj filtry</button>
      </div>
    </div>
  );
};

export default Filters;
