import { useQuery } from "@tanstack/react-query";
import { menuService } from "@/services/menu/menuService";
import { queryKeys } from "@/lib/queryKeys";

// Hook for fetching all menu items
export function useMenuItems() {
  return useQuery({
    queryKey: queryKeys.menu.lists(),
    queryFn: menuService.getMenuItems,
    staleTime: 1000 * 60 * 10, // 10 minutes - menu items change infrequently
  });
}

// Hook for fetching menu by category
export function useMenuByCategory(category) {
  return useQuery({
    queryKey: queryKeys.menu.category(category),
    queryFn: () => menuService.getMenuByCategory(category),
    enabled: !!category, // Only fetch if category is provided
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

// Hook for fetching single menu item
export function useMenuItem(id) {
  return useQuery({
    queryKey: queryKeys.menu.detail(id),
    queryFn: () => menuService.getMenuItem(id),
    enabled: !!id, // Only fetch if id is provided
  });
}
