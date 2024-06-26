'use client'
import React from 'react';
import {getCoreRowModel, useReactTable, flexRender, createColumnHelper} from '@tanstack/react-table';
import {TableBody} from "@/components/Table/TableBody";
import {TableHead} from "@/components/Table/TableHead";
import {Course} from "@/services/api/data_process/data_process.api.types";
import {ProgressBarCell} from "@/components/Table/cells/ProgressBarCell";

interface Props {
  data: Course[];
}

const getProgressBarCell = (cell: any) => {
  return <ProgressBarCell value={cell.getValue()} />
}

const columnHelper = createColumnHelper<Course>()
const columns = [
  columnHelper.accessor('title', {header: 'Курс'}),
  columnHelper.accessor('skills_ratio', {header: 'Покрываемость навыков', cell: getProgressBarCell }),
  columnHelper.accessor('score_avg', {header: 'Соответствие', cell: getProgressBarCell }),
  columnHelper.accessor('url', {
    header: 'Ссылка',
    cell: (cell) => <a href={cell.getValue()} target="_blank" rel="noreferrer">{cell.getValue()}</a>,
  }),
]

export const Table = (props: Props) => {
  const {data} = props;
  const dataTable = useReactTable<Course>({data, columns, getCoreRowModel: getCoreRowModel()});

  return (
    <div className="w-full">
      <table className="w-full divide-y divide-neutral-900 text-sm text-left text-neutral-400">
        <TableHead dataTable={dataTable}/>
        <TableBody dataTable={dataTable}/>
      </table>
    </div>
  );
}

export default Table;