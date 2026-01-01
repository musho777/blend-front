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
            retry: 1, // Retry failed requests once
            refetchOnWindowFocus: false, // Better UX for food ordering apps
            refetchOnMount: true,
            refetchOnReconnect: true,
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
