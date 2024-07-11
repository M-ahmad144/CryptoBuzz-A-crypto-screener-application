import React from "react";
import Search from "./Search";
import CurrencyInput from "./CurrencyInput";
import Sorting from "./Sorting";

export default function Filters() {
  return (
    <div className="relative flex justify-between items-center border-2 border-gray-100 rounded-lg w-full h-12">
      <Search />
      <CurrencyInput />

      <Sorting />
    </div>
  );
}
