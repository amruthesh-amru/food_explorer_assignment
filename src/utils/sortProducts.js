export const sortProducts = (products, sortBy) => {
    if (!products || products.length === 0) return products;

    const productsCopy = [...products];

    switch (sortBy) {
        case "product_name":
            return productsCopy.sort((a, b) => {
                const nameA = (a.product_name || "").toLowerCase();
                const nameB = (b.product_name || "").toLowerCase();
                return nameA.localeCompare(nameB);
            });

        case "product_name_desc":
            return productsCopy.sort((a, b) => {
                const nameA = (a.product_name || "").toLowerCase();
                const nameB = (b.product_name || "").toLowerCase();
                return nameB.localeCompare(nameA);
            });

        case "nutriscore_asc":
            return productsCopy.sort((a, b) => {
                const gradeA = a.nutriscore_grade || "z";
                const gradeB = b.nutriscore_grade || "z";
                return gradeA.localeCompare(gradeB);
            });

        case "nutriscore_desc":
            return productsCopy.sort((a, b) => {
                const gradeA = a.nutriscore_grade || "";
                const gradeB = b.nutriscore_grade || "";
                if (!gradeA && !gradeB) return 0;
                if (!gradeA) return 1;
                if (!gradeB) return -1;
                return gradeB.localeCompare(gradeA);
            });

        case "popularity":
        default:
            return productsCopy;
    }
};
