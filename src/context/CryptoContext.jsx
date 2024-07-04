import { createContext, useLayoutEffect, useState } from "react";

// Create context object
export const CryptoContext = createContext({});

// Create the provider component
export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [searchData, setSearchData] = useState();

  // Fetch crypto data on mount
  const getCryptoData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      );
      const data = await response.json();
      console.log(data);
      setCryptoData(data);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
  };

  // get the query result from the api
  const getSearchResult = async (query) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query= ${query} `
      );
      const data = await response.json();
      setSearchData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
  };
  useLayoutEffect(() => {
    getCryptoData();
  }, []);
  return (
    // Provider component
    <CryptoContext.Provider value={{ cryptoData, searchData, getSearchResult }}>
      {children}
    </CryptoContext.Provider>
  );
};
