import { useCallback, useEffect } from "react";

function useLocalstorage(storeName, initialData) {
  if (!storeName || initialData === undefined) {
    throw new Error("useLocalstorage: storeName and initialData are required.");
  }

  const key = storeName?.toString?.();

  const setStore = useCallback(
    (data) => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (err) {
        throw new Error(`useLocalstorage: Failed to set item: ${err.message}`);
      }
    },
    [key]
  );

  const removeStore = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      throw new Error(`Error while removing localstorage item: ${err.message}`);
    }
  }, [key]);

  const getStore = useCallback(() => {
    try {
      const store = localStorage.getItem(key);

      return store ? JSON.parse(store) : null;
    } catch (err) {
      throw new Error(`Error while getting localstorage item: ${err.message}`);
    }
  }, [key]);

  const clearAllStore = () => {
    localStorage.clear();
  };

  useEffect(() => {
    const existing = localStorage.getItem(key);

    if (!existing) {
      setStore(initialData);
    }
  }, [setStore]);

  return {
    setStore,
    getStore,
    removeStore,
    clearAllStore,
  };
}

export default useLocalstorage;
