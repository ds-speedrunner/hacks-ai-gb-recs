import {baseApiService} from "@/services/api/base.api.service";
import {DataProcessRequest, DataProcessResponse} from "@/services/api/data_process/data_process.api.types";

export const dataProcessApiService = {
  getById: async (id: string): Promise<DataProcessResponse> => {
    return baseApiService.get(`/results/${id}`)
  },
  process: async (data: DataProcessRequest): Promise<string> => {
    return baseApiService.post(`/process_data`, data)
  },
  upload: async (data: FormData): Promise<string> => {
    return baseApiService.post(`/upload_file`, data)
  }
} as const