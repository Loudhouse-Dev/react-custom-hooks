import { useState } from "react";

type UseArray<T> = {
  array: T[];
  set: (value: T[]) => void;
  push: (element: T) => void;
  filter: (callback: (value: T, index: number, array: T[]) => boolean) => void;
  update: (index: number, newElement: T) => void;
  remove: (index: number) => void;
  clear: () => void;
}

function useArray<T>(defaultValue: T[]): UseArray<T> {
  const [array, setArray] = useState<T[]>(defaultValue);

  function push(element: T) {
    setArray(arr => [...arr, element])
  }

  function filter(callback: (value: T, index: number, array: T[]) => boolean) {
    setArray((arr) => arr.filter(callback));
  }

  function update(index: number, newElement: T) {
    setArray(arr => [
      ...arr.slice(0, index),
      newElement,
      ...arr.slice(index + 1, arr.length - 1),
    ])
  }

  function remove(index: number) {
    setArray(arr => [...arr.slice(0, index), ...arr.slice(index + 1, arr.length - 1)])
  }

  function clear() {
    setArray([])
  }
  return { array, set: setArray, push, filter, update, remove, clear}
}