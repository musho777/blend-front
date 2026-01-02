import { useQuery } from "@tanstack/react-query";
import { bannersService } from "@/services/banners/bannersService";
import { queryKeys } from "@/lib/queryKeys";

export function useBanners() {
  return useQuery({
    queryKey: queryKeys.banners.lists(),
    queryFn: bannersService.getBanners,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
