# OpenFoodFacts API Integration

This project includes a complete API service layer for integrating with the OpenFoodFacts API.

## 📁 Project Structure

```
src/
├── config/
│   └── queryClient.js         # React Query configuration
├── constants/
│   └── api.js                 # API constants and endpoints
├── services/
│   └── api/
│       ├── config.js          # Axios configuration
│       ├── openFoodFacts.js   # OpenFoodFacts API methods
│       └── index.js           # Service exports
├── hooks/
│   └── useProducts.js         # React Query hooks
├── utils/
│   └── formatters.js          # Data formatting utilities
└── components/
    └── ProductSearch.jsx      # Example component
```

## 🚀 Getting Started

### 1. Installation

Dependencies are already included in `package.json`:

- `axios` - HTTP client
- `@tanstack/react-query` - Data fetching and caching

### 2. Setup

The QueryClient provider is already configured in `src/main.jsx`:

```jsx
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/queryClient";

// Wraps your app
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>;
```

## 📖 Usage Examples

### Basic Product Search

```jsx
import { useSearchProducts } from "./hooks/useProducts";

function MyComponent() {
  const { data, isLoading, isError } = useSearchProducts({
    search: "chocolate",
    page: 1,
    pageSize: 20,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div>
      {data.products.map((product) => (
        <div key={product.code}>{product.product_name}</div>
      ))}
    </div>
  );
}
```

### Get Product by Barcode

```jsx
import { useProduct } from "./hooks/useProducts";

function ProductDetail({ barcode }) {
  const { data: product, isLoading } = useProduct(barcode);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.product_name}</h1>
      <img src={product.image_url} alt={product.product_name} />
      <p>Nutriscore: {product.nutriscore_grade}</p>
    </div>
  );
}
```

### Search with Filters

```jsx
import { useSearchProducts } from "./hooks/useProducts";

function FilteredSearch() {
  const { data } = useSearchProducts({
    search: "milk",
    categories: "dairy",
    nutriscoreGrade: "a",
    pageSize: 10,
  });

  // Render results...
}
```

### Get Popular Products

```jsx
import { usePopularProducts } from "./hooks/useProducts";

function HomePage() {
  const { data: products, isLoading } = usePopularProducts(10);

  return (
    <div>
      <h2>Popular Products</h2>
      {products?.map((product) => (
        <div key={product.code}>{product.product_name}</div>
      ))}
    </div>
  );
}
```

### Search Suggestions (Autocomplete)

```jsx
import { useState } from "react";
import { useSearchSuggestions } from "./hooks/useProducts";

function SearchBar() {
  const [query, setQuery] = useState("");
  const { data: suggestions } = useSearchSuggestions(query);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      {suggestions && suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion.code}>{suggestion.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## 🔧 API Functions

### Direct API Calls (without hooks)

```jsx
import {
  searchProducts,
  getProductByBarcode,
  getProductsByCategory,
  getProductsByBrand,
  getSearchSuggestions,
  getPopularProducts,
} from "./services/api";

// Search products
const results = await searchProducts({
  search: "pizza",
  page: 1,
  pageSize: 20,
});

// Get specific product
const product = await getProductByBarcode("3017620422003");

// Get by category
const categoryProducts = await getProductsByCategory("beverages", 1);

// Get by brand
const brandProducts = await getProductsByBrand("Nestle", 1);
```

## 🎨 Utility Functions

### Formatting Helpers

```jsx
import {
  formatProductName,
  formatBrand,
  getProductImage,
  getNutriscoreColor,
  getNovaGroupLabel,
  formatNutrient,
  formatAllergens,
} from "./utils/formatters";

