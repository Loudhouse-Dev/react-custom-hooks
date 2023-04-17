import { useState, useCallback } from 'react';

/* We need to define the return type of useMap. 
It is an array containing a Map and an object with three functions.
The Genereics K and V are used to define the type of the key and value of the Map.
*/

type UseMapReturnType<K, V> = [
  Map<K, V>,
  {
    set: (key: K, value: V) => void;
    remove: (key: K) => void;
    clear: () => void;
  }
];

function useMap<K, V>(initialValue: Map<K, V>): UseMapReturnType<K, V> {
  const [map, setMap] = useState(initialValue);

  const set = useCallback((key: K, value: V) => {
    setMap((prevMap) => new Map(prevMap).set(key, value));
  }, []);

  const remove = useCallback((key: K) => {
    setMap((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  const clear = useCallback(() => {
    setMap(new Map());
  }, []);

  return [map, { set, remove, clear }];
}