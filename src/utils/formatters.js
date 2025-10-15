export const formatNutrient = (value, unit = 'g') => {
    if (value === undefined || value === null) return 'N/A';
    return `${Number(value).toFixed(1)} ${unit}`;
};

export const getNutriscoreColor = (grade) => {
    const colors = {
        a: 'bg-green-500',
        b: 'bg-lime-400',
        c: 'bg-yellow-400',
        d: 'bg-orange-400',
        e: 'bg-red-500',
    };
    return colors[grade?.toLowerCase()] || 'bg-gray-400';
};

export const getNovaGroupLabel = (novaGroup) => {
    const labels = {
        1: 'Unprocessed',
        2: 'Processed culinary',
        3: 'Processed',
        4: 'Ultra-processed',
    };
    return labels[novaGroup] || 'Unknown';
};

export const getEcoscoreColor = (grade) => {
    const colors = {
        a: 'bg-green-600',
        b: 'bg-lime-500',
        c: 'bg-yellow-500',
        d: 'bg-orange-500',
        e: 'bg-red-600',
    };
    return colors[grade?.toLowerCase()] || 'bg-gray-400';
};

export const formatProductName = (product) => {
    if (product.product_name) return product.product_name;
    if (product.generic_name) return product.generic_name;
    return 'Unknown Product';
};

export const formatBrand = (brands) => {
    if (!brands) return 'Unknown Brand';
    return brands.split(',')[0].trim();
};

export const formatCategories = (categories, limit = 3) => {
    if (!categories) return [];
    return categories
        .split(',')
        .map((cat) => cat.trim())
        .slice(0, limit);
};

export const hasProductImage = (product) => {
    return !!(product.image_url || product.image_front_url);
};

export const getProductImage = (product) => {
    return (
        product.image_url ||
        product.image_front_url ||
        product.image_small_url ||
        'https://via.placeholder.com/200x200?text=No+Image'
    );
};

export const formatAllergens = (allergens) => {
    if (!allergens) return [];
    return allergens
        .split(',')
        .map((allergen) => allergen.replace(/^en:/, '').replace(/-/g, ' ').trim())
        .filter(Boolean);
};

export const getCaloriesPer100g = (nutriments) => {
    if (!nutriments) return 0;
    return nutriments['energy-kcal_100g'] || nutriments['energy_100g'] / 4.184 || 0;
};

export const formatServingSize = (servingSize) => {
    if (!servingSize) return 'N/A';
    return servingSize;
};

export const checkDietaryInfo = (ingredients) => {
    const ingredientsText = JSON.stringify(ingredients || []).toLowerCase();

    const meatKeywords = ['meat', 'chicken', 'beef', 'pork', 'fish', 'seafood'];
    const animalKeywords = [...meatKeywords, 'milk', 'egg', 'honey', 'cheese', 'butter'];

    const hasMeat = meatKeywords.some((keyword) => ingredientsText.includes(keyword));
    const hasAnimalProducts = animalKeywords.some((keyword) => ingredientsText.includes(keyword));

    return {
        isVegetarian: !hasMeat,
        isVegan: !hasAnimalProducts,
    };
};
