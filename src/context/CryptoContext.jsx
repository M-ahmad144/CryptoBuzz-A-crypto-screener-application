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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [perPage, setPerPage] = useState(10);
  const [coinData, setCoinData] = useState();

  // Fetch crypto data on mount
  const getCryptoData = async () => {
    setCryptoData();
    setTotalPages(1400);
    // try {
    //   setLoading(true);
    //   const response = await fetch(
    //     `https://api.coingecko.com/api/v3/coins/list`
    //   );
    //   const data = await response.json();
    //   setTotalPages(data.length);
    //   setLoading(false);
    // } catch (error) {
    //   console.error("Error fetching crypto data:", error);
    // }

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
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
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  };

  // For Fetching the  coin data analysis results
  const getCoinData = async (coinid) => {
    setCoinData();
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinid}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log("CoinData", data);
      setCoinData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetFuntion = () => {
    setPage(1);

    setCoinSearch("");
  };

  // Fetch initial crypto data on component mount
  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSearch, currency, sortBy, page, totalPages, perPage]);

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
        setPage,
        page,
        totalPages,
        resetFuntion,
        setPerPage,
        perPage,
        setCoinData,
        coinData,
        getCoinData,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
