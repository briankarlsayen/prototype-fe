import { useState, useEffect } from "react";

const useLocalStorage = (key: string, initialVal: string) => {
  const [storedVal, setStoredVal] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialVal;
    } catch (error) {
      console.log("error", error);
      return initialVal;
    }
  });
  useEffect(() => {
    try {
      const valToStore =
        typeof storedVal === "function" ? storedVal(storedVal) : storedVal;
      window.localStorage.setItem(key, JSON.stringify(valToStore));
    } catch (error) {
      console.log("error", error);
    }
  }, [key, storedVal]);

  return [storedVal, setStoredVal];
};

export default useLocalStorage;
