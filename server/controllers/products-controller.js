const productsService = require("../service/products-service");

const ApiError = require("../exceptions/api-error");

class ProductsController {
	async getProducts(req, res, next) {
		try {
			const products = await productsService.getAllProducts();
			return res.json(products);
		} catch (err) {
			next(err);
		}
	}

	async getFilteredProductsByCategory(req, res, next) {
		try {
			const { mainCategory, secondaryCategory, skinTypeCategory } = req.query;
			const filter = {};

			if (mainCategory) {
				filter["category.main"] = { $in: mainCategory };
			}
			if (secondaryCategory) {
				filter["category.secondary"] = { $in: secondaryCategory };
			}
			if (skinTypeCategory) {
				filter["category.skinType"] = { $in: skinTypeCategory };
			}

			if (Object.keys(filter).length === 0) {
				throw ApiError.BadRequest(
					"Не получены критерии по которым нужно проводить фильтрацию товаров.",
				);
			}

			const filteredData = await productsService.getFilteredProductsByCategory(filter);
			return res.json(filteredData);
		} catch (err) {
			next(err);
		}
	}

	async getBestSellingProducts(req, res, next) {
		try {
			const { sells, productsCount } = req.query;

			const bestSellingProducts = await productsService.getBestSellingProducts({
				sells,
				productsCount,
			});
			return res.json(bestSellingProducts);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new ProductsController();
