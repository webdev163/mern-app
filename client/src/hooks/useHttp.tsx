import {useState, useCallback} from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const request = useCallback(async (url: string, method: string = 'GET', body: null | any = null, headers: HeadersInit = {}) => {
    setLoading(true);
    try {
      if (body) {
        body = JSON.stringify(body);
        // @ts-ignore
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(url, {method, body, headers});
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      setLoading(false);

      return data;
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error.message);
    }
  }, [])

  const clearError = useCallback(() => {
      setError(null);
  }, [])

  return {loading, request, error, clearError}
}