// OpenFoodFacts API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://world.openfoodfacts.org',
  TIMEOUT: 10000,
  HEADERS: {
    'User-Agent': 'FoodOrderApp/1.0',
  },
};

// API Endpoints
export const API_ENDPOINTS = {
  SEARCH: '/cgi/search.pl',
  PRODUCT: '/api/v0/product', // Using v0 as per official docs
  CATEGORY: '/category', // For category-specific queries
};

// Search Parameters
export const SEARCH_PARAMS = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DEFAULT_SORT_BY: 'popularity',
};

// Sort options for search
export const SORT_OPTIONS = {
  POPULARITY: 'popularity',
  PRODUCT_NAME: 'product_name',
  CREATED_DATE: 'created_t',
  UPDATED_DATE: 'last_modified_t',
};

// Fields to return in search results
export const SEARCH_FIELDS = [
  'code',
  'product_name',
  'brands',
  'image_url',
  'image_small_url',
  'nutriscore_grade',
  'nova_group',
  'ecoscore_grade',
  'categories',
  'quantity',
  'nutriments',
  'serving_size',
  'allergens',
  'ingredients_text',
].join(',');

// Product detail fields
export const PRODUCT_FIELDS = [
  'code',
  'product_name',
  'generic_name',
  'brands',
  'categories',
  'labels',
  'quantity',
  'serving_size',
  'image_url',
  'image_front_url',
  'image_nutrition_url',
  'image_ingredients_url',
  'nutriscore_grade',
  'nutriscore_score',
  'nova_group',
  'ecoscore_grade',
  'ecoscore_score',
  'nutriments',
  'ingredients',
  'ingredients_text',
  'allergens',
  'traces',
  'additives_tags',
  'nutrition_grades',
  'stores',
  'countries',
].join(',');

