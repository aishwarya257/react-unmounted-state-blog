import { useReducer, useCallback, Reducer, useRef, useEffect } from "react";
import {
  FetchAction,
  fetchReducer,
  FetchState,
  FETCH_STATUS
} from "./useFetch";
import { useSafeDispatch } from "./useSafeDispatch";

function useCancelableFetch<T = unknown>(
  initialData: Record<string, unknown> = {}
) {
  const [state, unsafeDispatch] = useReducer<
    Reducer<FetchState<T>, FetchAction<T>>
  >(fetchReducer, {
    status: FETCH_STATUS.idle,
    data: null,
    ...initialData
  });
  const controllerRef = useRef(new AbortController());
  useEffect(() => {
    const controller = controllerRef.current;
    console.log(controller.signal.aborted, "Signal on mount");
    return () => {
      controller.abort();
      console.log(controller.signal.aborted, "Signal on unmount");
    };
  }, []);

  const dispatch = useSafeDispatch<FetchAction<T>>(unsafeDispatch);
  const call = useCallback(
    async (url) => {
      const controller = controllerRef.current;
      dispatch({ type: FETCH_STATUS.pending });
      try {
        const response = await fetch(url, { signal: controller.signal });
        const data = await response.json();
        dispatch({ type: FETCH_STATUS.resolved, data });
      } catch (e) {
        console.log(controller.signal.aborted);
        console.log(e);
      }
    },
    [dispatch]
  );
  return [state, call] as const;
}

export default useCancelableFetch;