// Format product data
const name = formatProductName(product);
const brand = formatBrand(product.brands);
const imageUrl = getProductImage(product);
const nutriscoreColor = getNutriscoreColor(product.nutriscore_grade);
const protein = formatNutrient(product.nutriments.proteins_100g, "g");
const allergens = formatAllergens(product.allergens);
```

## 📊 Available Hooks

| Hook                    | Purpose                      | Parameters                    |
| ----------------------- | ---------------------------- | ----------------------------- |
| `useSearchProducts`     | Search products              | `searchParams`, `options`     |
| `useProduct`            | Get product by barcode       | `barcode`, `options`          |
| `useProductsByCategory` | Get products in category     | `category`, `page`, `options` |
| `useProductsByBrand`    | Get products by brand        | `brand`, `page`, `options`    |
| `useSearchSuggestions`  | Get autocomplete suggestions | `query`, `options`            |
| `usePopularProducts`    | Get popular products         | `limit`, `options`            |
| `usePrefetchProduct`    | Prefetch product details     | -                             |

## 🔍 Search Parameters

```javascript
{
  search: string,           // Search query
  page: number,            // Page number (starts at 1)
  pageSize: number,        // Results per page (default: 20)
  sortBy: string,          // Sort option (default: 'popularity')
  categories: string,      // Filter by categories
  brands: string,          // Filter by brands
  nutriscoreGrade: string  // Filter by nutriscore (a, b, c, d, e)
}
```

## 📦 Product Data Structure

Products from the API include:

```javascript
{
  code: string,              // Barcode
  product_name: string,      // Product name
  brands: string,            // Brand names
  categories: string,        // Categories
  image_url: string,         // Main image
  nutriscore_grade: string,  // Nutriscore (a-e)
  nova_group: number,        // Nova group (1-4)
  ecoscore_grade: string,    // Ecoscore (a-e)
  nutriments: {              // Nutritional information
    energy_100g: number,
    proteins_100g: number,
    carbohydrates_100g: number,
    fat_100g: number,
    // ... more nutrients
  },
  allergens: string,         // Allergens
  ingredients_text: string,  // Ingredients list
  quantity: string,          // Product quantity
  serving_size: string       // Serving size
}
```

## ⚙️ Configuration

### React Query Settings

Edit `src/config/queryClient.js` to customize caching behavior:

```javascript
{
  staleTime: 5 * 60 * 1000,        // 5 minutes
  gcTime: 10 * 60 * 1000,          // 10 minutes
  retry: 1,                         // Retry failed requests once
  refetchOnWindowFocus: false,      // Don't refetch on focus
  refetchOnReconnect: false,        // Don't refetch on reconnect
}
```

### API Settings

Edit `src/constants/api.js` to customize API settings:

```javascript
export const API_CONFIG = {
  BASE_URL: "https://world.openfoodfacts.org",
  TIMEOUT: 10000, // Request timeout
  HEADERS: {
    "User-Agent": "FoodOrderApp/1.0",
  },
};
```

## 🎯 Example Component

A complete example component is available at `src/components/ProductSearch.jsx` demonstrating:

- Product search with pagination
- Loading states
- Error handling
- Product display with images and nutriscore
- Responsive design with Tailwind CSS

To use it in your app:

```jsx
import ProductSearch from "./components/ProductSearch";

function App() {
  return <ProductSearch />;
}
```

## 🌐 OpenFoodFacts API Documentation

For more information about the OpenFoodFacts API:

- Documentation: https://wiki.openfoodfacts.org/API
- API Reference: https://openfoodfacts.github.io/api-documentation/

## 🛠️ Development Tips

1. **Use React Query DevTools** (optional):

   ```bash
   npm install @tanstack/react-query-devtools
   ```

   Then add to your app:

   ```jsx
   import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

   <QueryClientProvider client={queryClient}>
     <App />
     <ReactQueryDevtools initialIsOpen={false} />
   </QueryClientProvider>;
   ```

2. **Prefetch data** for better UX:

   ```jsx
   const prefetchProduct = usePrefetchProduct();

   <div onMouseEnter={() => prefetchProduct(barcode)}>
     {/* Product card */}
   </div>;
   ```

3. **Custom error handling**:
   ```jsx
   const { data, error } = useSearchProducts(params, {
     onError: (error) => {
       console.error("Search failed:", error);
       // Show toast notification
     },
   });
   ```

## 📝 Notes

- All API calls include proper error handling
- Images have fallback URLs for missing product images
- Search queries are optimized with proper field selection
- Nutriscore and other scores include color-coded display helpers
- The service is fully typed and documented with JSDoc comments
