import { Filter, SortAsc, Award } from "lucide-react";
import {
  POPULAR_CATEGORIES,
  SORT_OPTIONS,
  NUTRISCORE_OPTIONS,
} from "../constants/categories";

const FilterBar = ({
  selectedCategory,
  onCategoryChange,
  selectedNutriscore,
  onNutriscoreChange,
  selectedSort,
  onSortChange,
  resultsCount,
}) => {
  return (
    <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-lg border-2 border-gray-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
          <div className="flex-1 min-w-[200px]">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Filter className="w-3.5 h-3.5 text-white" />
              </div>
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 bg-white text-gray-700 font-medium shadow-sm hover:shadow-md transition-all"
            >
              {POPULAR_CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
              <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Award className="w-3.5 h-3.5 text-white" />
              </div>
              Nutrition Grade
            </label>
            <select
              value={selectedNutriscore}
              onChange={(e) => onNutriscoreChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400 bg-white text-gray-700 font-medium shadow-sm hover:shadow-md transition-all"
            >
              {NUTRISCORE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <SortAsc className="w-3.5 h-3.5 text-white" />
              </div>
              Sort By
            </label>
            <select
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 bg-white text-gray-700 font-medium shadow-sm hover:shadow-md transition-all"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {resultsCount !== null && resultsCount !== undefined && (
          <div className="text-sm text-gray-700 font-bold whitespace-nowrap bg-gradient-to-r from-blue-100 to-purple-100 px-5 py-3 rounded-xl border-2 border-blue-200">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {resultsCount}
            </span>{" "}
            {resultsCount === 1 ? "product" : "products"} found
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
