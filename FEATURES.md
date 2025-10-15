# Food Order Assignment - Features Overview

## 🎯 Implemented Features

### 1. **Homepage with Product Grid** ✅

- Modern, responsive grid layout
- 24 products per page
- Product cards showing:
  - Product image
  - Product name and brand
  - Categories (up to 2)
  - Nutriscore grade with color coding
  - NOVA group indicator
  - Quantity information

### 2. **Advanced Search & Filtering** ✅

#### Text Search

- Debounced search (500ms delay)
- Real-time results as you type
- Search by product name, brand, or keywords
- Loading indicator during search

#### Barcode Search

- Dedicated barcode search input field
- Direct product lookup by barcode
- Instant navigation to product detail page
- Error handling for invalid/not found barcodes
- Example barcodes: 737628064502, 3017620422003
- Loading state with spinner

#### Filters

- **Category Filter**: 20+ food categories (Snacks, Beverages, Dairy, etc.)
- **Nutrition Grade Filter**: Filter by Nutriscore (A-E)
- **Clear All Filters**: One-click reset button

#### Sort Options

- Most Popular (default)
- Name (A-Z)
- Name (Z-A)
- Best Nutrition Grade (A to E)
- Worst Nutrition Grade (E to A)

### 3. **Pagination** ✅

- Page navigation with Previous/Next buttons
- Current page / Total pages indicator
- Smooth scroll to top on page change
- Disabled states for first/last page
- Page resets when filters change

### 4. **Product Detail Page** ✅

When clicking on a product, users are redirected to a detailed page showing:

#### Product Information

- Large product image
- Product name and brand
- Generic name (if available)
- Nutriscore grade badge
- Ecoscore grade badge
- NOVA group classification
- Quantity and serving size
- Product labels (Vegan, Gluten-free, etc.)

#### Nutritional Values (per 100g)

- Energy (kJ and kcal)
- Fat (including saturated fat)
- Carbohydrates (including sugars)
- Fiber
- Proteins
- Salt/Sodium

#### Ingredients

- Full ingredients list
- Allergens warning (highlighted in red)
- Traces information (highlighted in yellow)

#### Additional Information

- Categories
- Available stores
- Countries

### 5. **Shopping Cart Functionality** ✅ (Bonus)

#### Cart Features

- Add products to cart from detail page
- Adjust quantity before adding
- Persistent cart (saves to localStorage)
- Cart icon with item count badge
- Sliding cart sidebar

#### Cart Management

- View all cart items
- Increase/decrease item quantities
- Remove individual items
- Clear entire cart
- Visual feedback when adding items
- "Already in cart" indicator

#### Cart Display

- Product images
- Product names and brands
- Quantity controls (+/-)
- Delete button per item
- Total items count
- Checkout button (placeholder)

### 6. **Routing** ✅

- React Router DOM integration
- Routes:
  - `/` - Homepage
  - `/product/:barcode` - Product detail page
- Back to products navigation
- Click-to-navigate from product cards

### 7. **Responsive Design** ✅

#### Mobile (< 640px)

- Single column product grid
- Stacked filter controls
- Full-width cart sidebar
- Optimized touch targets
- Responsive typography

#### Tablet (640px - 1024px)

- 2-column product grid
- Side-by-side filter controls
- Responsive images

#### Desktop (> 1024px)

- 3-4 column product grid
- Horizontal filter bar
- Fixed cart width (384px)
- Optimal spacing

### 8. **OpenFoodFacts API Integration** ✅

#### Endpoints Used

- `/cgi/search.pl` - Search products
- `/api/v0/product/{barcode}.json` - Get product details
- Category and nutrition grade filtering

#### Features

- Axios HTTP client
- Request/response interceptors
- Error handling
- Loading states
- React Query for caching
- Debounced API calls

### 9. **State Management** ✅

- **React Query** for server state

  - Automatic caching (5 minutes stale time)
  - Background refetching
  - Optimistic updates
  - Loading and error states

- **React Context** for cart state
  - Global cart access
  - localStorage persistence
  - Cart calculations
  - Add/remove/update operations

### 10. **UI/UX Enhancements** ✅

#### Visual Design

- Gradient backgrounds
- Smooth animations and transitions
- Hover effects on cards
- Color-coded nutrition grades
- Loading spinners
- Empty states with helpful messages

#### User Feedback

