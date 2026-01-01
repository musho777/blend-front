import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "@/services/categories/categoriesService";
import { queryKeys } from "@/lib/queryKeys";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.lists(),
    queryFn: categoriesService.getCategories,
    staleTime: 1000 * 60 * 10, // 10 minutes - categories don't change frequently
  });
}
