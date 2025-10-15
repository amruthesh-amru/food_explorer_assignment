import { useState } from "react";
import { useSearchProducts } from "../hooks/useProducts";
import {
  formatProductName,
  formatBrand,
  getProductImage,
  getNutriscoreColor,
} from "../utils/formatters";

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useState({});

  const { data, isLoading, isError, error } = useSearchProducts(searchParams);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery, page: 1 });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Search</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for food products..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Search
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Searching products...</p>
        </div>
      )}

      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          <p className="font-medium">Error:</p>
          <p>{error.message}</p>
        </div>
      )}

      {data && data.products && (
        <div>
          <div className="mb-4 text-gray-600">
            Found {data.count} products (showing page {data.page} of{" "}
            {data.totalPages})
          </div>

          {data.products.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                No products found. Try a different search term.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.products.map((product) => (
                <div
                  key={product.code}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={getProductImage(product)}
                      alt={formatProductName(product)}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/200x200?text=No+Image";
                      }}
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                      {formatProductName(product)}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {formatBrand(product.brands)}
                    </p>

                    {product.nutriscore_grade && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Nutriscore:
                        </span>
                        <span
                          className={`${getNutriscoreColor(
                            product.nutriscore_grade
                          )} text-white px-3 py-1 rounded-full text-xs font-bold uppercase`}
                        >
                          {product.nutriscore_grade}
                        </span>
                      </div>
                    )}

                    {product.quantity && (
                      <p className="text-sm text-gray-600">
                        Quantity: {product.quantity}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {data.totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <button
                onClick={() =>
                  setSearchParams({
                    ...searchParams,
                    page: Math.max(1, data.page - 1),
                  })
                }
                disabled={data.page === 1}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-blue-100 rounded-lg">
                Page {data.page} of {data.totalPages}
              </span>
              <button
                onClick={() =>
                  setSearchParams({
                    ...searchParams,
                    page: Math.min(data.totalPages, data.page + 1),
                  })
                }
                disabled={data.page >= data.totalPages}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
