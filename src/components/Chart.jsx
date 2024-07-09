import React, { useLayoutEffect, useState } from "react";
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

const ChartComponent = ({ chartData }) => {
  function CustomTooltip({ payload, label, active, currency = "usd" }) {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: currency,
          }).format(payload[0].value)}`}</p>
        </div>
      );
    }

    return null;
  }
  return (
    <ResponsiveContainer>
      <LineChart width={600} height={400} data={chartData}>
        <CartesianGrid stroke="#323232" />
        <XAxis dataKey="date" hide />
        <YAxis dataKey="prices" hide domain={["auto", "auto"]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="prices"
          stroke="#14ffec"
          strokeWidth={"1px"}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const Chart = ({ id }) => {
  const [chartData, setChartData] = useState([]);

  const getChartData = async (id) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Convert data for recharts
      const convertedDataForChart = data.prices.map((price) => ({
        date: new Date(price[0]).toLocaleDateString(),
        prices: price[1],
      }));

      setChartData(convertedDataForChart);
      console.log("converted-data", convertedDataForChart);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useLayoutEffect(() => {
    getChartData(id);
  }, [id]);

  return (
    <div className="w-full h-[60%]">
      <ChartComponent chartData={chartData} />
    </div>
  );
};

export default Chart;
