import {
  useReducer,
  useCallback,
  Reducer
} from "react";
import { useSafeDispatch } from "./useSafeDispatch";

export const FETCH_STATUS = {
  pending: "pending",
  resolved: "resolved",
  idle: "idle",
  rejected: "rejected"
} as const;

export type FetchStatus = typeof FETCH_STATUS[keyof typeof FETCH_STATUS];
type ResolvedFetch = typeof FETCH_STATUS.resolved;

type FetchAction<T> =
  | {
      type: Exclude<FetchStatus, ResolvedFetch>
    }
  | { type: ResolvedFetch; data: T }


export type FetchState<T> =
  | {
      status: Exclude<FetchStatus, ResolvedFetch>
      data: null;
    }
  | {
      status: ResolvedFetch;
      data: T;
    }


function fetchReducer<T>(
  state: FetchState<T>,
  action: FetchAction<T>
): FetchState<T> {
  switch (action.type) {
    case FETCH_STATUS.pending:
      return { status: FETCH_STATUS.pending, data: null };
    case FETCH_STATUS.resolved:
      return { status: FETCH_STATUS.resolved, data: action.data };
    default:
      return state;
  }
}

function useFetch<T = unknown>(initialData: Record<string, unknown> = {}) {
  const [state, dispatch] = useReducer<
    Reducer<FetchState<T>, FetchAction<T>>
  >(fetchReducer, {
    status: FETCH_STATUS.idle,
    data: null,
    ...initialData
  });

  // const dispatch = useSafeDispatch<FetchAction<T>>(unsafeDispatch);
  const call = useCallback(
    (url) => {
      dispatch({ type: FETCH_STATUS.pending });
      fetch(url).then(
        (response: Response) => response.json().then((data: T) => {
          dispatch({ type: FETCH_STATUS.resolved, data});
        }),
      );
    },
    [dispatch]
  );
  return [state, call] as const;
}

export default useFetch;
