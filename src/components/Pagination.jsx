import React, { useContext, useRef } from "react";
import paginationArrow from "../assets/pagination-arrow.svg";
import { CryptoContext } from "./../context/CryptoContext";
import submitIcon from "../assets/submit-icon.svg";

const PerPage = () => {
  const { setPerPage, loading, perPage } = useContext(CryptoContext);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if (val !== 0) {
      inputRef.current.value = val;
      setPerPage(val);
    }
  };

  return (
    <form
      className="relative flex items-center mr-12 font-nunito"
      onSubmit={handleSubmit}
    >
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75">
          <div className="border-4 border-cyan border-b-gray-200 rounded-full w-8 h-8 animate-spin"></div>
          <span className="ml-2">Searching...</span>
        </div>
      )}
      <label
        htmlFor="perpage"
        className="relative flex justify-center items-center mr-2 font-bold"
      >
        per page:{" "}
      </label>
      <input
        type="number"
        name="perpage"
        min={1}
        max={250}
        ref={inputRef}
        placeholder={perPage}
        className="focus:border-cyan bg-gray-200 pl-2 border border-transparent rounded w-16 placeholder:text-gray-100 leading-4 outline-0 required"
      />
      <button type="submit" className="ml-1 cursor-pointer">
        <img src={submitIcon} alt="submit" className="w-full h-auto" />
      </button>
    </form>
  );
};

const Pagination = () => {
  let { page, setPage, totalPages, perPage, cryptoData, loading } =
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

  if (loading) {
    return (
      <div className="flex items-center">
        <div className="border-4 border-cyan border-b-gray-200 rounded-full w-8 h-8 animate-spin"></div>
        <span className="ml-2">Searching...</span>
      </div>
    );
  }

  if (cryptoData && cryptoData.length >= perPage) {
    return (
      <div className="flex items-center">
        <PerPage />
        <ul className="flex justify-end items-center text-sm">
          {/* pagination Arrow left */}
          <li className="flex items-center">
            <button className="w-8 hover:text-cyan outline-0" onClick={prev}>
              <img
                className="w-full h-auto rotate-180"
                src={paginationArrow}
                alt="left"
              />
            </button>
          </li>

          {page - 3 === 1 || page === 1 || page === 2 || page === 3 ? null : (
            <li>
              {" "}
              <button
                onClick={multiStepPrev}
                className="flex justify-center items-center rounded-full w-8 h-8 text-lg hover:text-cyan ouline-0"
              >
                ...
              </button>
            </li>
          )}

          {page - 1 !== 0 ? (
            <li>
              <button
                onClick={prev}
                className="flex justify-center items-center bg-gray-200 mx-1.5 rounded-full w-8 h-8 hover:text-cyan ouline-0"
              >
                {" "}
                {page - 1}{" "}
              </button>
            </li>
          ) : null}
          <li>
            <button
              disabled
              className="flex justify-center items-center bg-cyan mx-1.5 rounded-full w-8 h-8 text-gray-300 ouline-0"
            >
              {page}
            </button>
          </li>

          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              <button
                onClick={next}
                className="flex justify-center items-center bg-gray-200 mx-1.5 rounded-full w-8 h-8 hover:text-cyan ouline-0"
              >
                {page + 1}
              </button>
            </li>
          ) : null}

          {page + 1 !== TotalNumber && page !== TotalNumber ? (
            <li>
              {" "}
              <button
                onClick={multiStepNext}
                className="flex justify-center items-center rounded-full w-8 h-8 text-lg hover:text-cyan ouline-0"
              >
                ...
              </button>
            </li>
          ) : null}

          {page !== TotalNumber ? (
            <li>
              <button
                onClick={() => setPage(TotalNumber)}
                className="flex justify-center items-center bg-gray-200 mx-1.5 rounded-full w-8 h-8 hover:text-cyan ouline-0"
              >
                {TotalNumber}
              </button>
            </li>
          ) : null}

          <li>
            <button className="w-8 hover:text-cyan outline-0" onClick={next}>
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
