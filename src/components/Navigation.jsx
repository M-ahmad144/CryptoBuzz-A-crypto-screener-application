import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Navigation () {
  return (
    <nav className="w-[45%] mt-16  flex justify-around border border-cyan  rounded-lg">
      {/* NavLink provides us with a prop called isActive that indicates if the link is "active" or not by clicking it . */}
      <NavLink
        //end  use to  match the  exact url
        end
        to="/"
        className={({isActive}) => {
          return `w-full  text-center font-nunito text-base m-2.5
                        ${isActive ? 'bg-cyan text-gray-300 rounded-lg' : 'bg-gray-200 rounded-lg text-gray-100  hover:text-cyan  active:bg-cyan active:text-gray-300 cursor-pointer border-0   font-semibold  capitalize'}
                       
              `;
        }}
      >
        Crypto
      </NavLink>

      <NavLink
        to="/trending"
        className={({isActive}) => {
          return `w-full  text-center font-nunito text-base m-2.5
                        ${isActive ? 'bg-cyan text-gray-300 rounded-lg' : 'bg-gray-200 rounded-lg text-gray-100  hover:text-cyan  active:bg-cyan active:text-gray-300 cursor-pointer border-0   font-semibold  capitalize'}
                       
              `;
        }}
      >
        Trending
      </NavLink>

      <NavLink
        to="/saved"
        className={({isActive}) => {
          return `w-full  text-center font-nunito text-base m-2.5
                        ${isActive ? 'bg-cyan text-gray-300 rounded-lg' : 'bg-gray-200 rounded-lg text-gray-100  hover:text-cyan  active:bg-cyan active:text-gray-300 cursor-pointer border-0   font-semibold  capitalize'}
                       
              `;
        }}
      >
        Saved
      </NavLink>
    </nav>
  );
}
