const productsService = require("../service/products-service");

class ProductsController {
	async getProducts(req, res, next) {
		try {
			const products = await productsService.getAllProducts();
			return res.json(products);
		} catch (err) {
			next(err);
		}
	}

	async getFilteredProductsByParameters(req, res, next) {
		try {
			const { mainCategory, secondaryCategory, skinTypeCategory } = req.query;
			const filter = {};
			if (mainCategory) {
				filter["category.main"] = mainCategory;
			}

			// Conditionally add the secondaryCategory filter if it exists and is not empty
			if (secondaryCategory) {
				filter["category.secondary"] = secondaryCategory;
			}

			console.log(filter);
			console.log("filter passing");

			const filteredData = await productsService.getFilteredProductsByParameters(filter);
			return res.json(filteredData);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new ProductsController();
