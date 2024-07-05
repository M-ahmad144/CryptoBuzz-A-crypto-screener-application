import React, { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";

export default function TTTable() {
  let { cryptoData } = useContext(CryptoContext);
  return (
    <div className="flex flex-col items-center border-gray-100 mt-9 border rounded">
      <table className="w-full align-middle table-auto">
        <thead>
          <tr className="flex items-center m-3 align-middle">
            <th className="py-1">Asset 1</th>
            <th className="py-1">Asset 2</th>
            <th className="py-1">Asset 3</th>
            <th className="py-1">Asset 4</th>
            <th className="py-1">Asset 5</th>
            <th className="py-1">Asset 6</th>
            <th className="py-1">Asset 7</th>
            <th className="py-1">Asset 8</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((data, index) => {
            return (
              <tr key={index} className="align-middle">
                <td>{data.name}</td>
                <td>{data.name}</td>
                <td>{data.name}</td>
                <td>{data.name}</td>
                <td>{data.name}</td>
                <td>{data.name}</td>
                <td>{data.name}</td>
                <td>{data.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
