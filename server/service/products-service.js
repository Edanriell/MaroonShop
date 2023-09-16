const ProductModel = require("../models/product-model");
const ProductDto = require("../dtos/product-dto");

class ProductsService {
	async getAllProducts() {}

	async createNewProduct({
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
	}) {
		const product = await ProductModel.findOne({ name });
		if (product) {
			throw ApiError.BadRequest(`Товар с именем ${name} уже существует.`);
		}

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
}

module.exports = new ProductsService();
