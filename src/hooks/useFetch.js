import { useEffect, useRef, useState, useMemo } from "react";
import { useAuth } from "../contexts/AuthProvider";

const useFetch = ({ url, headers = {}, enabled = true, useCache = true }) => {
  const control = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const { logoutAction } = useAuth();

  const memoizedHeaders = useMemo(() => headers, [JSON.stringify(headers)]);

  const getData = async () => {
    // Security: Reduced logging to prevent data exposure

    if (control.current) {
      control.current.abort();
    }

    const controller = new AbortController();
    control.current = controller;

    setIsLoading(true);
    setError(null);

    const cachedData = localStorage.getItem(url);
    const cacheTimestamp = localStorage.getItem(`${url}_timestamp`);
    const cacheExpiry = 1000 * 60 * 5; // 5 minutes
    const localVersion = localStorage.getItem(`${url}_version`);

    if (url.includes("type=shopInventory")) {
      const newUrl = new URL(url);

      newUrl.searchParams.set("type", "shopInventoryVersion");

      const response = await fetch(newUrl.toString(), {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const { cacheVersion: serverVersion } = await response.json();

      if (cachedData && useCache && Date.now() - cacheTimestamp < cacheExpiry && parseInt(localVersion, 10) === parseInt(serverVersion, 10)) {
        setData(JSON.parse(cachedData));
        setIsLoading(false);
        return;
      }
    }
    else{
      if (cachedData && useCache && Date.now() - cacheTimestamp < cacheExpiry) {
      setData(JSON.parse(cachedData));
      setIsLoading(false);
      return;
    }
    }

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: memoizedHeaders,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.error === 'Invalid token') {
        return logoutAction(true);
      }

      setData((prev) =>
        JSON.stringify(prev) !== JSON.stringify(responseData) ? responseData : prev
      );

      if (useCache) {
        localStorage.setItem(url, JSON.stringify(responseData));
        localStorage.setItem(`${url}_timestamp`, Date.now().toString());

        if (url.includes("type=shopInventory")) {
          const newUrl = new URL(url);
          newUrl.searchParams.set("type", "shopInventoryVersion");
          const response = await fetch(newUrl.toString(), {
            signal: controller.signal,
          });
          const { cacheVersion: serverVersion } = await response.json();
          localStorage.setItem(`${url}_version`, serverVersion);
        }
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error during fetch:", err);
        setError(err.message || "An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Security: Reduced logging to prevent data exposure
    if (enabled) {
      getData();
    }

    return () => {
      if (control.current) {
        control.current.abort();
      }
    };
  }, [url, memoizedHeaders, enabled, useCache]);

  return { data, isLoading, error };
};


export default useFetch;
