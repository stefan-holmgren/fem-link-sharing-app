import { useCallback, useEffect, useState, useTransition } from "react";

type UseAsyncDataProps<T> = {
  fetchFn: () => Promise<T>;
  autoFetch?: boolean;
};

export const useAsyncData = <T>({ fetchFn, autoFetch = true }: UseAsyncDataProps<T>) => {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<unknown | undefined>();
  const [isPending, startTransition] = useTransition();

  const refetch = useCallback(() => {
    startTransition(async () => {
      try {
        setError(undefined);
        setData(await fetchFn());
      } catch (err) {
        setError(err);
      }
    });
  }, [fetchFn]);

  useEffect(() => {
    if (autoFetch) {
      refetch();
    }
  }, [autoFetch, refetch]);

  return { data, isPending, error, refetch };
};
