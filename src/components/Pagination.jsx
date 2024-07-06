import React from "react";
import pagination from "../assets/pagination-arrow.svg";

export default function Pagination() {
  return (
    <div className="flex items-center">
      <ul className="flex items-center text-sm">
        <li className="flex items-center">
          <button className="w-8 hover:text-cyan outline-0">
            <img
              className="w-full h-auto rotate-180"
              src={pagination}
              alt="left"
            />
          </button>
        </li>
        <li>
          <button className="flex justify-center items-center rounded-full w-8 h-8 text-lg hover:text-cyan outline-0">
            ...
          </button>
        </li>
        <li>
          <button className="flex justify-center items-center bg-gray-200 mx-1 rounded-full w-8 h-8 hover:text-cyan outline-0">
            1
          </button>
        </li>
        <li>
          <button className="flex justify-center items-center bg-cyan mx-1 rounded-full w-8 h-8 text-gray-200 outline-0">
            2
          </button>
        </li>
        <li>
          <button className="flex justify-center items-center bg-gray-200 mx-1 rounded-full w-8 h-8 hover:text-cyan outline-0">
            3
          </button>
        </li>
        <li>
          <button className="flex justify-center items-center rounded-full w-8 h-8 text-lg hover:text-cyan outline-0">
            ...
          </button>
        </li>
        <li>
          <button className="flex justify-center items-center bg-gray-200 mx-1 px-2 rounded-full w-8 h-8 hover:text-cyan outline-0">
            100
          </button>
        </li>
        <li className="flex items-center">
          <button className="w-8 hover:text-cyan outline-0">
            <img className="w-full h-auto" src={pagination} alt="right" />
          </button>
        </li>
      </ul>
    </div>
  );
}
