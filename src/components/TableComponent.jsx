import React from "react";

export default function TableComponent() {
  return (
    <div className="flex flex-col  mt-9 border-gray-100 border rounded">
      <table className="w-full table-auto">
        <thead className="text-base capitalize text-gray-100 font-medium border-b border-gray-100">
          <tr>
            <th className="py-1">asset</th>
            <th className="py-1">name</th>
            <th className="py-1">price</th>
            <th className="py-1">total volume</th>
            <th className="py-1">market cap change</th>
            <th className="py-1">1H</th>
            <th className="py-1">24H</th>
            <th className="py-1">7D</th>
          </tr>
        </thead>
        <tbody>
          <tr
            className="text-center
          text-base border-b border-gray-100 hover:bg-gray-200 last:border-b-0"
          >
            <td className="py-4">asset</td>
            <td className="py-4">name</td>
            <td className="py-4">price</td>
            <td className="py-4">total volume</td>
            <td className="py-4">market cap cdange</td>
            <td className="py-4">1d</td>
            <td className="py-4">24d</td>
            <td className="py-4">7D</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
