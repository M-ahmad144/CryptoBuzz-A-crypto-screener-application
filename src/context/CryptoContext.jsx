import React, { createContext, useLayoutEffect, useState } from "react";

// Create context object
export const CryptoContext = createContext({});

// Create the provider component
export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [coinSearch, setCoinSearch] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("market_cap_desc");

  // Fetch crypto data on mount
  const getCryptoData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      );
      const data = await response.json();
      setCryptoData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
  };

  // Fetch search result
  const getSearchResult = async (query) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      const data = await response.json();
      setSearchData(data.coins);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  };

  // Fetch initial crypto data on component mount
  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSearch, currency, sortBy]);

  return (
    // Provider component
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchData,
        coinSearch,
        getSearchResult,
        setCoinSearch,
        setSearchData,
        setCurrency,
        loading,
        currency,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
