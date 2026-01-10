import { useQuery } from "@tanstack/react-query";
import { offersService } from "@/services/offers/offersService";
import { queryKeys } from "@/lib/queryKeys";

export function useOffers() {
  return useQuery({
    queryKey: queryKeys.offers.lists(),
    queryFn: offersService.getOffers,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
