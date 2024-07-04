import React from 'react';
import TableComponents from '../components/TableComponent';

// crypto component will hve the  tableComponent and filterComponent
export default function Crypto () {
  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">

      <TableComponents />
    </section>
  );
}
