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
}

model.exports = new ProductsController();