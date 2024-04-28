import {flexRender, Table} from "@tanstack/react-table";
import React from "react";

interface Props<T> {
  dataTable: Table<T>;
}

export const TableBody = <T, >({dataTable}: Props<T>) => {
  const rows = dataTable.getRowModel().rows;

  return (
    <tbody>
    {rows.map((row) => {
      return (
        <tr key={row.id} className="bg-neutral-800-800 border-y border-y-zinc-700 h-12 bg-zinc-900">
          {row.getVisibleCells().map((cell) => {
            console.log(cell)
            return (
              <td key={cell.id} className="px-4 py-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            );
          })}
        </tr>
      );
    })}
    </tbody>
  )
}