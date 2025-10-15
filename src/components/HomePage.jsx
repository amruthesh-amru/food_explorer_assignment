import { useState, useEffect, useMemo } from "react";
import { Search, Sparkles, TrendingUp, Loader2, Barcode } from "lucide-react";
import { useSearchProducts } from "../hooks/useProducts";
import { getProductByBarcode } from "../services/api";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import Cart from "./Cart";
import { sortProducts } from "../utils/sortProducts";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [barcodeQuery, setBarcodeQuery] = useState("");
  const [barcodeSearching, setBarcodeSearching] = useState(false);
  const [barcodeError, setBarcodeError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedNutriscore, setSelectedNutriscore] = useState("");
  const [selectedSort, setSelectedSort] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);

  const pageSize = 24;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const searchParams = useMemo(() => {
    const params = {
      page: currentPage,
      pageSize,
    };

    if (debouncedSearch.trim()) {
      params.search = debouncedSearch.trim();
    }

    if (selectedCategory) {
      params.categories = selectedCategory;
    }

    if (selectedNutriscore) {
      params.nutriscoreGrade = selectedNutriscore;
    }

    if (selectedSort === "popularity") {
      params.sortBy = "popularity";
    }

    return params;
  }, [
    debouncedSearch,
    selectedCategory,
    selectedNutriscore,
    selectedSort,
    currentPage,
  ]);

  const {
    data: searchResults,
    isLoading,
    isError,
    isFetching,
  } = useSearchProducts(searchParams, {
    enabled: true,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (searchResults?.products) {
      setAllProducts(searchResults.products);
    }
  }, [searchResults]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedNutriscore, selectedSort, debouncedSearch]);

  const sortedProducts = useMemo(() => {
    return sortProducts(allProducts, selectedSort);
  }, [allProducts, selectedSort]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleBarcodeSearch = async (e) => {
    e.preventDefault();
    if (!barcodeQuery.trim()) {
      setBarcodeError("Please enter a barcode");
      return;
    }

    setBarcodeSearching(true);
    setBarcodeError("");

    try {
      const product = await getProductByBarcode(barcodeQuery.trim());
      if (product) {
        navigate(`/product/${barcodeQuery.trim()}`);
      }
    } catch {
      setBarcodeError(
        "Product not found. Please check the barcode and try again."
      );
    } finally {
      setBarcodeSearching(false);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    setSelectedCategory("");
    setSelectedNutriscore("");
    setSelectedSort("popularity");
    setCurrentPage(1);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.code}`);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextPage = () => {
    if (searchResults && currentPage < searchResults.totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const hasActiveFilters =
    debouncedSearch ||
    selectedCategory ||
    selectedNutriscore ||
    selectedSort !== "popularity";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Food Explorer
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  🌟 Discover nutritious food products
                </p>
              </div>
            </div>

            <Cart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <form onSubmit={handleSearch} className="relative group">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, brand, or category..."
                  className="w-full pl-12 pr-24 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all text-gray-700 placeholder-gray-400 bg-white shadow-sm hover:shadow-md"
                />
                {isFetching && (
                  <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  </div>
                )}
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-all shadow-sm"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </form>

            <form onSubmit={handleBarcodeSearch} className="relative group">
              <div className="relative">
                <Barcode className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-600 transition-colors" />
                <input
                  type="text"
                  value={barcodeQuery}
                  onChange={(e) => {
                    setBarcodeQuery(e.target.value);
                    setBarcodeError("");
                  }}
                  placeholder="Search by barcode (e.g., 737628064502)..."
                  className={`w-full pl-12 pr-24 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-700 placeholder-gray-400 bg-white shadow-sm hover:shadow-md ${
                    barcodeError
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-200 focus:ring-purple-500 focus:border-purple-400"
                  }`}
                />
                <button
                  type="submit"
                  disabled={barcodeSearching}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-purple-400 disabled:to-pink-400 text-white rounded-lg text-sm font-medium transition-all shadow-md flex items-center gap-1"
                >
                  {barcodeSearching ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Search"
                  )}
                </button>
              </div>
              {barcodeError && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1 animate-shake">
                  <span>⚠️</span> {barcodeError}
                </p>
              )}
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {hasActiveFilters ? "Filtered Products" : "Popular Products"}
          </h2>
        </div>

        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedNutriscore={selectedNutriscore}
          onNutriscoreChange={setSelectedNutriscore}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          resultsCount={searchResults?.count}
        />

        {isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[500px]">
            <div className="relative mb-6">
              <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div
                className="absolute inset-0 w-20 h-20 border-4 border-purple-200 border-b-purple-600 rounded-full animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1s",
                }}
              ></div>
            </div>
            <p className="text-gray-700 font-semibold text-lg">
              Loading delicious products...
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Fetching nutritious foods for you ✨
            </p>
          </div>
        )}

        {isError && (
          <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">😕</span>
            </div>
            <p className="text-red-900 font-bold text-xl mb-2">
              Oops! Something went wrong
            </p>
            <p className="text-red-700 text-sm mb-4">
              We couldn't load the products. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && sortedProducts && (
          <>
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <Search className="w-12 h-12 text-blue-500" />
                </div>
                <p className="text-gray-800 text-2xl font-bold mb-2">
                  No products found
                </p>
                <p className="text-gray-600 text-base mb-6 max-w-md mx-auto">
                  We couldn't find any products matching your criteria. Try
                  adjusting your filters or search terms.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product.code}
                      product={product}
                      onClick={handleProductClick}
                    />
                  ))}
                </div>

                {searchResults && searchResults.totalPages > 1 && (
                  <div className="mt-12 flex flex-col items-center gap-6">
                    <div className="text-sm font-semibold text-gray-700 bg-white px-6 py-3 rounded-full shadow-md">
                      Page <span className="text-blue-600">{currentPage}</span>{" "}
                      of{" "}
                      <span className="text-purple-600">
                        {searchResults.totalPages}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-gray-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none"
                      >
                        ← Previous
                      </button>
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage >= searchResults.totalPages}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      <footer className="mt-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <p className="text-center text-sm font-medium">
                Built With ❤️ By{" "}
                <a
                  href="https://amruthesh.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline hover:text-blue-100 transition-colors"
                >
                  Amruthesh
                </a>
              </p>
            </div>
            <p className="text-xs text-blue-100">
              Discover, explore, and make healthier food choices 🥗
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
