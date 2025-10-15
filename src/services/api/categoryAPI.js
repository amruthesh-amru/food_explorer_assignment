import apiClient from './config';
import { API_ENDPOINTS } from '../../constants/api';

export const getProductsByCategoryDirect = async (category) => {
    try {
        if (!category) {
            throw new Error('Category is required');
        }

        const response = await apiClient.get(`${API_ENDPOINTS.CATEGORY}/${category}.json`);

        if (!response.data || !response.data.products) {
            return {
                products: [],
                count: 0,
                page: 1,
                pageSize: 0,
                totalPages: 0,
            };
        }

        const products = response.data.products || [];
        const count = response.data.count || products.length;

        return {
            products,
            count,
            page: 1,
            pageSize: products.length,
            totalPages: 1,
            category: response.data.category,
        };
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw new Error('Failed to fetch products by category. Please try again.');
    }
};

export default {
    getProductsByCategoryDirect,
};