- Success messages ("Added to Cart!")
- Error messages with retry options
- Loading indicators
- Disabled button states
- Item count badges

#### Accessibility

- Semantic HTML
- Proper button labels
- Keyboard navigation support
- Screen reader friendly
- ARIA attributes

---

## 📁 Project Structure

```
src/
├── components/
│   ├── HomePage.jsx              # Main homepage with grid
│   ├── ProductCard.jsx           # Reusable product card
│   ├── ProductDetailPage.jsx    # Detailed product view
│   ├── FilterBar.jsx             # Filters and sort controls
│   ├── Cart.jsx                  # Shopping cart sidebar
│   ├── ProductSearch.jsx         # Alternative search component
│   └── index.js                  # Component exports
│
├── context/
│   └── CartContext.jsx           # Cart state management
│
├── hooks/
│   └── useProducts.js            # React Query hooks
│
├── services/
│   └── api/
│       ├── config.js             # Axios configuration
│       ├── openFoodFacts.js      # API methods
│       ├── categoryAPI.js        # Category endpoints
│       └── index.js              # API exports
│
├── constants/
│   ├── api.js                    # API endpoints & config
│   └── categories.js             # Category & sort options
│
├── utils/
│   ├── formatters.js             # Data formatting helpers
│   └── sortProducts.js           # Client-side sorting
│
├── App.jsx                       # Router setup
└── main.jsx                      # App entry point
```

---

## 🚀 How to Use

### Browse Products

1. Visit the homepage
2. Browse 24 popular products
3. Use pagination to see more

### Search & Filter

1. **Text Search**: Type in the left search bar (debounced)
2. **Barcode Search**: Enter a barcode in the right search bar and click "Search"
   - Example barcodes to try: `737628064502`, `3017620422003`
   - Instantly navigates to product detail page
3. Select a category from dropdown
4. Filter by nutrition grade
5. Sort results by name or grade
6. Click "Clear All" to reset

### View Product Details

1. Click on any product card
2. View comprehensive product information
3. See nutritional values and ingredients
4. Check for allergens and labels

### Add to Cart

1. On product detail page
2. Adjust quantity with +/- buttons
3. Click "Add to Cart"
4. View cart from any page (cart icon in header)

### Manage Cart

1. Click cart icon to open sidebar
2. Adjust quantities with +/-
3. Remove items with trash icon
4. Clear entire cart or proceed to checkout

---

## 🎨 Design Features

### Color Coding

- **Nutriscore Grades**:

  - A = Green (healthiest)
  - B = Light green
  - C = Yellow
  - D = Orange
  - E = Red (least healthy)

- **Ecoscore Grades**: Similar color scheme for environmental impact

### Typography

- Headers: Bold, large, hierarchical
- Body: Readable, proper line height
- Labels: Medium weight, uppercase for grades

### Spacing

- Consistent padding and margins
- Card-based layouts
- Proper whitespace

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px - 1280px
- **Large Desktop**: > 1280px

---

## 🔧 Technical Stack

- **React 19** - UI library
- **React Router DOM 7** - Client-side routing
- **React Query 5** - Server state management
- **Axios** - HTTP client
- **Tailwind CSS 3** - Styling
- **Lucide React** - Icons
- **Vite 7** - Build tool
- **ESLint 9** - Linting

---

## ✨ Bonus Features Implemented

1. ✅ **Shopping Cart** - Full cart functionality with persistence
2. ✅ **Barcode Search** - Direct product lookup by barcode
3. ✅ **Debounced Search** - Optimized API calls
4. ✅ **Client-side Sorting** - Instant results
5. ✅ **localStorage** - Cart persistence across sessions
6. ✅ **Loading States** - Better UX with spinners
7. ✅ **Error Handling** - Graceful error messages
8. ✅ **Responsive Images** - Optimized for all devices
9. ✅ **Smooth Animations** - Professional polish

---

## 🎯 All Requirements Met

- ✅ Homepage with product grid
- ✅ Product cards with key information
- ✅ Search functionality (text + barcode)
- ✅ Category filter dropdown
- ✅ Sort functionality
- ✅ Pagination
- ✅ Product detail page with all required info
- ✅ Routing between pages
- ✅ Responsive design (mobile & desktop)
- ✅ **Cart functionality (BONUS)**
- ✅ **Barcode search (BONUS)**

---

## 🚦 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173` to see the application!
