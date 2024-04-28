'use client'
import {TextArea} from "@/components/TextArea/TextArea";
import {FormEvent, useCallback, useState} from "react";
import {FileUploader} from "@/components/FileUploader/FileUploader";
import {Button} from "@/components/Button/Button";
import {dataProcessApiService} from "@/services/api/data_process/data_process.api.service";
import {LoadingOverlay} from "@/components/LoadingOverlay/LoadingOverlay";
import {useRequest} from "@/hooks/useRequest";
import {useRouter} from "next/navigation";
export function Form() {
  const {isLoading, processRequest} = useRequest()
  const router = useRouter()

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = await processRequest(async () => dataProcessApiService.process({ text: e.currentTarget.message.value }))
    router.push(`/results/${result}`)
  }, [processRequest, router])

  const handleFileUpload = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const result = await processRequest(async () => dataProcessApiService.upload(formData))
    router.push(`/results/${result}`)
  }, [processRequest, router])

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex h-72">
          <TextArea />
        </div>

        <div className="flex items-center justify-end space-x-4">
          <Button type="submit">Отправить</Button>
          <FileUploader onChange={handleFileUpload}/>
        </div>
      </form>

      {isLoading && <LoadingOverlay />}
    </div>
  )
}