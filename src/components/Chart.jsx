import React, { useContext, useLayoutEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CryptoContext } from "../context/CryptoContext";

// ChartComponent function component, accepts chartData and currency as props
const ChartComponent = ({ chartData, currency, type }) => {
  // CustomTooltip function component for rendering customized tooltips
  function CustomTooltip({ payload, label, active, currency = "usd" }) {
    // Check if the tooltip is active and payload contains data
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="text-cyan text-sm label">{`${label} : ${new Intl.NumberFormat(
            "en-IN",
            {
              style: "currency",
              currency: currency,
              minimumFractionDigits: 5,
            }
          ).format(payload[0].value)}`}</p>
        </div>
      );
    }

    return null;
  }

  return (
    <ResponsiveContainer>
      <LineChart width={600} height={400} data={chartData}>
        <CartesianGrid stroke="#323232" />
        {/* XAxis to display date data, hide axis */}
        <XAxis dataKey="date" hide />
        {/* YAxis to display price data, hide axis, and auto-adjust domain */}
        <YAxis dataKey={type} hide domain={["auto", "auto"]} />

        <Tooltip
          content={<CustomTooltip />} // Render CustomTooltip component
          currency={currency} // Pass currency prop to CustomTooltip
          cursor={false}
          wrapperStyle={{ outline: "none" }}
        />

        <Legend />
        {/* Line component, render line chart with price data */}
        <Line
          type="monotone"
          dataKey={type}
          stroke="#14ffec" // Stroke color of the line
          strokeWidth={"1px"} // Stroke width of the line
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Chart function component, fetches chart data based on id and renders ChartComponent
const Chart = ({ id }) => {
  const [chartData, setChartData] = useState([]); // State to store chart data
  //we are gettinh three types of data - prices ,market_cap and total volume
  const [type, setType] = useState("prices"); //initillay set to the prices
  let { currency } = useContext(CryptoContext);
  const [days, setDays] = useState(7);

  // Function to fetch chart data from API based on id
  const getChartData = async (id) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
      );
      // Check if response is ok, throw error if not
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Parse response to JSON format
      const data = await response.json();

      // Convert data for recharts to render
      const convertedDataForChart = data[type].map((price) => ({
        date: new Date(price[0]).toLocaleDateString(), // Convert date format
        [type]: price[1], // Price data
      }));

      // Set chartData state with converted data
      setChartData(convertedDataForChart);
      console.log("converted-data", convertedDataForChart); // Log converted data
    } catch (error) {
      console.error("Error fetching chart data:", error); // Log error if fetching fails
    }
  };

  // Fetch chart data on component mount and when id changes
  useLayoutEffect(() => {
    getChartData(id);
  }, [id, type, days]);

  // Render ChartComponent with chartData and currency props
  return (
    <div className="w-full h-[60%]">
      {" "}
      <ChartComponent
        chartData={chartData}
        currency={currency}
        type={type}
      />{" "}
      <div className="flex">
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "prices"
              ? "bg-cyan text-cyan"
              : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setType("prices")}
        >
          Price
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "market_caps"
              ? "bg-cyan text-cyan"
              : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setType("market_caps")}
        >
          market caps
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "total_volumes"
              ? "bg-cyan text-cyan"
              : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setType("total_volumes")}
        >
          total volumes
        </button>

        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 7 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(7)}
        >
          7d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 14 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(14)}
        >
          14d
        </button>
        <button
          className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            days === 30 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          }`}
          onClick={() => setDays(30)}
        >
          30d
        </button>
      </div>
    </div>
  );
};

export default Chart;
