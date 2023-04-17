import { useState, useEffect } from "react";


//Create a type to shape the data object
type GeolocationData = {
  latitude?: number;
  longitude?: number;
  altitude?: number;
  accuracy?: number;
  altitudeAccuracy?: number;
  heading?: number;
  speed?: number;
}

//Create a type to shape the state object
type GeolocationState = {
  loading: boolean;
  error?: Error;
  data: GeolocationData;
}

export default function useGeolocation(options?: PositionOptions): GeolocationState {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const successHandler = (e: GeolocationPosition) => {
      setLoading(false);
      setError(undefined);
      setData(e.coords);
    }
    const errorHandler = (e: GeolocationPositionError) => {
      setError(new Error(e.message));
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    )
    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    )
    return () => navigator.geolocation.clearWatch(id)
  }, [options])

  return { loading, error, data };
}