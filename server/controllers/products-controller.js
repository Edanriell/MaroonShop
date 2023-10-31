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

	async getFilteredProductsByCategories(req, res, next) {
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
				throw ApiError.BadRequest("Не получены критерии фильтрации товаров.");
			}

			const filteredData = await productsService.getFilteredProductsByCategories(filter);
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

	async getMostViewedProducts(req, res, next) {
		try {
			const { views, productsCount } = req.query;

			const mostViewedProducts = await productsService.getMostViewedProducts({
				views,
				productsCount,
			});

			return res.json(mostViewedProducts);
		} catch (err) {
			next(err);
		}
	}

	async getProductById(req, res, next) {
		try {
			const { productId } = req.query;

			if (productId.length === 0 || !productId) {
				throw ApiError.BadRequest("Передан неверный уникальный идентификатор товара.");
			}

			const product = await productsService.getProductById(productId);

			return res.json(product);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new ProductsController();
