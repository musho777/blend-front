import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingService } from "@/services/booking/bookingService";
import { queryKeys } from "@/lib/queryKeys";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookingService.createBooking,
    onSuccess: () => {
      // Invalidate and refetch bookings list
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookings.all,
      });
    },
    onError: (error) => {
      console.error("Booking failed:", error);
    },
  });
}
