import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    searchProducts,
    getProductByBarcode,
    getProductsByCategory,
    getProductsByBrand,
    getSearchSuggestions,
    getPopularProducts,
} from '../services/api/openFoodFacts';
import { queryKeys } from '../config/queryClient';

export const useSearchProducts = (searchParams, options = {}) => {
    return useQuery({
        queryKey: queryKeys.products.search(searchParams),
        queryFn: () => searchProducts(searchParams),
        enabled: !!searchParams.search || Object.keys(searchParams).length > 1,
        ...options,
    });
};

export const useProduct = (barcode, options = {}) => {
    return useQuery({
        queryKey: queryKeys.products.detail(barcode),
        queryFn: () => getProductByBarcode(barcode),
        enabled: !!barcode,
        ...options,
    });
};

export const useProductsByCategory = (category, page = 1, options = {}) => {
    return useQuery({
        queryKey: queryKeys.products.category(category, page),
        queryFn: () => getProductsByCategory(category, page),
        enabled: !!category,
        ...options,
    });
};

export const useProductsByBrand = (brand, page = 1, options = {}) => {
    return useQuery({
        queryKey: queryKeys.products.brand(brand, page),
        queryFn: () => getProductsByBrand(brand, page),
        enabled: !!brand,
        ...options,
    });
};

export const useSearchSuggestions = (query, options = {}) => {
    return useQuery({
        queryKey: queryKeys.products.suggestions(query),
        queryFn: () => getSearchSuggestions(query),
        enabled: query && query.length >= 2,
        staleTime: 1 * 60 * 1000,
        ...options,
    });
};

export const usePopularProducts = (limit = 10, options = {}) => {
    return useQuery({
        queryKey: queryKeys.products.popular(limit),
        queryFn: () => getPopularProducts(limit),
        staleTime: 30 * 60 * 1000,
        ...options,
    });
};

export const usePrefetchProduct = () => {
    const queryClient = useQueryClient();

    return (barcode) => {
        queryClient.prefetchQuery({
            queryKey: queryKeys.products.detail(barcode),
            queryFn: () => getProductByBarcode(barcode),
        });
    };
};

export const useProductSearch = () => {
    return useMutation({
        mutationFn: searchProducts,
    });
};
