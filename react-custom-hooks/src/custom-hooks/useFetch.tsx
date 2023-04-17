import { useState, useEffect, useReducer, useRef } from 'react';

//Need this type to define the shape of the state object in the reducer
type FetchState = {
  responseJSON: any;
  isLoading: boolean;
  error: any;
}

//this defines the shape of the action object that is passed to the reducer
type Action = {
  type: 'loading' | 'success' | 'error';
  responseJSON?: any;
  error?: any;
}

//use the FetchState type here to ensure that the reducer returns the correct type
function reducer(state: FetchState, action: Action): FetchState {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'success':
      return {responseJSON: action.responseJSON, isLoading: false, error: null};
    case 'error':
      return { responseJSON: null, isLoading: false, error: action.error };
    default:
      throw new Error('Action type not supported');
  }
}

function useFetch(url: string): FetchState {
  const [state, dispatch] = useReducer(reducer, {
    responseJSON: null,
    isLoading: false,
    error: null,
  });


  useEffect(() => {
    let shouldCancel = false;
  
    const fetchData = async () => {
      dispatch({ type: 'loading' });
  
      try {
        const response = await fetch(url);
        const newResponseJSON = await response.json();
        if (shouldCancel) return;
        dispatch({ type: 'success', responseJSON: newResponseJSON });
      } catch (newError) {
        if (shouldCancel) return;
        dispatch({ type: 'error', error: newError });
      }
    };
  
    fetchData();
  
    return () => {
      shouldCancel = true;
    };
  }, [url]);

  return state;
}