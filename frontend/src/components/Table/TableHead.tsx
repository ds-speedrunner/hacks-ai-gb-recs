import {flexRender, Table} from "@tanstack/react-table";
import React from "react";

interface Props<T> {
  dataTable: Table<T>;
}

export const TableHead = <T, >({dataTable}: Props<T>) => {
  return (
    <thead className={'h-12'}>
    {dataTable.getHeaderGroups().map(headerGroup => (
      <tr
        key={headerGroup.id}
        className="bg-neutral-800 text-neutral-400 text-left tracking-wider"
      >
        {headerGroup.headers.map(header => (
          <th key={header.id} colSpan={header.colSpan} className="px-4 py-2">
            <div>
              {flexRender(
                header.column.columnDef.header,
                header.getContext()
              )}
            </div>
          </th>
        ))}
      </tr>
    ))}
    </thead>
  )
}