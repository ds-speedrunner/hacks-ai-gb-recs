'use client'
import React from 'react';
import {getCoreRowModel, useReactTable, flexRender} from '@tanstack/react-table';

interface Props<T> {
  columns: any;
  data: T[];
}

export const Table = <T, >(props: Props<T>) => {
  const {data, columns} = props;
  const dataTable = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full divide-y divide-neutral-900">
      <thead>
        {dataTable.getHeaderGroups().map(headerGroup => (
          <tr
            key={headerGroup.id}
            className="bg-neutral-700 text-neutral-400 text-left text-xs tracking-wider"
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
    </table>
  );
}

export default Table;