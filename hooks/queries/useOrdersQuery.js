import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/services/orders/orderService";
import { queryKeys } from "@/lib/queryKeys";

/**
 * Hook to fetch user's order history
 * Requires authentication - will be used in protected routes
 */
export function useMyOrders() {
  return useQuery({
    queryKey: [...queryKeys.orders.all, "my-orders"],
    queryFn: orderService.getMyOrders,
    staleTime: 1000 * 60 * 5, // 5 minutes - orders can change
  });
}

/**
 * Hook to fetch a single order by ID
 */
export function useOrderById(id) {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => orderService.getOrder(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
