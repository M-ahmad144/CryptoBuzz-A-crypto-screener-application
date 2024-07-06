import React, { useContext, useState } from "react";
import SearchIcon from "../assets/search-icon.svg";
import { CryptoContext } from "../context/CryptoContext";
import debounce from "lodash.debounce";

const SearchInput = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");
  const { searchData, setCoinSearch, loading } = useContext(CryptoContext);

  // handle input search
  const handleInput = (e) => {
    const query = e.target.value;
    setSearchText(query);
    handleSearch(query);
  };

  // set the selected coin
  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText("");
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
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

        <button className="right-1 absolute cursor-pointer" type="submit">
          <img className="w-full h-auto" src={SearchIcon} alt="search" />
        </button>
      </form>

      {searchText.length > 0 && (
        <ul className="top-11 right-0 absolute bg-gray-200 bg-opacity-60 backdrop-blur-md scrollbar-thumb-gray-100 py-2 rounded w-96 h-96 overflow-x-hidden scrollbar-thin scrollbar-track-gray-200">
          {searchData && !loading ? (
            searchData.map((coin) => (
              <li
                onClick={() => selectCoin(coin.id)}
                className="flex items-center hover:bg-gray-100 ml-4 py-2 rounded-lg cursor-pointer outline-0"
                key={coin.id}
              >
                <img
                  className="mx-1.5 w-[1rem] h-[1rem]"
                  src={coin.thumb}
                  alt={coin.name}
                />
                <span>{coin.name}</span>
              </li>
            ))
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <div className="border-4 border-cyan border-b-gray-200 rounded-full w-8 h-8 animate-spin"></div>
              <span className="ml-2">Searching...</span>
            </div>
          )}
        </ul>
      )}
    </>
  );
};

const Search = () => {
  const { getSearchResult } = useContext(CryptoContext);

  // Debounced function for fetching search results
  const debouncedSearch = debounce((val) => {
    getSearchResult(val);
  }, 5000);

  return (
    <div className="relative">
      <SearchInput handleSearch={debouncedSearch} />
    </div>
  );
};

export default Search;
