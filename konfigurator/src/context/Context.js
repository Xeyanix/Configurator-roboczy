// context/Context.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        // Przy ładowaniu strony sprawdź, czy dane zalogowanego użytkownika są w LocalStorage
        const storedUser = window.sessionStorage.getItem('loggedInUser');
        if (storedUser) {
           
            setLoggedInUser(JSON.parse(storedUser));
       
        }
    }, []);


    const login = (user) => {
        setLoggedInUser(user);
        window.sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    };

    const logout = () => {
        setLoggedInUser(null);
        window.sessionStorage.removeItem("loggedInUser");
    };

    return (
        <AuthContext.Provider value={{ loggedInUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
