import React, { useContext } from "react";
import selectItem from "../assets/select-icon.svg";
import { CryptoContext } from "../context/CryptoContext";

export default function Sorting() {
  let { setSortBy, resetFuntion } = useContext(CryptoContext);

  const handelSort = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setSortBy(val);
  };

  return (
    <div className="sm:flex hidden min:hidden">
      {/* This component will be hidden on small screens and shown on screens larger than small */}
      <label
        className="relative flex justify-center items-center"
        htmlFor="sortSelect"
      >
        <span className="font-bold">Sort by:</span>
        <select
          className="bg-gray-200 py-0.5 pr-10 pl-2 rounded text-base capitalize leading-4 focus:outline-0"
          name="sort"
          id="sortSelect"
          onClick={handelSort}
        >
          <option value="market_cap_desc">Market Cap Descending</option>
          <option value="market_cap_asc">Market Cap Ascending</option>
          <option value="volume_desc">Volume Descending</option>
          <option value="volume_asc">Volume Ascending</option>
          <option value="coin_name_desc">Coin Name Descending</option>
          <option value="coin_name_asc">Coin Name Ascending</option>
          <option value="price_desc">Price Descending</option>
          <option value="price_asc">Price Ascending</option>
          <option value="h24_change_desc">24h Change Descending</option>
          <option value="h24_change_asc">24h Change Ascending</option>
          <option value="trust_score_desc">Trust Score Descending</option>
          <option value="trust_score_asc">Trust Score Ascending</option>
          <option value="liquidity_desc">Liquidity Descending</option>
          <option value="liquidity_asc">Liquidity Ascending</option>
        </select>
        <img
          className="top-2 right-1 absolute w-[1rem] h-auto pointer-events-none"
          src={selectItem}
          alt="selectItem"
        />
      </label>
      <div className="flex justify-center items-center align-middle">
        <button
          className="ml-4 w-[2rem] hover:scale-110 relative transition-all transition-ease"
          onClick={resetFuntion}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="w-full h-full fill-cyan"
            style={{
              msTransform: "rotate(360deg)",
              WebkitTransform: "rotate(360deg)",
              transform: "rotate(360deg)",
            }}
          >
            <path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z" />
            <path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z" />
            <path fill="rgba(0, 0, 0, 0)" d="M0 0h24v24H0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
