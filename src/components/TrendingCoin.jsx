import React from "react";
import { useNavigate } from "react-router-dom";

const TrendingCoin = ({ data }) => {
  let navigate = useNavigate();

  const getCoinDetails = (id) => {
    navigate(`${id}`);
  };

  return (
    <div
      className="relative bg-gray-200 hover:bg-gray-100 hover:bg-opacity-40 mb-12 last:mb-0 p-4 rounded-lg w-full md:w-[40%] cursor-pointer"
      onClick={() => getCoinDetails(data.id)}
    >
      {data ? (
        <>
          <h3 className="flex items-center my-0.5 text-base">
            <span className="text-gray-100 capitalize">name:&nbsp;</span>
            <span className="text-cyan">{data.name}</span>
            <img
              src={data.small}
              alt={data.name}
              className="mx-1.5 rounded-full w-[1.5rem] h-[1.5rem]"
            />
          </h3>

          <h3 className="flex items-center my-0.5 text-base">
            <span className="text-gray-100 capitalize">
              market cap rank:&nbsp;
            </span>
            <span className="text-cyan">{data.market_cap_rank}</span>
          </h3>
          <h3 className="flex items-center my-0.5 text-base">
            <span className="text-gray-100 capitalize">
              price (in btc):&nbsp;
            </span>
            <span className="text-cyan">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "btc",
                maximumSignificantDigits: 5,
              }).format(data.price_btc)}
            </span>
          </h3>

          <h3 className="flex items-center my-0.5 text-base">
            <span className="text-gray-100 capitalize">score:&nbsp;</span>
            <span className="text-cyan">{data.score}</span>
          </h3>

          <img
            src={data.large}
            alt={data.name}
            className="top-1/2 -right-6 md:-right-12 absolute rounded-full w-[30%] md:w-[35%] h-auto transform -translate-y-1/2"
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
