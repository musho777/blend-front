import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/services/orders/orderService";
import { queryKeys } from "@/lib/queryKeys";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: () => {
      // Invalidate and refetch orders list
      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.all,
      });
      // Note: Cart clearing and modal closing will be handled in CheckoutForm component
    },
    onError: (error) => {
      console.error("Order creation failed:", error);
    },
  });
}
