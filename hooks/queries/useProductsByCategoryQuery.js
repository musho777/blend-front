import { useQuery } from "@tanstack/react-query";
import { productsService } from "@/services/products/productsService";
import { queryKeys } from "@/lib/queryKeys";

export function useProductsByCategory(categoryId, page = 1, limit = 10, subcategoryId = null, search = null, sortBy = null, minPrice = null, maxPrice = null) {
  return useQuery({
    queryKey: queryKeys.products.byCategory(categoryId, page, limit, subcategoryId, search, sortBy, minPrice, maxPrice),
    queryFn: () => productsService.getProductsByCategory(categoryId, page, limit, subcategoryId, search, sortBy, minPrice, maxPrice),
    enabled: !!categoryId, // Only run query if categoryId is provided
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
