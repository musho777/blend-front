import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/services/products/productsService";
import { queryKeys } from "@/lib/queryKeys";

export function useProduct(id) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productsService.getProductById(id),
    enabled: !!id, // Only run query if id is provided
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
