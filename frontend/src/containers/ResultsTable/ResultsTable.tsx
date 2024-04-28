import {Course, DataProcessResponse} from "@/services/api/data_process/data_process.api.types";
import React from "react";
import Table from "@/components/Table/Table";

interface Props {
  data: Course[]
}

export function ResultsTable({data}: Props) {
  return (
    <div className="w-full">
      <Table data={data}/>
    </div>
  )
}