import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { CryptoContext } from "./CryptoContext";

// create context object
export const StorageContext = createContext({});

// create the provider component
export const StorageProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [savedData, setSavedData] = useState();

  let { currency, sortBy } = useContext(CryptoContext);

  const saveCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));

    // Check if the coinId already exists in the array.
    if (oldCoins.includes(coinId)) {
      // If coinId is already in the array, do nothing and return null.
      return null;
    } else {
      // If coinId is not in the array, create a new array with the existing coins and the new coinId.
      let newCoin = [...oldCoins, coinId];

      // Update the state variable 'allCoins' with the new array.
      setAllCoins(newCoin);

      // Save the new array to localStorage, converting it to a JSON string.
      //key value pair
      localStorage.setItem("coins", JSON.stringify(newCoin));
    }
  };

  const removeCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));

    let newCoin = oldCoins.filter((coin) => coin !== coinId);

    setAllCoins(newCoin);
    localStorage.setItem("coins", JSON.stringify(newCoin));
  };

  const getSavedData = async (totalCoins = allCoins) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(
          ","
        )}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
        .then((res) => res.json())
        .then((json) => json);

      // console.log(data);
      setSavedData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetSavedResult = () => {
    getSavedData();
  };

  useEffect(() => {
    if (allCoins.length > 0) {
      getSavedData(allCoins);
    } else {
      setSavedData();
    }
  }, [allCoins]);

  useLayoutEffect(() => {
    // Retrieve the value from localStorage and parse it.
    // If the value does not exist, default to false.
    let isThere = JSON.parse(localStorage.getItem("coins")) || false;

    if (!isThere) {
      // If the value does not exist (isThere is false), set an empty array in localStorage.
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      // If the value exists (isThere is true), parse the stored array from localStorage.
      let totalCoins = JSON.parse(localStorage.getItem("coins"));

      // Update the state with the current values from localStorage.
      setAllCoins(totalCoins);

      // If there are coins in the array, retrieve saved data for these coins.
      if (totalCoins.length > 0) {
        getSavedData(totalCoins);
      }
    }
  }, []);

  return (
    <StorageContext.Provider
      value={{
        saveCoin,
        allCoins,
        removeCoin,
        savedData,
        resetSavedResult,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
