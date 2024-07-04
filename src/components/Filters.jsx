import React from "react";
import Search from "./Search";

export default function Filters() {
  return (
    <div className="relative flex justify-between items-center border-2 border-gray-100 rounded-lg w-full h-12">
      <Search />
      <div>currency</div>
      <div>sorting</div>
    </div>
  );
}
