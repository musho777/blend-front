import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/services/products/productsService";
import { queryKeys } from "@/lib/queryKeys";

export function useProductsByCategory(categoryId, page = 1, limit = 10, subcategoryId = null) {
  return useQuery({
    queryKey: queryKeys.products.byCategory(categoryId, page, limit, subcategoryId),
    queryFn: () => productsService.getProductsByCategory(categoryId, page, limit, subcategoryId),
    enabled: !!categoryId, // Only run query if categoryId is provided
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
