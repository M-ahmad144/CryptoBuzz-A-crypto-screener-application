import React from "react";
import Search from "./Search";
import CurrencyInput from "./CurrencyInput";
import Sorting from "./Sorting";

export default function Filters() {
  return (
    <div className="relative flex flex-wrap justify-between items-center border-2 border-gray-100 p-2 rounded-lg w-full">
      <div className="flex justify-center mb-2 sm:mb-0 w-full sm:w-auto">
        <Search />
      </div>
      <div className="flex justify-center mb-2 sm:mb-0 w-full sm:w-auto">
        <CurrencyInput />
      </div>
      <div className="flex justify-center w-full sm:w-auto">
        <Sorting />
      </div>
    </div>
  );
}
