# Food Explorer

A modern food product explorer built with React that uses the OpenFoodFacts API to display nutritional information and product details.

## Tech Stack

- React 18 + Vite
- React Router DOM
- React Query (TanStack Query)
- Tailwind CSS
- Axios
- Lucide React Icons

## Features

- **Product Search**: Search products by name with debounced input
- **Barcode Lookup**: Direct product search using barcode
- **Filters**: Filter by category, nutrition grade, and sorting options
- **Product Details**: View complete nutritional information, ingredients, and allergens
- **Shopping Cart**: Add products to cart with persistent storage
- **Responsive Design**: Works on mobile, tablet, and desktop

## UI Improvements

### Design System

- Gradient backgrounds and glass-morphism effects
- Smooth animations and transitions
- Modern card-based layouts
- Responsive grid system

### Components Enhanced

- **HomePage**: Sticky header, custom loading spinner, enhanced search
- **ProductCard**: Hover effects, nutrition badges, category tags
- **Cart**: Slide-in modal with React Portals
- **ProductDetail**: Large typography, color-coded grades, quantity controls
- **FilterBar**: Icon badges, styled dropdowns, results counter

## Key Problems Solved

### 1. Cart Modal Visibility

**Problem**: Cart wasn't displaying properly

**Solution**: Implemented React Portals to render modal outside the normal DOM hierarchy

```javascript
return createPortal(modalContent, document.body);
```

### 2. Quantity Synchronization

**Problem**: Quantity controls weren't syncing with cart

**Solution**: Reset local state after adding to cart

```javascript
addToCart(product, quantity);
setQuantity(1); // Reset
```

### 3. Loading Spinner Centering

**Problem**: Spinner wasn't centered on page

**Solution**: Used `min-h-[500px]` instead of padding for proper vertical centering

## Project Structure

```
src/
├── components/         # React components
├── context/           # Cart context
├── hooks/             # Custom React Query hooks
├── services/api/      # API integration
├── utils/             # Helper functions
└── constants/         # App constants
```

## Performance Optimizations

- React Query caching (5-minute stale time)
- Debounced search (500ms delay)
- Memoized sorted products
- Image lazy loading with fallbacks

## Installation

```bash
npm install
npm run dev
```

## API Integration

Uses OpenFoodFacts API:

- Search: `/cgi/search.pl`
- Product Details: `/api/v0/product/{barcode}.json`
- Categories: `/category/{category}.json`

---

**Built with ❤️ by Amruthesh**
