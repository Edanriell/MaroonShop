const { dirname } = require("path");
const fs = require("fs");

const ProductModel = require("../models/product-model");
const UserModel = require("../models/user-model");

const ProductDto = require("../dtos/product-dto");
const ApiError = require("../exceptions/api-error");

const appDir = dirname(require.main.path);
const productsDataFilePath = `${appDir}/data/products.json`;

class ProductsService {
	async getAllProducts() {
		const allProducts = await ProductModel.find();

		const products = [];

		if (allProducts.length === 0) {
			throw ApiError.NotFound("В базе данных не найдено ни одного товара.");
		}

		for (const product of allProducts) {
			products.push(new ProductDto(product));
		}

		return { products };
	}

	async createNewProduct({
		name,
		description,
		components,
		usage,
		imageSmall,
		imageMedium,
		imageLarge,
		mainType,
		secondaryType,
		skinType,
		price,
		quantity,
		views = 0,
		sells = 0,
	}) {
		const product = await ProductModel.findOne({ name });

		if (product) {
			throw ApiError.BadRequest(`Товар с именем ${name} уже существует.`);
		}

		const image = {
			sm: imageSmall,
			md: imageMedium,
			lg: imageLarge,
		};

		const category = {
			main: mainType,
			secondary: secondaryType,
			skinType: skinType,
		};

		const newProduct = await ProductModel.create({
			name,
			description,
			components,
			usage,
			category,
			image,
			price,
			quantity,
			views,
			sells,
		});

		const productDto = new ProductDto(newProduct);

		return {
			product: productDto,
		};
	}

	async updateExistingProductData({
		id,
		name,
		description,
		components,
		usage,
		imageSmall,
		imageMedium,
		imageLarge,
		mainType,
		secondaryType,
		skinType,
		price,
		quantity,
	}) {
		const updatedProductData = {
			name,
			description,
			components,
			usage,
			imageSmall,
			imageMedium,
			imageLarge,
			mainType,
			secondaryType,
			skinType,
			price,
			quantity,
		};

		const updatedProduct = await ProductModel.findOneAndUpdate(
			{ _id: id },
			{ $set: updatedProductData },
			{ new: true },
		);

		if (!updatedProduct) {
			throw ApiError.InternalServerError("Не удалось обновить данные товара.");
		}

		const productDto = new ProductDto(updatedProduct);

		return {
			product: productDto,
		};
	}

	async deleteExistingProduct({ name, id }) {
		try {
			const product = await ProductModel.findOne({ _id: id });

			if (!product) {
				throw ApiError.NotFound(`Товар с id: ${id} не найден.`);
			} else if (product.name !== name) {
				throw ApiError.NotFound("Указанно неверное имя товара.");
			}

			const deletedProduct = await ProductModel.findOneAndDelete({ _id: id });

			if (!deletedProduct) {
				throw ApiError.NotFound("Товар который вы хотите удалить не найден.");
			}

			return {
				deletedProduct,
			};
		} catch (err) {
			throw ApiError.InternalServerError("Не удалось удалить товар.");
		}
	}

	async getFilteredProductsByCategories(filter) {
		const filteredProducts = await ProductModel.find(filter);

		const products = [];

		for (const product of filteredProducts) {
			products.push(new ProductDto(product));
		}

		if (products.length === 0) {
			throw ApiError.NotFound(
				"По полученным критериям не удалось найти ни одного подходящего товара.",
			);
		}

		return {
			filteredProducts: products,
		};
	}

	async getProductById(productId) {
		const [product] = await ProductModel.find({ _id: productId });

		if (!product) {
			throw ApiError.NotFound(`Товар с уникальным идентификатором ${productId} не найден.`);
		}

		const productDto = new ProductDto(product);

		return {
			product: productDto,
		};
	}

	async getBestSellingProducts({ sells, productsCount }) {
		const filteredProducts = await ProductModel.find({ sells: { $gte: sells } });

		if (filteredProducts.length === 0) {
			throw ApiError.NotFound("Не найдено не одного бестселлера.");
		}

		const bestSellingProducts = [];

		for (const product of filteredProducts) {
			bestSellingProducts.push(new ProductDto(product));
		}

		const bestSellingProductsSortedSliced = bestSellingProducts
			.sort((a, b) => b.sells - a.sells)
			.slice(0, productsCount);

		return { bestSellingProducts: bestSellingProductsSortedSliced };
	}

