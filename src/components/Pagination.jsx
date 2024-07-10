import React, { useContext, useRef, useState } from "react";
import paginationArrow from "../assets/pagination-arrow.svg";
import { CryptoContext } from "./../context/CryptoContext";
import submitIcon from "../assets/submit-icon.svg";

const PerPage = () => {
  const { setPerPage } = useContext(CryptoContext);
  const inputRef = useRef(null);
  const [placeholder, setPlaceholder] = useState("10");

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if (val !== 0) {
      setPerPage(val);
      setPlaceholder(val); // Update the placeholder value
    }
  };

  return (
    <form
      className="flex items-center mr-2 font-nunito"
      onSubmit={handleSubmit}
    >
      <label htmlFor="perpage" className="mr-2 font-bold">
        per page:{" "}
      </label>
      <input
        type="number"
        name="perpage"
        min={1}
        max={250}
        ref={inputRef}
        placeholder={placeholder} // Use the state variable for the placeholder
        className="focus:border-cyan bg-gray-200 pl-2 border border-transparent rounded w-12 md:w-16 text-sm leading-4 outline-0 placeholder-gray-400"
      />
      <button type="submit" className="ml-1 cursor-pointer">
        <img
          src={submitIcon}
          alt="submit"
          className="w-4 md:w-auto h-4 md:h-auto"
        />
      </button>
    </form>
  );
};

const Pagination = () => {
  let { page, setPage, totalPages, perPage, cryptoData } =
    useContext(CryptoContext);

  const TotalNumber = Math.ceil(totalPages / perPage);

  const next = () => {
    if (page === TotalNumber) {
      return null;
    } else {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };

  const multiStepNext = () => {
    if (page + 3 >= TotalNumber) {
      setPage(TotalNumber - 1);
    } else {
      setPage(page + 3);
    }
  };

  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setPage(TotalNumber + 1);
    } else {
      setPage(page - 2);
    }
  };

  if (cryptoData && cryptoData.length >= perPage) {
    return (
      <div className="flex justify-between items-center">
        <PerPage />
        <ul className="flex items-center text-xs md:text-sm">
          <li>
            <button className="w-6 hover:text-cyan outline-0" onClick={prev}>
              <img
                className="w-full h-auto transform rotate-180"
                src={paginationArrow}
                alt="left"
              />
            </button>
          </li>

          {page + 1 === TotalNumber || page === TotalNumber ? (
            <li>
              <button
                onClick={multiStepPrev}
                className="flex justify-center items-center rounded-full w-6 md:w-8 h-6 md:h-8 text-sm md:text-lg hover:text-cyan outline-0"
              >
                ...
              </button>
            </li>
          ) : null}

          {page - 1 !== 0 ? (
            <li>
              <button
                onClick={prev}
                className="flex justify-center items-center bg-gray-200 mx-1 rounded-full w-6 md:w-8 h-6 md:h-8 text-xs md:text-sm hover:text-cyan outline-0"
              >
                {page - 1}
              </button>
            </li>
          ) : null}
          <li>
            <button
              disabled
              className="flex justify-center items-center bg-cyan mx-1 rounded-full w-6 md:w-8 h-6 md:h-8 text-gray-300 outline-0"
            >
              {page}
            </button>
          </li>

          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              <button
                onClick={next}
                className="flex justify-center items-center bg-gray-200 mx-1 rounded-full w-6 md:w-8 h-6 md:h-8 text-xs md:text-sm hover:text-cyan outline-0"
              >
                {page + 1}
              </button>
            </li>
          ) : null}

          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              <button
                onClick={multiStepNext}
                className="flex justify-center items-center rounded-full w-6 md:w-8 h-6 md:h-8 text-sm md:text-lg hover:text-cyan outline-0"
              >
                ...
              </button>
            </li>
          ) : null}

          {page !== TotalNumber ? (
            <li>
              <button
                onClick={() => setPage(TotalNumber)}
                className="flex justify-center items-center bg-gray-200 mx-1 rounded-full w-6 md:w-8 h-6 md:h-8 text-xs md:text-sm hover:text-cyan outline-0"
              >
                {TotalNumber}
              </button>
            </li>
          ) : null}
          <li>
            <button className="w-6 hover:text-cyan outline-0" onClick={next}>
              <img
                className="w-full h-auto"
                src={paginationArrow}
                alt="right"
              />
            </button>
          </li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default Pagination;
