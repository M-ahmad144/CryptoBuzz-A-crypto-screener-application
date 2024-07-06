import React, { useContext } from "react";
import selectItem from "../assets/select-icon.svg";
import { CryptoContext } from "../context/CryptoContext";

export default function Sorting() {
  let { setSortBy } = useContext(CryptoContext);
  const handelSort = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setSortBy(val);
  };
  return (
    <>
      <label
        className="relative flex items-center content-center"
        htmlFor="sortSelect"
      >
        <span className="mr-2 font-bold font-nunito text-gray-400">
          Sort by:
        </span>
        <select
          className="bg-gray-200 py-1 pr-10 pl-2 rounded-lg text-base text-gray-50 capitalize focus:outline-none leading-4 appearance-none"
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
          className="top-1.5 right-0 absolute mr-1 w-[0.9rem] h-auto pointer-events-none"
          src={selectItem}
          alt="selectItem"
        />
      </label>
    </>
  );
}
