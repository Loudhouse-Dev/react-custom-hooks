import { useEffect, useRef } from "react";

type EventType = keyof WindowEventMap;

export default function useEventListener<T extends EventType>(
  eventType: T,
  callback: (event: WindowEventMap[T]) => void,
  element: Window | null = window
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;

    const handler = (e: WindowEventMap[T]) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
}