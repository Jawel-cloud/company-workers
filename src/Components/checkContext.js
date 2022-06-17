import React, { createContext, useState } from 'react';

export const CheckContext = createContext();
const CheckProvider = ({ children }) => {

    const [fNameSearch, setfNameSearch] = useState('');
    const togglefNameSearch = (x) => {setfNameSearch(x);};

    const [lNameSearch, setlNameSearch] = useState('');
    const togglelNameSearch = (y) => {setlNameSearch(y);};

    const [departSearch, setDepartSearch] = useState('');
    const toggleDepartSearch = (z) => {setDepartSearch(z);};

    const [salaryFromSearch, setSalaryFromSearch] = useState(0);
    const toggleSalaryFromSearch = (w) => {setSalaryFromSearch(w);};

    const [salaryToSearch, setSalaryToSearch] = useState(10000);
    const toggleSalaryToSearch = (v) => {setSalaryToSearch(v);};

    const [currencySearch, setCurrencySearch] = useState('');
    const toggleCurrencySearch = (u) => {setCurrencySearch(u);};



    return (
        <CheckContext.Provider value={{fNameSearch, lNameSearch, departSearch, salaryFromSearch,
        salaryToSearch, currencySearch, togglefNameSearch, togglelNameSearch, toggleDepartSearch,
        toggleSalaryFromSearch, toggleSalaryToSearch, toggleCurrencySearch}}>
            {children}
        </CheckContext.Provider>
    )
}
export default CheckProvider;