	async getMostWatchedProducts({ views, productsCount }) {
		const filteredProducts = await ProductModel.find({ views: { $gte: views } });

		if (filteredProducts.length === 0) {
			throw ApiError.NotFound("Не найдено не одного самого просматриваемого товара.");
		}

		const mostWatchedProducts = [];

		for (const product of filteredProducts) {
			mostWatchedProducts.push(new ProductDto(product));
		}

		const mostWatchedProductsSortedSliced = mostWatchedProducts
			.sort((a, b) => b.views - a.views)
			.slice(0, productsCount);

		return { mostWatchedProducts: mostWatchedProductsSortedSliced };
	}

	async getRecentlyWatchedProducts({ userId, productsCount }) {
		const user = await UserModel.findOne({ _id: userId });

		if (!user) {
			throw ApiError.BadRequest(`Пользователь с ид ${userId} не найден.`);
		}

		const userData = await UserModel.findOne({ _id: userId }).populate(
			"recentlyWatchedProducts.product",
		);

		const recentlyWatchedProducts = userData.recentlyWatchedProducts
			.sort((a, b) => {
				if (a.userViewsCount !== b.userViewsCount) {
					return b.userViewsCount - a.userViewsCount;
				}
				return b.viewDate - a.viewDate;
			})
			.slice(0, productsCount);

		return { recentlyWatchedProducts };
	}

	async updateRecentlyWatchedProducts({ userId, productsCount, currentlyWatchedProduct }) {
		const user = await UserModel.findOne({ _id: userId });

		if (!user) {
			throw ApiError.BadRequest(`Пользователь с ид ${userId} не найден.`);
		}

		const currentlyWatchedProductIndex = user.recentlyWatchedProducts.findIndex((product) =>
			product.product.equals(currentlyWatchedProduct.id),
		);

		if (currentlyWatchedProductIndex !== -1) {
			const currentlyWatchedProduct =
				user.recentlyWatchedProducts[currentlyWatchedProductIndex];
			currentlyWatchedProduct.viewDate = new Date();
			currentlyWatchedProduct.userViewsCount += 1;
		} else {
			const newRecentlyWatchedProduct = {
				viewDate: new Date(),
				userViewsCount: 1,
				product: currentlyWatchedProduct.id,
			};

			user.recentlyWatchedProducts.push(newRecentlyWatchedProduct);
		}

		try {
			await user.save();

			const userData = await UserModel.findOne({ _id: userId }).populate(
				"recentlyWatchedProducts.product",
			);

			const recentlyWatchedProducts = userData.recentlyWatchedProducts
				.sort((a, b) => {
					if (a.userViewsCount !== b.userViewsCount) {
						return b.userViewsCount - a.userViewsCount;
					}
					return b.viewDate - a.viewDate;
				})
				.slice(0, productsCount);

			return { recentlyWatchedProducts };
		} catch (error) {
			throw ApiError.InternalServerError("Не удалось внести изменения в базу данных.");
		}
	}

	async updateProductViews({ productId }) {
		const product = await ProductModel.findOne({ _id: productId });

		if (!product) {
			throw ApiError.BadRequest(`Товар с ид ${userId} не найден.`);
		}

		product.views++;

		try {
			await product.save();

			return { product };
		} catch (error) {
			throw ApiError.InternalServerError("Не удалось обновить просмотры товара.");
		}
	}

	async initializeProducts() {
		const isDataAlreadyInitialized = await ProductModel.find();

		if (isDataAlreadyInitialized.length > 0) {
			console.error("Товары уже существуют в базе данных.");
			return;
		}

		fs.readFile(productsDataFilePath, "utf8", (err, products) => {
			if (err) {
				console.error("Ошибка чтения файла данных о товарах:", err);
				throw new Error("Неудалось прочитать данные.");
			}

			try {
				const productsData = JSON.parse(products);

				for (const product of productsData) {
					this.createNewProduct({
						name: product.name,
						description: product.description,
						components: product.components,
						usage: product.usage,
						category: product.category,
						image: product.image,
						price: product.price,
						quantity: product.quantity,
						views: product.views,
						sells: product.sells,
					});
				}

				console.log("Товары успешно добавлены в базу данных.");
			} catch (err) {
				console.error("Возникла ошибка при парсинге данных JSON:", parseError);
				throw new Error("Не удалось преобразовать JSON данные.");
			}
		});
	}

	async deleteAllProducts() {
		try {
			const deletedProducts = await ProductModel.deleteMany({});
			const { deletedCount } = deletedProducts;

			if (deletedCount === 0) {
				throw ApiError.NotFound("Ненайдено не одного товара для удаления из базы данных.");
			}

			console.log(`${deletedCount} товаров удалено успешно.`);
		} catch (err) {
			throw ApiError.InternalServerError("Не удалось удалить товары.");
		}
	}
}

module.exports = new ProductsService();
