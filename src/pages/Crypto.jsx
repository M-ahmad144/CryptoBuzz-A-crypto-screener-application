import React from "react";
import TableComponents from "../components/TableComponent";
import Filters from "../components/Filters";

// crypto component will hve the  tableComponent and filterComponent
export default function Crypto() {
  return (
    <section className="relative flex flex-col mt-16 mb-24 w-[80%] h-full">
      <Filters />
      <TableComponents />
    </section>
  );
}
