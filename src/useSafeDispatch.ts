import { Dispatch, useCallback, useLayoutEffect, useRef } from "react";

export function useSafeDispatch<T>(dispatch: Dispatch<T>) {
    const mounted = useRef(false);

    useLayoutEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);

    return useCallback((arg:T) => (mounted.current ? dispatch(arg) : void 0), [
      dispatch
    ]);
  }