import { useState, useEffect } from 'react';

//Generic type T is used to define the type of the value stored in the localStorage
//initialValue is the value that will be used if there is no value in the localStorage
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  //use the generic type T to define the type of the value stored in the localStorage
  //set initial value using a function
  //check if key exists in localStorage, if it does, parse as type T
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  });

  //we use useEffect here to make sure that stored values in localStorage are synchronized with the state
  //we only want to update localStorage if the key or storedValue changes
  useEffect(() => { 
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}