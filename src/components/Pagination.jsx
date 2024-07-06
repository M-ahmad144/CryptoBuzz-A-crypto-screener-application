import React, { useState } from "react";
import pagination from "../assets/pagination-arrow.svg";

export default function Pagination() {
  const lastPage = 250;
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextClick = () => {
    if (currentPage < lastPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const multiStepNext = () => {
    if (currentPage + 3 >= lastPage) {
      setCurrentPage(lastPage);
    } else {
      setCurrentPage((prevPage) => prevPage + 3);
    }
  };

  const multiStepPrev = () => {
    if (currentPage - 3 <= 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage((prevPage) => prevPage - 3);
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
        {currentPage === 1 ? null : (
          <li>
            <button
              onClick={multiStepPrev}
              className="flex justify-center items-center rounded-full w-8 h-8 text-lg hover:text-cyan outline-0"
            >
              ...
            </button>
          </li>
        )}

        {currentPage > 1 && (
          <li>
            <button
              onClick={handlePrevClick}
              className="flex justify-center items-center bg-gray-200 mx-1 rounded-full w-8 h-8 hover:text-cyan outline-0"
            >
              {currentPage - 1}
            </button>
          </li>
        )}
        <li>
          <button
            disabled
            className="flex justify-center items-center bg-cyan mx-1 rounded-full w-8 h-8 text-gray-200 outline-0"
          >
            {currentPage}
          </button>
        </li>
        {currentPage < lastPage && (
          <li>
            <button
              onClick={handleNextClick}
              className="flex justify-center items-center bg-gray-200 mx-1 rounded-full w-8 h-8 hover:text-cyan outline-0"
            >
              {currentPage + 1}
            </button>
          </li>
        )}
        {currentPage === lastPage ? null : (
          <li>
            <button
              onClick={multiStepNext}
              className="flex justify-center items-center rounded-full w-8 h-8 text-lg hover:text-cyan outline-0"
            >
              ...
            </button>
          </li>
        )}

        {currentPage < lastPage && (
          <li>
            <button
              onClick={() => setCurrentPage(lastPage)}
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
