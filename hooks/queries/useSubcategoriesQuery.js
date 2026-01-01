import { useQuery } from "@tanstack/react-query";
import { subcategoriesService } from "@/services/subcategories/subcategoriesService";
import { queryKeys } from "@/lib/queryKeys";

export function useSubcategories() {
  return useQuery({
    queryKey: queryKeys.subcategories.lists(),
    queryFn: subcategoriesService.getSubcategories,
    staleTime: 1000 * 60 * 10, // 10 minutes - subcategories don't change frequently
  });
}

export function useSubcategoriesByCategory(categoryId) {
  return useQuery({
    queryKey: queryKeys.subcategories.byCategory(categoryId),
    queryFn: () => subcategoriesService.getSubcategoriesByCategory(categoryId),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 10,
  });
}
