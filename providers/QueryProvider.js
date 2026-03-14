"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryProvider({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes - menu items don't change frequently
            gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
            retry: 3, // Retry failed requests 3 times (better for unstable 5G)
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff: 1s, 2s, 4s
            refetchOnWindowFocus: false, // Better UX for food ordering apps
            refetchOnMount: true,
            refetchOnReconnect: (query) => query.state.dataUpdateCount === 0, // Only refetch on reconnect if no data yet
          },
          mutations: {
            retry: 0, // Don't retry mutations to prevent duplicate orders
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      )}
    </QueryClientProvider>
  );
}
