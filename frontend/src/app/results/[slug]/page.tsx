import {ResultsTable} from "@/containers/ResultsTable/ResultsTable";
import {dataProcessApiService} from "@/services/api/data_process/data_process.api.service";
import {notFound} from "next/navigation";

export default async function ResultsPage({params}: { params: { slug: string } }) {
  const result = await dataProcessApiService.getById(params.slug)

  if (!result) {
    return notFound()
  }

  return (
    <div className="w-full">
      <ResultsTable data={result.courses}/>
    </div>
  )
}