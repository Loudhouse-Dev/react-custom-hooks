import { useEffect } from "react";
import useTimeout from "./useTimeout";

//We use this hook to delay an action, for example if we are using a text input to get info from
//an endpoint, we don't want to send a request with every keystroke. We can set a timer and after 1 second of inaction,
//send the request
export default function useDebounce(
  callback: () => void,
  delay: number, 
  dependencies: any[]
  ) {
  const { reset, clear } = useTimeout(callback, delay)
  
  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [])
}