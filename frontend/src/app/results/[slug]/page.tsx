'use client'
import {ResultsTable} from "@/containers/ResultsTable/ResultsTable";
import {dataProcessApiService} from "@/services/api/data_process/data_process.api.service";
import {useEffect, useState} from "react";
import {DataProcessResponse} from "@/services/api/data_process/data_process.api.types";
import {LoadingOverlay} from "@/components/LoadingOverlay/LoadingOverlay";

export default function ResultsPage({params}: { params: { slug: string } }) {
  const [result, setResult] = useState<DataProcessResponse>()

  useEffect(() => {
    const fetchData = async () => {
      const result = await dataProcessApiService.getById(params.slug)
      setResult(result)
    }

    void fetchData()
  }, [params.slug])

  return (
    <div className="w-full">
      {result && <ResultsTable data={result.courses}/>}
      {!result && <LoadingOverlay/>}
    </div>
  )
}