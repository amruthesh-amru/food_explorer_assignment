import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Check,
  AlertCircle,
  Leaf,
  Award,
  Package,
} from "lucide-react";
import { useState } from "react";
import { useProduct } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import {
  formatProductName,
  formatBrand,
  getProductImage,
  getNutriscoreColor,
  getEcoscoreColor,
  getNovaGroupLabel,
  formatNutrient,
  formatAllergens,
} from "../utils/formatters";

const ProductDetailPage = () => {
  const { barcode } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(barcode);
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setQuantity(1);
      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 2000);
    }
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div
              className="absolute inset-0 w-20 h-20 border-4 border-purple-200 border-b-purple-600 rounded-full animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "1s" }}
            ></div>
          </div>
          <p className="text-gray-700 font-bold text-lg mt-6">
            Loading product details...
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Please wait while we fetch the information ✨
          </p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center border-2 border-gray-200">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-8 text-base">
            We couldn't find the product you're looking for. It may have been
            removed or the link is incorrect.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const inCart = isInCart(product.code);
  const cartQuantity = getItemQuantity(product.code);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-all font-semibold group"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center group-hover:from-blue-200 group-hover:to-purple-200 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Back to Products</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 lg:p-10">
            <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-10 border-2 border-gray-100">
              <img
                src={getProductImage(product)}
                alt={formatProductName(product)}
                className="max-w-full max-h-96 object-contain drop-shadow-2xl"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x400?text=No+Image";
                }}
              />
            </div>

            <div className="flex flex-col">
              <div className="inline-block mb-3">
                <p className="text-blue-600 font-bold text-sm bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
                  {formatBrand(product.brands)}
                </p>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 leading-tight">
                {formatProductName(product)}
              </h1>

              {product.generic_name && (
                <p className="text-gray-600 mb-4">{product.generic_name}</p>
              )}

              <div className="flex flex-wrap gap-3 mb-6">
                {product.nutriscore_grade && (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 rounded-xl border-2 border-green-200">
                    <Award className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-bold text-gray-700">
                      Nutriscore:
                    </span>
                    <span
                      className={`${getNutriscoreColor(
                        product.nutriscore_grade
                      )} text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase shadow-md`}
                    >
                      {product.nutriscore_grade}
                    </span>
                  </div>
                )}

                {product.ecoscore_grade && (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3 rounded-xl border-2 border-blue-200">
                    <Leaf className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-bold text-gray-700">
                      Ecoscore:
                    </span>
                    <span
                      className={`${getEcoscoreColor(
                        product.ecoscore_grade
                      )} text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase shadow-md`}
                    >
                      {product.ecoscore_grade}
                    </span>
                  </div>
                )}

                {product.nova_group && (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-3 rounded-xl border-2 border-purple-200">
                    <Package className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-bold text-gray-700">
                      NOVA:
                    </span>
                    <span className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold shadow-md">
                      {getNovaGroupLabel(product.nova_group)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                {product.quantity && (
                  <div>
                    <span className="font-medium">Quantity:</span>{" "}
                    {product.quantity}
                  </div>
                )}
                {product.serving_size && (
                  <div>
                    <span className="font-medium">Serving Size:</span>{" "}
                    {product.serving_size}
                  </div>
                )}
              </div>

              {product.labels && (
                <div className="mb-8">
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    🏷️ Labels
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.labels
                      .split(",")
                      .slice(0, 6)
                      .map((label, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-full text-xs font-bold border border-green-200"
                        >
                          {label.trim().replace(/^en:/, "")}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-6 border-t-2 border-gray-200">
                {inCart && (
                  <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-green-800 font-bold">
                        ✓ Currently in cart:
                      </p>
                      <p className="text-lg text-green-700 font-bold">
                        {cartQuantity} {cartQuantity === 1 ? "item" : "items"}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2 border-2 border-gray-200">
                      <button
                        onClick={decrementQuantity}
                        className="w-11 h-11 rounded-lg bg-white border-2 border-gray-300 flex items-center justify-center hover:bg-blue-50 hover:border-blue-400 transition-all shadow-sm"
                      >
                        <Minus className="w-5 h-5 text-gray-700" />
                      </button>
                      <span className="w-14 text-center font-bold text-xl text-gray-900">
                        {quantity}
                      </span>
                      <button
                        onClick={incrementQuantity}
                        className="w-11 h-11 rounded-lg bg-white border-2 border-gray-300 flex items-center justify-center hover:bg-blue-50 hover:border-blue-400 transition-all shadow-sm"
                      >
                        <Plus className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      {showAddedMessage ? (
                        <>
                          <Check className="w-6 h-6" />
                          Added to Cart!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-6 h-6" />
                          {inCart ? "Add More" : "Add to Cart"}
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    {inCart
                      ? `Adding ${quantity} more ${
                          quantity === 1 ? "item" : "items"
                        } to your cart`
                      : `Adding ${quantity} ${
                          quantity === 1 ? "item" : "items"
                        } to cart`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-10 bg-gradient-to-br from-gray-50 to-blue-50">
            {product.nutriments && (
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  Nutritional Values
                </h2>
                <p className="text-sm text-gray-600 mb-6 font-medium">
                  Per 100g / 100ml
                </p>
                <div className="space-y-2">
                  {product.nutriments.energy_100g && (
                    <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                      <span className="text-gray-800 font-bold">Energy</span>
                      <span className="text-blue-700 font-bold">
                        {formatNutrient(product.nutriments.energy_100g, "kJ")}
                      </span>
                    </div>
                  )}
                  {product.nutriments["energy-kcal_100g"] && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">
                        Calories
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {formatNutrient(
                          product.nutriments["energy-kcal_100g"],
                          "kcal"
                        )}
                      </span>
                    </div>
                  )}
                  {product.nutriments.fat_100g !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">Fat</span>
                      <span className="text-gray-900 font-semibold">
                        {formatNutrient(product.nutriments.fat_100g, "g")}
                      </span>
                    </div>
                  )}
                  {product.nutriments["saturated-fat_100g"] !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 pl-4">
                      <span className="text-gray-600">Saturated Fat</span>
                      <span className="text-gray-800">
                        {formatNutrient(
                          product.nutriments["saturated-fat_100g"],
                          "g"
                        )}
                      </span>
                    </div>
                  )}
                  {product.nutriments.carbohydrates_100g !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">
                        Carbohydrates
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {formatNutrient(
                          product.nutriments.carbohydrates_100g,
                          "g"
                        )}
                      </span>
                    </div>
                  )}
                  {product.nutriments.sugars_100g !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100 pl-4">
                      <span className="text-gray-600">Sugars</span>
                      <span className="text-gray-800">
                        {formatNutrient(product.nutriments.sugars_100g, "g")}
                      </span>
                    </div>
                  )}
                  {product.nutriments.fiber_100g !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">Fiber</span>
                      <span className="text-gray-900 font-semibold">
                        {formatNutrient(product.nutriments.fiber_100g, "g")}
                      </span>
                    </div>
                  )}
                  {product.nutriments.proteins_100g !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">
                        Proteins
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {formatNutrient(product.nutriments.proteins_100g, "g")}
                      </span>
                    </div>
                  )}
                  {product.nutriments.salt_100g !== undefined && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700 font-medium">Salt</span>
                      <span className="text-gray-900 font-semibold">
                        {formatNutrient(product.nutriments.salt_100g, "g")}
                      </span>
                    </div>
                  )}
                  {product.nutriments.sodium_100g !== undefined && (
                    <div className="flex justify-between items-center py-2 pl-4">
                      <span className="text-gray-600">Sodium</span>
                      <span className="text-gray-800">
                        {formatNutrient(product.nutriments.sodium_100g, "g")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">📝</span>
                Ingredients
              </h2>
              {product.ingredients_text ? (
                <p className="text-gray-700 leading-relaxed text-base bg-gray-50 p-4 rounded-xl border border-gray-200">
                  {product.ingredients_text}
                </p>
              ) : (
                <p className="text-gray-500 italic bg-gray-50 p-4 rounded-xl">
                  Ingredients information not available
                </p>
              )}

              {product.allergens && (
                <div className="mt-6 p-5 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-xl shadow-md">
                  <h3 className="font-bold text-red-900 mb-3 text-lg flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    Allergens
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formatAllergens(product.allergens).map(
                      (allergen, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-bold shadow-md"
                        >
                          {allergen}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {product.traces && (
                <div className="mt-4 p-5 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl shadow-md">
                  <h3 className="font-bold text-yellow-900 mb-3 text-lg flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    May contain traces of
                  </h3>
                  <p className="text-yellow-900 text-sm font-semibold">
                    {product.traces
                      .split(",")
                      .map((t) => t.trim().replace(/^en:/, ""))
                      .join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {(product.categories || product.stores || product.countries) && (
            <div className="p-8 lg:p-10 border-t-2 border-gray-200 bg-gradient-to-br from-white to-gray-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-3xl">ℹ️</span>
                Additional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {product.categories && (
                  <div className="bg-white p-6 rounded-2xl border-2 border-blue-200 shadow-md">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                      <span className="text-xl">🏷️</span>
                      Categories
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {product.categories
                        .split(",")
                        .slice(0, 5)
                        .map((c) => c.trim().replace(/^en:/, ""))
                        .join(", ")}
                    </p>
                  </div>
                )}
                {product.stores && (
                  <div className="bg-white p-6 rounded-2xl border-2 border-green-200 shadow-md">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                      <span className="text-xl">🏪</span>
                      Available at
                    </h3>
                    <p className="text-gray-700 text-sm">{product.stores}</p>
                  </div>
                )}
                {product.countries && (
                  <div className="bg-white p-6 rounded-2xl border-2 border-purple-200 shadow-md">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center gap-2">
                      <span className="text-xl">🌍</span>
                      Countries
                    </h3>
                    <p className="text-gray-700 text-sm">
                      {product.countries
                        .split(",")
                        .slice(0, 3)
                        .map((c) => c.trim().replace(/^en:/, ""))
                        .join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
