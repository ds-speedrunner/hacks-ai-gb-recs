import {Course, generateRandomData} from "@/services/api/data_process/data_process.api.types";
import {Table} from "@/components/Table/Table";
import {ColumnDef, createColumnHelper} from "@tanstack/react-table";

const data = generateRandomData(10);

const columnHelper = createColumnHelper<Course>()
const columns = [
  columnHelper.accessor('name', {header: 'Name'}),
  columnHelper.accessor('coverage', {header: 'Coverage'}),
]
export function ResultsTable() {
    return (
        <div className="w-full">
            <Table data={data.courses} columns={columns} />
        </div>
    )
}