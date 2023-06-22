const express = require("express");
const { dirname } = require("path");
const fs = require("fs");

const router = express.Router();

const appDir = dirname(require.main.path);
const productsDataFilePath = `${appDir}/data/products.json`;

router.get("/", (req, res) => {
	// filters should be an object filters{secondary:[]; main:[] ..}
	const { filters } = req.query;
	console.log(filters);

	fs.readFile(productsDataFilePath, "utf8", (err, products) => {
		if (err) {
			console.error("Error reading file:", err);
			res.status(500).send("Error reading file");
			return;
		}

		try {
			const productsData = JSON.parse(products);
			const filteredProductsData = productsData.filter((product) => {
				// const secondaryCategoryMatch = filters.includes(product.category.secondary);
				// const skinTypeMatch = filters.some((filter) =>
				// 	product.category.skin.includes(filter),
				// );

				// if (filters.length === 0) return true;

				// if (secondaryCategoryMatch && (skinTypeMatch || !product.category.skin))
				// 	return true;

				// return false;
				// TODO FIX THIS TRASH CODE
				const mainCategoryFilters = filters["main-category"];
				const secondaryCategoryFilters = filters["secondary-category"];
				const skinTypeCategoryFilters = filters["skin-type-category"];
				// TODO FIX THIS TRASH CODE

				// TODO FIX THIS TRASH CODE
				const mainCategoryMatch =
					!mainCategoryFilters || mainCategoryFilters.includes(product.category.main);
				const secondaryCategoryMatch =
					!secondaryCategoryFilters ||
					secondaryCategoryFilters.includes(product.category.secondary);
				const skinTypeMatch =
					!skinTypeCategoryFilters ||
					skinTypeCategoryFilters.some((filter) =>
						product.category.skinType.includes(filter),
					);

				return mainCategoryMatch && secondaryCategoryMatch && skinTypeMatch;
				// TODO FIX THIS TRASH CODE
			});
			res.json(filteredProductsData);
			// console.log(filteredProductsData);
		} catch (err) {
			console.error("Error parsing JSON:", err);
			res.status(500).send("Error parsing JSON");
		}
	});
});

module.exports = router;
