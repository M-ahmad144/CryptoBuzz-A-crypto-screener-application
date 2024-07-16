import React from "react";
import { useNavigate } from "react-router-dom";

const TrendingCoin = ({ data }) => {
  let navigate = useNavigate();

  const getCoinDetails = (id) => {
    navigate(`${id}`);
  };

  return (
    <div
      className="relative bg-gray-200 hover:bg-gray-100 hover:bg-opacity-40 mb-6 last:mb-0 p-4 rounded-lg w-full sm:w-[90%] md:w-[60%] lg:w-[40%] cursor-pointer"
      onClick={() => getCoinDetails(data.id)}
    >
      {data ? (
        <>
          {/* name and image */}
          <h3 className="flex flex-wrap items-center my-1 text-sm sm:text-base">
            <span className="text-gray-100 capitalize">name:&nbsp;</span>
            <span className="text-cyan">{data.name}</span>
            <img
              src={data.small}
              alt={data.name}
              className="ml-2 rounded-full w-6 sm:w-8 h-6 sm:h-8"
            />
          </h3>
          {/* mark up rank */}
          <h3 className="flex flex-wrap items-center my-1 text-sm sm:text-base">
            <span className="text-gray-100 capitalize">
              market cap rank:&nbsp;
            </span>
            <span className="text-cyan">{data.market_cap_rank}</span>
          </h3>
          {/* price in btc */}
          <h3 className="flex flex-wrap items-center my-1 text-sm sm:text-base">
            <span className="text-gray-100 capitalize">
              price (in btc):&nbsp;
            </span>
            <span className="text-cyan">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "BTC",
                maximumSignificantDigits: 5,
              }).format(data.price_btc)}
            </span>
          </h3>
          {/* score */}
          <h3 className="flex flex-wrap items-center my-1 text-sm sm:text-base">
            <span className="text-gray-100 capitalize">score:&nbsp;</span>
            <span className="text-cyan">{data.score}</span>
          </h3>
          {/* large image */}
          <img
            src={data.large}
            alt={data.name}
            className="top-1/2 -right-4 sm:-right-6 md:-right-8 lg:-right-12 absolute rounded-full w-[25%] sm:w-[30%] md:w-[35%] h-auto transform -translate-y-1/2"
          />
        </>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <div
            className="border-4 border-cyan border-b-gray-200 rounded-full w-8 h-8 animate-spin"
            role="status"
          />
          <span className="ml-2">please wait...</span>
        </div>
      )}
    </div>
  );
};

export default TrendingCoin;
