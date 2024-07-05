import React, { useContext, useState } from "react";
import SearchIcon from "../assets/search-icon.svg";
import { CryptoContext } from "../context/CryptoContext";
import debounce from "lodash.debounce";

const SearchInput = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");
  let { searchData, setCoinSearch, setSearchData } = useContext(CryptoContext);

  //handle input serach
  const handleInput = (e) => {
    e.preventDefault();
    let query = e.target.value;
    setSearchText(query);
    handleSearch(query);
  };
  //set the selected coin
  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText("");
    setSearchData();
  };

  //handle the onImage click  seacrh button
  const handleImageClick = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };
  return (
    <>
      <form
        onSubmit={handleImageClick}
        className="relative flex items-center ml-7 w-96 font-nunito"
      >
        <input
          className="focus:border-cyan bg-gray-200 pl-2 border border-transparent rounded w-full placeholder:text-gray-100 outline-0 required"
          placeholder="Search here..."
          value={searchText}
          type="text"
          name="search"
          onChange={handleInput}
        />

        <button
          className="right-1 absolute cursor-pointer"
          type="submit"
          onClick={(e) => e.preventDefault()} // Prevent form submission
        >
          <img className="w-full h-auto" src={SearchIcon} alt="search" />
        </button>
      </form>

      {searchText.length > 0 && (
        <ul className="top-11 right-0 absolute bg-gray-200 bg-opacity-60 backdrop-blur-md py-2 rounded w-96 h-96 overflow-x-hidden">
          {searchData ? (
            searchData.map((coin) => (
              <li
                onClick={() => selectCoin(coin.id)}
                className="flex items-center hover:bg-gray-100 ml-4 py-2 rounded-lg cursor-pointer outline-0"
                key={coin.id}
              >
                <img
                  className="mx-1.5 w-[1rem] h-[1rem]"
                  src={coin.thumb}
                  alt="coin.name"
                />
                <span>{coin.name}</span>
              </li>
            ))
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <div
                className="border-4 border-cyan border-b-gray-200 rounded-full w-8 h-8 animate-spin"
                role="status"
              />
              <span className="ml-2">searching...</span>
            </div>
          )}
        </ul>
      )}
    </>
  );
};

export default function Search() {
  let { getSearchResult } = useContext(CryptoContext);

  //debounce javascript
  // Create a debounced function for fetching search results,Debouncing is a technique used in programming to limit the rate at which a function is executed. It's particularly useful in scenarios where an event (like user input) triggers frequent, rapid function calls that may be resource-intensive or unnecessary to handle in real-time.
  const _debounceFunc = debounce(function (val) {
    getSearchResult(val);
  }, 2000);
  return (
    <div className="relative">
      <SearchInput handleSearch={_debounceFunc} />
    </div>
  );
}
