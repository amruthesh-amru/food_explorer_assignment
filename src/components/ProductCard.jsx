import {
  formatProductName,
  formatBrand,
  getProductImage,
  getNutriscoreColor,
  formatCategories,
} from "../utils/formatters";

const ProductCard = ({ product, onClick }) => {
  const categories = formatCategories(product.categories, 2);

  return (
    <div
      onClick={() => onClick?.(product)}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02] border border-gray-100"
    >
      <div className="relative h-56 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <img
          src={getProductImage(product)}
          alt={formatProductName(product)}
          className="max-h-full max-w-full object-contain p-4 transform group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/200x200?text=No+Image";
          }}
        />

        {product.nutriscore_grade && (
          <div className="absolute top-3 right-3 transform group-hover:scale-110 transition-transform duration-200">
            <div
              className={`${getNutriscoreColor(
                product.nutriscore_grade
              )} w-14 h-14 rounded-full flex items-center justify-center shadow-xl ring-4 ring-white`}
            >
              <span className="text-white font-bold text-xl uppercase">
                {product.nutriscore_grade}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors">
          {formatProductName(product)}
        </h3>

        <p className="text-sm text-blue-600 mb-4 font-semibold">
          {formatBrand(product.brands)}
        </p>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          {product.quantity && (
            <div className="text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
              <span className="font-semibold">Qty:</span> {product.quantity}
            </div>
          )}

          {product.nova_group && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 font-medium">NOVA</span>
              <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xs">
                  {product.nova_group}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
