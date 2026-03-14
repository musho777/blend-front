"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { handleDataError, checkNetworkStatus } from "@/utils/errorHandler";

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
            // Global error handler for all queries
            onError: (error, query) => {
              const errorInfo = handleDataError(error, `Query: ${query.queryKey.join('/')}`);

              // Show user-friendly toast notification
              if (!navigator.onLine) {
                toast.error('No internet connection. Please check your network.');
              } else {
                toast.error(error?.message || 'Failed to load data. Please try again.');
              }
            },
          },
          mutations: {
            retry: 0, // Don't retry mutations to prevent duplicate orders
            // Global error handler for all mutations
            onError: (error, variables, context, mutation) => {
              handleDataError(error, `Mutation: ${mutation.options.mutationKey?.join('/') || 'unknown'}`);

              // Show user-friendly error
              toast.error(error?.message || 'Action failed. Please try again.');
            },
          },
        },
      })
  );

  // Network status monitoring (especially useful for mobile)
  useEffect(() => {
    const handleOnline = () => {
      console.log('✅ Network: Back online');
      toast.success('Connection restored!');
      // Refetch all active queries when coming back online
      queryClient.refetchQueries({ type: 'active' });
    };

    const handleOffline = () => {
      console.warn('⚠️ Network: Offline');
      toast.error('You are offline. Some features may not work.');
    };

    // Initial network check
    const network = checkNetworkStatus();
    if (!network.online) {
      handleOffline();
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      )}
    </QueryClientProvider>
  );
}
