import { Dispatch, useCallback, useLayoutEffect, useRef } from "react";

export function useSafeDispatch<T>(dispatch: Dispatch<T>) {
    const mounted = useRef(false);

    useLayoutEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);

    return useCallback((arg:T) => {
      if(mounted.current) {
        dispatch(arg)
      }
    }, [dispatch]);
  }