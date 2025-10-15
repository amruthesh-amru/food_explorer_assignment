# OpenFoodFacts API Endpoints Reference

This document shows how our application uses the official OpenFoodFacts API endpoints.

## Base URL

```
https://world.openfoodfacts.org/
```

## 📌 Endpoints Used

### 1. **Search Products by Name**

**Official Endpoint:**

```
GET /cgi/search.pl?search_terms={name}&json=true
```

**Our Implementation:**

- File: `src/services/api/openFoodFacts.js`
- Function: `searchProducts()`
- Example:

```javascript
searchProducts({ search: "chocolate", page: 1, pageSize: 20 });
// Fetches: /cgi/search.pl?search_terms=chocolate&json=true&page=1&page_size=20
```

**Parameters:**

- `search_terms` - Product name or keywords
- `json` - Set to `true` for JSON response
- `page` - Page number (starts at 1)
- `page_size` - Results per page (default: 20)
- `sort_by` - Sort option (e.g., 'popularity')
- `fields` - Comma-separated list of fields to return

**Response Structure:**

```json
{
  "products": [...],
  "count": 1234,
  "page": 1,
  "page_size": 20
}
```

---

### 2. **Get Product Details by Barcode**

**Official Endpoint:**

```
GET /api/v0/product/{barcode}.json
```

**Our Implementation:**

- File: `src/services/api/openFoodFacts.js`
- Function: `getProductByBarcode()`
- Example:

```javascript
getProductByBarcode("737628064502");
// Fetches: /api/v0/product/737628064502.json
```

**Example URL:**

```
https://world.openfoodfacts.org/api/v0/product/737628064502.json
```

**Response Structure:**

```json
{
  "status": 1,
  "product": {
    "code": "737628064502",
    "product_name": "...",
    "brands": "...",
    "image_url": "...",
    "nutriscore_grade": "a",
    "nutriments": { ... },
    ...
  }
}
```

**Notes:**

- Updated from `/api/v2/product` to `/api/v0/product` as per official docs
- Added `.json` extension for proper response format
- `status: 1` means product found, `status: 0` means not found

---

### 3. **Get Products by Category**

**Official Endpoint:**

```
GET /category/{category}.json
```

**Our Implementation:**

#### Option A: Using Category Endpoint (Direct)

- File: `src/services/api/categoryAPI.js`
- Function: `getProductsByCategoryDirect()`
- Example:

```javascript
getProductsByCategoryDirect("snacks");
// Fetches: /category/snacks.json
```

#### Option B: Using Search API (Current Default)

- File: `src/services/api/openFoodFacts.js`
- Function: `getProductsByCategory()`
- Uses the search API with category filter for pagination support

```javascript
getProductsByCategory("snacks", 1, 20);
// Uses: /cgi/search.pl with category filter
```

**Example URLs:**

```
https://world.openfoodfacts.org/category/snacks.json
https://world.openfoodfacts.org/category/beverages.json
https://world.openfoodfacts.org/category/dairy.json
```

---

## 🔧 Additional Features

### Category Filtering in Search

```javascript
searchProducts({
  categories: "snacks",
  nutriscoreGrade: "a",
  page: 1,
});
// Adds: tagtype_0=categories&tag_0=snacks&tagtype_1=nutrition_grades&tag_1=a
```

### Brand Filtering

```javascript
searchProducts({
  brands: "Nestle",
  page: 1,
});
// Adds: tagtype_0=brands&tag_0=Nestle
```

### Nutriscore Filtering

```javascript
searchProducts({
  nutriscoreGrade: "a",
  page: 1,
});
// Adds: tagtype_0=nutrition_grades&tag_0=a
```

---

## 📋 API Configuration

**File:** `src/constants/api.js`

```javascript
export const API_CONFIG = {
  BASE_URL: "https://world.openfoodfacts.org",
  TIMEOUT: 10000,
  HEADERS: {
    "User-Agent": "FoodOrderApp/1.0",
  },
};

export const API_ENDPOINTS = {
  SEARCH: "/cgi/search.pl",
  PRODUCT: "/api/v0/product", // ✅ Using v0 as per official docs
  CATEGORY: "/category", // ✅ Category-specific endpoint
};
```

---

## ✅ Compliance with Official API

Our implementation now fully complies with the official OpenFoodFacts API documentation:

1. ✅ **Search Endpoint**: `/cgi/search.pl?search_terms={name}&json=true`
2. ✅ **Product Endpoint**: `/api/v0/product/{barcode}.json` (updated from v2 to v0)
3. ✅ **Category Endpoint**: `/category/{category}.json` (added)
4. ✅ **JSON Format**: Using `json=true` parameter and `.json` extension
5. ✅ **User-Agent Header**: Set to 'FoodOrderApp/1.0'

---

## 🧪 Testing Examples

### Test Product Search

```bash
curl "https://world.openfoodfacts.org/cgi/search.pl?search_terms=chocolate&json=true&page=1&page_size=5"
```

### Test Product Details

```bash
curl "https://world.openfoodfacts.org/api/v0/product/737628064502.json"
```

### Test Category

```bash
curl "https://world.openfoodfacts.org/category/snacks.json"
```

---

## 📝 Notes

- All API calls include proper error handling
- Axios client configured with 10-second timeout
- Automatic retry logic for failed requests (1 retry)
- React Query caching for optimized performance
- Response data is normalized for consistent usage across the app
