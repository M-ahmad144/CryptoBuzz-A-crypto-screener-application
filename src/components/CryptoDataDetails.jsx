import React, { useContext, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { CryptoContext } from "../context/CryptoContext";

export default function CryptoDataDetails() {
  // Ensure that the element with id 'model' exists in the DOM
  const modalRoot = document.getElementById("model");

  // Retrieve the coinId parameter from the URL
  let { coinId } = useParams();

  // Get the getCoinData function and coinData from the CryptoContext
  const { getCoinData, coinData } = useContext(CryptoContext);

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
        className="relative flex items-center bg-gray-300 bg-opacity-75 rounded-lg w-[65%] h-[75%] text-white align-middle"
      >
        {/* Display the coinData if available */}
        {coinData ? <h1>{coinData.id}</h1> : null}
      </div>
    </div>,
    modalRoot // Append the modal to the element with id 'model'
  );
}
