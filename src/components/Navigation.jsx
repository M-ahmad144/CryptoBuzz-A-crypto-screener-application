import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="flex flex-wrap justify-around border-cyan mx-auto mt-16 border rounded-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[45%]">
      {/* NavLink provides us with a prop called isActive that indicates if the link is "active" or not by clicking it . */}
      <NavLink
        //end  use to  match the  exact url
        end
        to="/"
        className={({ isActive }) => {
          return `w-full sm:w-auto text-center font-nunito text-sm sm:text-base px-12 sm:m-2.5
                        ${
                          isActive
                            ? "bg-cyan text-gray-300 rounded-md"
                            : "bg-gray-200 rounded-lg text-gray-100  hover:text-cyan  active:bg-cyan active:text-gray-300 cursor-pointer border-0   font-semibold  capitalize"
                        }
                       
              `;
        }}
      >
        Crypto
      </NavLink>

      <NavLink
        to="/trending"
        className={({ isActive }) => {
          return `w-full sm:w-auto text-center font-nunito px-12 text-sm sm:text-base m-1.5 sm:m-2.5
                        ${
                          isActive
                            ? "bg-cyan text-gray-300 rounded-md"
                            : "bg-gray-200 rounded-lg text-gray-100  hover:text-cyan  active:bg-cyan active:text-gray-300 cursor-pointer border-0   font-semibold  capitalize"
                        }
                       
              `;
        }}
      >
        Trending
      </NavLink>

      <NavLink
        to="/saved"
        className={({ isActive }) => {
          return `w-full sm:w-auto text-center  px-12 font-nunito text-sm sm:text-base m-1.5 sm:m-2.5
                        ${
                          isActive
                            ? "bg-cyan text-gray-300 rounded-md"
                            : "bg-gray-200 rounded-lg text-gray-100  hover:text-cyan  active:bg-cyan active:text-gray-300 cursor-pointer border-0   font-semibold  capitalize"
                        }
                       
              `;
        }}
      >
        Saved
      </NavLink>
    </nav>
  );
}
