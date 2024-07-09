import React, { useContext, useState, useEffect, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { CryptoContext } from "../context/CryptoContext";
import Chart from "./Chart";

const HighLowIndicator = ({ currentPrice, high, low }) => {
  const [green, setGreen] = useState();

  useEffect(() => {
    let total = high - low;
    let greenZone = ((high - currentPrice) * 100) / total;
    setGreen(Math.ceil(greenZone));
  }, [currentPrice, high, low]);

  return (
    <>
      <span
        className="bg-red rounded-l-lg w-[50%] h-1.5"
        style={{ width: `${100 - green}%` }}
      >
        {/* empty string */}
        &nbsp;
      </span>

      <span
        className="bg-green rounded-r-lg w-[50%] h-1.5"
        style={{ width: `${green}%` }}
      >
        &nbsp;
      </span>
    </>
  );
};
export default function CryptoDataDetails() {
  // Ensure that the element with id 'model' exists in the DOM
  const modalRoot = document.getElementById("model");

  // Retrieve the coinId parameter from the URL
  let { coinId } = useParams();

  // Get the getCoinData function and coinData from the CryptoContext
  const { getCoinData, coinData: data, currency } = useContext(CryptoContext);

  // useNavigate hook to programmatically navigate to different routes in this case to parent root url
  let navigate = useNavigate();

  // Fetch coin data whenever the coinId changes
  useLayoutEffect(() => {
    getCoinData(coinId);
  }, [coinId]);

  // Function to close the modal and navigate to the parent route url
  const close = () => {
    navigate("..");
  };

  // Render the component using ReactDOM.createPortal for creating modals/pop-ups
  return ReactDOM.createPortal(
    <div
      onClick={close}
      className="top-0 fixed flex justify-center items-center bg-gray-200 bg-opacity-30 backdrop-blur-sm w-full h-full font-nunito"
    >
      <div
        // Prevent the click event from propagating to parent elements
        onClick={(e) => e.stopPropagation()}
        className="relative flex items-center bg-gray-300 bg-opacity-75 rounded-lg w-[67%] h-[75%] text-white align-middle"
      >
        {data ? (
          <div className="flex justify-between items-center py-4 w-full h-full">
            {/* left div */}

            <div className="flex flex-col m-3 w-[45%] h-full">
              {/* image ,name ,symbol */}
              <div className="flex items-center w-full">
                <img
                  className="flex mx-1.5 w-[3rem] h-[3rem]"
                  src={data.image.large}
                  alt={data.id}
                />
                <h1 className="font-medium font-nunito text-xl capitalize">
                  {data.name}
                </h1>
                <span className="bg-cyan bg-opacity-25 ml-2 px-2.5 py-0.5 rounded text-cyan text-sm uppercase">
                  {data.symbol}
                </span>
              </div>

              {/* price label,market price change,total price */}
              <div className="flex mt-6 w-full">
                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <span className="text-gray-100 text-sm capitalize">
                      price
                    </span>
                    <div
                      className={`text-sm px-1  font-medium flex items-center
                             rounded uppercase bg-opacity-25
                              ${
                                data.market_data.price_change_percentage_24h > 0
                                  ? "bg-green text-green"
                                  : "bg-red text-red"
                              }`}
                    >
                      <span>
                        {Number(
                          data.market_data.price_change_percentage_24h
                        ).toFixed(2)}
                        %
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-[1rem] ml-0.5 ${
                          data.market_data.price_change_percentage_24h > 0
                            ? "fill-green rotate-180"
                            : "fill-red"
                        }`}
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>

                  <h2 className="font-bold font-nunito text-lg">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      maximumSignificantDigits: 5,
                    }).format(data.market_data.current_price[currency])}
                  </h2>
                </div>
              </div>

              {/*Market Cap and fully diluted valuation */}
              <div className="flex justify-between mt-4 w-full">
                <div className="flex flex-col">
                  <span className="ml-2 text-gray-100 text-sm capitalize">
                    Market Cap
                  </span>
                  <h2 className="font-bold font-nunito text-base">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(data.market_data.market_cap[currency])}
                  </h2>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-100 text-sm capitalize">
                    fully diluted valuation
                  </span>
                  <h2 className="font-bold font-nunito text-base">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      notation: "compact",
                    }).format(
                      data.market_data.fully_diluted_valuation[currency]
                    )}
                  </h2>
                </div>
              </div>

              {/* total volume */}
              <div className="flex flex-col justify-between mt-4 w-full">
                <span className="ml-2 text-gray-100 text-sm capitalize">
                  Total Volume
                </span>
                <h2 className="font-bold font-nunito text-base">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: currency,
                    minimumFractionDigits: 0,
                  }).format(data.market_data.total_volume[currency])}
                </h2>
              </div>

              {/* High Low Indicator */}
              <div className="flex justify-between mt-4 w-full">
                <HighLowIndicator
                  currentPrice={data.market_data.current_price[currency]}
                  high={data.market_data.high_24h[currency]}
                  low={data.market_data.low_24h[currency]}
                />
              </div>

              {/* Low 24h and High 24h */}
              <div className="flex flex-col justify-between w-full">
                <div className="flex justify-between mt-4 w-full">
                  <div className="flex flex-col">
                    <span className="text-gray-100 text-sm capitalize">
                      Low 24H
                    </span>
                    <h2 className="font-bold font-nunito text-base">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currency,
                        minimumFractionDigits: 5,
                      }).format(data.market_data.low_24h[currency])}
                    </h2>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-gray-100 text-sm capitalize">
                      High 24H
                    </span>
                    <h2 className="font-bold font-nunito text-base">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currency,
                        minimumFractionDigits: 5,
                      }).format(data.market_data.high_24h[currency])}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Max Supply and Circulating Supply */}
              <div className="flex flex-col justify-between w-full">
                <div className="flex justify-between mt-4 w-full">
                  <div className="flex flex-col">
                    <span className="text-gray-100 text-sm capitalize">
                      Max Supply
                    </span>
                    <h2 className="font-bold font-nunito text-base">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currency,
                        minimumFractionDigits: 0,
                      }).format(data.market_data.max_supply)}
                    </h2>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-gray-100 text-sm capitalize">
                      Circulating Supply
                    </span>
                    <h2 className="font-bold font-nunito text-base">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currency,
                        minimumFractionDigits: 0,
                      }).format(data.market_data.circulating_supply)}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="flex justify-between mt-4 w-full">
                <div className="flex flex-col">
                  <a
                    target={"_blank"}
                    rel="noreferrer"
                    className="bg-gray-200 my-1 px-1.5 py-0.5 rounded text-gray-100 text-sm"
                    href={data?.links?.homepage[0]}
                  >
                    {data?.links?.homepage[0]?.substring(0, 30)}
                  </a>
                  <a
                    target={"_blank"}
                    rel="noreferrer"
                    className="bg-gray-200 my-1 px-1.5 py-0.5 rounded text-gray-100 text-sm"
                    href={data?.links?.blockchain_site[0]}
                  >
                    {data?.links?.blockchain_site[0]?.substring(0, 30)}
                  </a>
                </div>

                {/* Sentiment */}
                <div className="flex flex-col content-start">
                  <span className="ml-2 text-gray-100 text-sm capitalize">
                    sentiment
                  </span>
                  <div className="flex justify-between">
                    <div
                      className={`text-sm px-1 ml-2 my-1 font-medium flex items-center
                          rounded uppercase bg-opacity-25 bg-green text-green`}
                    >
                      <span>
                        {Number(data.sentiment_votes_up_percentage).toFixed(2)}%
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-0.5 w-[1rem] fill-green rotate-180"
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div
                      className={`text-sm px-1 ml-2 my-1 font-medium flex items-center
            rounded uppercase bg-opacity-25 bg-red text-red`}
                    >
                      <span>
                        {Number(data.sentiment_votes_down_percentage).toFixed(
                          2
                        )}
                        %
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-0.5 w-[1rem] fill-red"
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* right div */}
            <div className="flex flex-col pl-3 w-[55%] h-full">
              <Chart id={data.id} />
            </div>
          </div>
        ) : null}
      </div>
    </div>,
    modalRoot // Append the modal to the element with id 'model'
  );
}
