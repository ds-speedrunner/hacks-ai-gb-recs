import {baseApiService} from "@/services/api/base.api.service";
import {DataProcessRequest, DataProcessResponse} from "@/services/api/data_process/data_process.api.types";

export const dataProcessApiService = {
  process: async (data: DataProcessRequest): Promise<DataProcessResponse> => {
    return baseApiService.post(`/process_data`, data)
  },
  upload: async (data: FormData): Promise<DataProcessResponse> => {
    return baseApiService.post(`/upload_file`, data)
  }
} as const