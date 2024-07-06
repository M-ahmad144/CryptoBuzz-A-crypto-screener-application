import React, { useContext, useState, useEffect, useCallback } from "react";
import pagination from "../assets/pagination-arrow.svg";
import { CryptoContext } from "../context/CryptoContext";
import debounce from "lodash.debounce";
export default function Pagination() {
  const { setPage, page, totalPages } = useContext(CryptoContext);
  const lastPage = Math.ceil(totalPages / 10);

  const [debouncedPage, setDebouncedPage] = useState(page);

  const updatePage = useCallback(
    debounce((newPage) => {
      setPage(newPage);
    }, 2000),
    [] // Only create this debounced function once
  );

  useEffect(() => {
    updatePage(debouncedPage);
  }, [debouncedPage, updatePage]);

  const handleNextClick = () => {
    if (page < lastPage) {
      setDebouncedPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (page > 1) {
      setDebouncedPage((prevPage) => prevPage - 1);
    }
  };

  const multiStepNext = () => {
    if (page + 3 >= lastPage) {
      setDebouncedPage(lastPage);
    } else {
      setDebouncedPage((prevPage) => prevPage + 3);
    }
  };

  const multiStepPrev = () => {
    if (page - 3 <= 1) {
      setDebouncedPage(1);
    } else {
      setDebouncedPage((prevPage) => prevPage - 3);
    }
  };

  return (
    <div className="flex items-center">
      <ul className="flex items-center text-sm">
        <li className="flex items-center">
          <button
            onClick={handlePrevClick}
            className="w-8 hover:text-cyan outline-0"
          >
            <img
              className="w-full h-auto rotate-180"
              src={pagination}
              alt="left"
            />
          </button>
        </li>
        {page === 1 ? null : (
          <li>
            <button
              onClick={multiStepPrev}
              className="flex justify-center items-center rounded-full w-8 h-8 text-lg hover:text-cyan outline-0"
            >
              ...
            </button>
          </li>
        )}
        {page > 1 && (
          <li>
            <button
              onClick={handlePrevClick}
              className="flex justify-center items-center bg-gray-200 mx-1 rounded-full w-8 h-8 hover:text-cyan outline-0"
            >
              {page - 1}
            </button>
          </li>
        )}
        <li>
          <button
            disabled
            className="flex justify-center items-center bg-cyan mx-1 rounded-full w-8 h-8 text-gray-200 outline-0"
          >
            {page}
          </button>
        </li>
        {page < lastPage && (
          <li>
            <button
              onClick={handleNextClick}
              className="flex justify-center items-center bg-gray-200 mx-1 rounded-full w-8 h-8 hover:text-cyan outline-0"
            >
              {page + 1}
            </button>
          </li>
        )}
        {page === lastPage ? null : (
          <li>
            <button
              onClick={multiStepNext}
              className="flex justify-center items-center rounded-full w-8 h-8 text-lg hover:text-cyan outline-0"
            >
              ...
            </button>
          </li>
        )}
        {page < lastPage && (
          <li>
            <button
              onClick={() => setDebouncedPage(lastPage)}
              className="flex justify-center items-center bg-gray-200 mx-1 px-2 rounded-full w-8 h-8 hover:text-cyan outline-0"
            >
              {lastPage}
            </button>
          </li>
        )}
        <li className="flex items-center">
          <button
            onClick={handleNextClick}
            className="w-8 hover:text-cyan outline-0"
          >
            <img className="w-full h-auto" src={pagination} alt="right" />
          </button>
        </li>
      </ul>
    </div>
  );
}
