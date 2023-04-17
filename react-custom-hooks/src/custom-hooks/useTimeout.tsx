import { useCallback, useEffect, useRef } from "react";

type TimeoutFunctions = {
  reset: () => void;
  clear: () => void;
}

export default function useTimeout(callback: () => void, delay: number): TimeoutFunctions {
  const callbackRef = useRef<() => void>(callback);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  //Every time delay changes we change our timeout
  const set = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay)
  }, [delay]);

  //
  const clear = useCallback(() => {
    timeoutRef.current && window.clearTimeout(timeoutRef.current)
  }, [])

  //When delay, set, or clear change, we clear our timeout and start it again
  useEffect(() => {
    set()
    return clear
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear }
}