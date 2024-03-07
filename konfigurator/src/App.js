import React, { useState } from 'react';
import styles from './App.module.scss';
import Filters from './components/Filters/Filters';
import ResponsiveAppBar from './components/ResponsiveAppBar/ResponsiveAppBar';
import DownMenu from './components/DownMenu/DownMenu';
import Motherboards from './common/consts/motherboard';
import Contact from './components/Contact/Contact';
import { AuthProvider, useAuth } from './context/Context';
import Header from "./components/Header/Header";
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [selectedMotherboard, setSelectedMotherboard] = useState(Motherboards);
  const [MotherboardsToDisplay, setMotherboardsToDisplay] = useState(selectedMotherboard);
  const { login, loggedInUser } = useAuth();

  return (
    <AuthProvider>
      <div>
        <div className={styles.appWrapper}>
          <ResponsiveAppBar
            loggedInUser={loggedInUser}
          />
          <Header />
          <Filters
            Motherboards={Motherboards}
            sendfilteredProductsToAppComponent={setMotherboardsToDisplay}
          />
          <div className={styles.columnsWrapper}>
            <Dashboard />
          </div>
          <div>
            <Contact id="kontakt" />
          </div>
        </div >
        <footer>
          <DownMenu />
        </footer>
      </div >
    </AuthProvider>
  );
}

export default App;


//contact section - bigger and prettierxd
//section filters to changed
//appbar on welcome page maybe better or more usual for random people