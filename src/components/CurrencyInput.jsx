import React, { useContext, useRef } from "react";
import submitIcon from "../assets/submit-icon.svg";
import { CryptoContext } from "../context/CryptoContext";

export default function CurrencyInput() {
  const { setCurrency } = useContext(CryptoContext);
  const currencyRef = useRef(null);

  const handleCurrencySubmit = (e) => {
    e.preventDefault();
    let val = currencyRef.current.value;
    setCurrency(val);
    currencyRef.current.value = "";
  };

  return (
    <div className="flex ml-5">
      <form
        onSubmit={handleCurrencySubmit}
        className="relative flex items-center mr-12 font-nunito"
      >
        <label
          className="relative flex justify-center items-center mr-2 font-bold"
          htmlFor="currency"
        >
          currency:
        </label>

        <input
          className="focus:border-cyan bg-gray-200 pl-2 border border-transparent rounded w-16 placeholder:text-gray-100 leading-4 outline-0 required"
          ref={currencyRef}
          placeholder="usd"
          type="text"
          name="currency"
        />
        <button type="submit" className="ml-1 cursor-pointer">
          <img src={submitIcon} alt="submit" className="w-full h-auto" />
        </button>
      </form>
    </div>
  );
}
