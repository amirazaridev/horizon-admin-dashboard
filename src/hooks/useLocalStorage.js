import { useEffect, useState } from "react";

export default function useLocalStorage(initialState, key) {
  const [value, setValue] = useState(() => {
    const valueLS = localStorage.getItem(key);
    return valueLS ? JSON.parse(valueLS) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
