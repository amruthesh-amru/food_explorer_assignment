import { QueryClient } from '@tanstack/react-query';


export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Time before cached data is considered stale
            staleTime: 5 * 60 * 1000, // 5 minutes

            // Time before inactive queries are garbage collected
            gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)

            // Retry failed requests
            retry: 1,

            // Don't refetch on window focus by default
            refetchOnWindowFocus: false,

            // Don't refetch on reconnect by default
            refetchOnReconnect: false,

            // Don't refetch on mount by default
            refetchOnMount: false,
        },
        mutations: {
            // Retry failed mutations
            retry: 1,
        },
    },
});

// Query keys for consistent cache management
export const queryKeys = {
    // Product queries
    products: {
        all: ['products'],
        search: (params) => ['products', 'search', params],
        detail: (barcode) => ['products', 'detail', barcode],
        category: (category, page) => ['products', 'category', category, page],
        brand: (brand, page) => ['products', 'brand', brand, page],
        popular: (limit) => ['products', 'popular', limit],
        suggestions: (query) => ['products', 'suggestions', query],
    },
};

export default queryClient;

