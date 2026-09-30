import { useState, useEffect, useCallback } from "react";

const URL = "https://jsonplaceholder.typicode.com/albums";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0); // bump to re-run the fetch (Retry)

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        setProjects(data.map(({ id, title }) => ({ id, title })));
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { projects, loading, error, retry };
}