import React, {useState, useEffect} from 'react';

export const useLocalStorage = (initialState, key) => {
  const get = () => {
    const storage = localStorage.getItem (key);
    if (storage) return JSON.parse (storage)[key];
    return initialState;
  };

  const [value, setValue] = useState (get ());
  useEffect (
    () => {
      localStorage.setItem (key, JSON.stringify ({value}));
    },
    [value]
  );

  return [value, setValue];
};
