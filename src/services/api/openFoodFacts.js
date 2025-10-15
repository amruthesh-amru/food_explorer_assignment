import apiClient from './config';
import {
    API_ENDPOINTS,
    SEARCH_PARAMS,
    SEARCH_FIELDS,
    PRODUCT_FIELDS,
} from '../../constants/api';

export const searchProducts = async ({
    search = '',
    page = 1,
    pageSize = SEARCH_PARAMS.DEFAULT_PAGE_SIZE,
    sortBy = SEARCH_PARAMS.DEFAULT_SORT_BY,
    categories = '',
    brands = '',
    nutriscoreGrade = '',
} = {}) => {
    try {
        const params = {
            search_terms: search,
            page,
            page_size: pageSize,
            sort_by: sortBy,
            json: true,
            fields: SEARCH_FIELDS,
        };

        if (categories) {
            params.tagtype_0 = 'categories';
            params.tag_contains_0 = 'contains';
            params.tag_0 = categories;
        }

        if (brands) {
            const offset = categories ? 1 : 0;
            params[`tagtype_${offset}`] = 'brands';
            params[`tag_contains_${offset}`] = 'contains';
            params[`tag_${offset}`] = brands;
        }

        if (nutriscoreGrade) {
            const offset = [categories, brands].filter(Boolean).length;
            params[`tagtype_${offset}`] = 'nutrition_grades';
            params[`tag_contains_${offset}`] = 'contains';
            params[`tag_${offset}`] = nutriscoreGrade.toLowerCase();
        }

        const response = await apiClient.get(API_ENDPOINTS.SEARCH, { params });

        return {
            products: response.data.products || [],
            count: response.data.count || 0,
            page: response.data.page || 1,
            pageSize: response.data.page_size || pageSize,
            totalPages: Math.ceil((response.data.count || 0) / pageSize),
        };
    } catch (error) {
        console.error('Error searching products:', error);
        throw new Error('Failed to search products. Please try again.');
    }
};

export const getProductByBarcode = async (barcode) => {
    try {
        if (!barcode) {
            throw new Error('Barcode is required');
        }

        const response = await apiClient.get(`${API_ENDPOINTS.PRODUCT}/${barcode}.json`);

        if (response.data.status === 0) {
            throw new Error('Product not found');
        }

        return response.data.product;
    } catch (error) {
        console.error('Error fetching product:', error);
        if (error.message === 'Product not found') {
            throw error;
        }
        throw new Error('Failed to fetch product details. Please try again.');
    }
};

export const getProductsByCategory = async (
    category,
    page = 1,
    pageSize = SEARCH_PARAMS.DEFAULT_PAGE_SIZE
) => {
    return searchProducts({
        categories: category,
        page,
        pageSize,
    });
};

export const getProductsByBrand = async (
    brand,
    page = 1,
    pageSize = SEARCH_PARAMS.DEFAULT_PAGE_SIZE
) => {
    return searchProducts({
        brands: brand,
        page,
        pageSize,
    });
};

export const getSearchSuggestions = async (query) => {
    if (!query || query.length < 2) {
        return [];
    }

    try {
        const response = await searchProducts({
            search: query,
            pageSize: 5,
        });

        return response.products.map((product) => ({
            code: product.code,
            name: product.product_name,
            brand: product.brands,
            imageUrl: product.image_small_url || product.image_url,
        }));
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return [];
    }
};

export const getPopularProducts = async (limit = 10) => {
    try {
        const response = await searchProducts({
            pageSize: limit,
            sortBy: 'popularity',
        });

        return response.products;
    } catch (error) {
        console.error('Error fetching popular products:', error);
        throw new Error('Failed to fetch popular products. Please try again.');
    }
};

export default {
    searchProducts,
    getProductByBarcode,
    getProductsByCategory,
    getProductsByBrand,
    getSearchSuggestions,
    getPopularProducts,
};
