'use client'

import {useEffect, useState} from "react";

export function useApiData<S>(endpoint: string) {
  const [apiData, setApiData] = useState<S>()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(endpoint)
      const apiData = await res.json()

      setApiData(apiData)
    }

    fetchData()
      .catch(console.error)
  }, [endpoint])

  return apiData
}