import { useEffect, useRef, useState } from "react";

export function useFetchAdvanced(url, { immediate = true, retry = 1 } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);
  const triesRef = useRef(0);

  const fetchData = async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    setError(null);

    while (true) {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
        setLoading(false);
        return;
      } catch (err) {
        if (controller.signal.aborted) {
          setLoading(false);
          setError(new Error("Request aborted"));
          return;
        }
        if (triesRef.current < retry) {
          triesRef.current += 1;
          await new Promise((r) => setTimeout(r, 300 * triesRef.current));
          continue;
        } else {
          setError(err);
          setLoading(false);
          return;
        }
      }
    }
  };

  const abort = () => {
    controllerRef.current?.abort();
  };

  useEffect(() => {
    if (immediate) fetchData();
    return () => controllerRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, loading, error, refetch: fetchData, abort };
}
