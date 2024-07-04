import React, { useContext, useState } from "react";
import SearchIcon from "../assets/search-icon.svg";
import { CryptoContext } from "../context/CryptoContext";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  let { getSearchResult } = useContext(CryptoContext);

  const handleInput = (e) => {
    e.preventDefault();
    let query = e.target.value;
    setSearchText(query);
    getSearchResult(query); // Fetching the search results from API
  };
  return (
    <>
      <form className="relative flex items-center ml-7 w-96 font-nunito">
        <input
          className="bg-gray-200 pl-2 border border-transparent rounded w-full placeholder:text-gray-100 outline-0 required"
          placeholder="search here..."
          value={searchText}
          type="text"
          name="search"
          onChange={handleInput}
        />

        <button
          //   place button nside the input field
          className="right-1 absolute cursor-pointer"
          type="submit"
        >
          <img className="w-full h-auto" src={SearchIcon} alt="search" />
        </button>
      </form>
      {searchText.length > 0 ? (
        <ul className="top-11 right-0 absolute bg-gray-200 bg-opacity-60 backdrop-blur-md py-2 rounded w-full h-96 overflow-x-hidden">
          <li>Result 1</li>
          <li>Result 2</li>
          <li>Result 3</li>
        </ul>
      ) : null}
    </>
  );
}
