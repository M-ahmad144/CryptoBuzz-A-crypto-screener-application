import React, { useContext } from "react";
import submitIcon from "../assets/submit-icon.svg";
import { CryptoContext } from "../context/CryptoContext";

export default function CurrencyInput() {
  const { setcurrency } = useContext(CryptoContext);
  return (
    <div className="flex mr-7">
      <form className="relative flex items-center mr-12 font-nunito">
        <label
          className="relative flex justify-center items-center mr-2 font-bold text-gray-400"
          htmlFor="currency"
        >
          currency:
        </label>

        <input
          className="focus:border-cyan bg-gray-200 pl-2 border border-transparent rounded w-16 placeholder:text-gray-100 leading-4 outline-0 required"
          placeholder="usd"
          type="text"
          name="currency"
        />

        <button className="ml-1 cursor-pointer" type="submit ">
          <img className="w-full h-auto" src={submitIcon} alt="submit" />
        </button>
      </form>
    </div>
  );
}
