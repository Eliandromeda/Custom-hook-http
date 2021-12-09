import { useCallback, useState } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const setRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body:  requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      if (!response?.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      applyData(data);

    } catch (error) {
      setError(error.message || "Something went wrong!");
    }
    setIsLoading(false);
  },[]);

  return {
    isLoading,
    error,
    setRequest
   };
};

export default useHttp;
