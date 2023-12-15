const { validationResult } = require("express-validator");

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

	async getMostWatchedProducts(req, res, next) {
		try {
			const { views, productsCount } = req.query;

			const mostWatchedProducts = await productsService.getMostWatchedProducts({
				views,
				productsCount,
			});

			return res.json(mostWatchedProducts);
		} catch (err) {
			next(err);
		}
	}

	async getRecentlyWatchedProducts(req, res, next) {
		try {
			const { userId, productsCount } = req.query;

			const recentlyWatchedProducts = await productsService.getRecentlyWatchedProducts({
				userId,
				productsCount,
			});

			return res.json(recentlyWatchedProducts);
		} catch (err) {
			next(err);
		}
	}

	async updateRecentlyWatchedProducts(req, res, next) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Ошибка при валидации.", errors.array()));
			}

			const { userId, productsCount, currentlyWatchedProduct } = req.body;

			const recentlyWatchedProducts = await productsService.updateRecentlyWatchedProducts({
				userId,
				productsCount,
				currentlyWatchedProduct,
			});

			return res.json(recentlyWatchedProducts);
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

	async updateProductViews(req, res, next) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Ошибка при валидации.", errors.array()));
			}

			const { productId } = req.body;

			const updatedProduct = await productsService.updateProductViews({ productId });

			return res.json(updatedProduct);
		} catch (err) {
			next(err);
		}
	}

	async createNewProduct(req, res, next) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Ошибка при валидации.", errors.array()));
			}

			const {
				productName,
				productComponents,
				productDescription,
				productUsage,
				productImageSmall,
				productImageMedium,
				productImageLarge,
				mainType,
				secondaryType,
				skinType,
				productPrice,
				productQuantity,
			} = req.body;

			const normalizedProductPrice = productPrice.trim().split(",");
			const normalizedProductQuantity = productQuantity.trim().split(",");
			const skins = skinType
				.trim()
				.split(",")
				.map((skin) => skin.toLowerCase());

			const normalizedSkinType = [];

			for (const skin of skins) {
				if (skin === "сухая кожа") {
					normalizedSkinType.push("skin-dry");
				} else if (skin === "нормальная кожа") {
					normalizedSkinType.push("skin-normal");
				} else if (skin === "жирная кожа") {
					normalizedSkinType.push("skin-fat");
				} else if (skin === "комбинированная кожа") {
					normalizedSkinType.push("skin-combined");
				}
			}

			const newProduct = await productsService.createNewProduct({
				name: productName,
				components: productComponents,
				description: productDescription,
				usage: productUsage,
				imageSmall: productImageSmall,
				imageMedium: productImageMedium,
				imageLarge: productImageLarge,
				mainType,
				secondaryType,
				skinType: normalizedSkinType,
				price: normalizedProductPrice,
				quantity: normalizedProductQuantity,
			});

			return res.json(newProduct);
		} catch (err) {
			next(err);
		}
	}

	async deleteExistingProduct(req, res, next) {
		try {
			const { productName, productId } = req.query;

			const deletedProduct = await productsService.deleteExistingProduct({
				name: productName,
				id: productId,
			});

			return res.json(deletedProduct);
		} catch (err) {
			next(err);
		}
	}

	async updateExistingProductData(req, res, next) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Ошибка при валидации.", errors.array()));
			}

			const {
				productId,
				productName,
				productComponents,
				productDescription,
				productUsage,
				productImageSmall,
				productImageMedium,
				productImageLarge,
				mainType,
				secondaryType,
				skinType,
				productPrice,
				productQuantity,
			} = req.body;

			const normalizedProductPrice = productPrice.trim().split(",");
			const normalizedProductQuantity = productQuantity.trim().split(",");
			const skins = skinType
				.trim()
				.split(",")
				.map((skin) => skin.toLowerCase());

			const normalizedSkinType = [];

			for (const skin of skins) {
				if (skin === "сухая кожа") {
					normalizedSkinType.push("skin-dry");
				} else if (skin === "нормальная кожа") {
					normalizedSkinType.push("skin-normal");
				} else if (skin === "жирная кожа") {
					normalizedSkinType.push("skin-fat");
				} else if (skin === "комбинированная кожа") {
					normalizedSkinType.push("skin-combined");
				}
			}

			const updatedProduct = await productsService.updateExistingProductData({
				id: productId,
				name: productName,
				components: productComponents,
				description: productDescription,
				usage: productUsage,
				imageSmall: productImageSmall,
				imageMedium: productImageMedium,
				imageLarge: productImageLarge,
				mainType,
				secondaryType,
				skinType: normalizedSkinType,
				price: normalizedProductPrice,
				quantity: normalizedProductQuantity,
			});

			return res.json(updatedProduct);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new ProductsController();
