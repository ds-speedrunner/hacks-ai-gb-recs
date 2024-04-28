import {useState} from "react";

interface UseRequest {
  isLoading: boolean
  processRequest: <T,>(request: () => Promise<T>) => Promise<T>
}

export function useRequest(): UseRequest {
  const [isLoading, setIsLoading] = useState(false)

  const processRequest = async (request: () => Promise<any>) => {
    setIsLoading(true)
    const result = await request()
    setIsLoading(false)
    return result
  }

  return {
    isLoading,
    processRequest
  }
}