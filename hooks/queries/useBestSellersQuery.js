import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/services/products/productsService";
import { queryKeys } from "@/lib/queryKeys";

export function useBestSellers() {
  return useQuery({
    queryKey: queryKeys.products.bestSellers(),
    queryFn: productsService.getBestSellers,
    staleTime: 1000 * 60 * 10, // 10 minutes - best sellers change infrequently
  });
}
