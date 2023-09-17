module.exports = class ProductDto {
	id;
	name;
	description;
	components;
	usage;
	category;
	image;
	price;
	quantity;
	views;
	sells;

	constructor(model) {
		this.id = model._id;
		this.name = model.name;
		this.description = model.description;
		this.components = model.components;
		this.usage = model.usage;
		this.category = model.category;
		this.image = model.image;
		this.price = model.price;
		this.quantity = model.quantity;
		this.views = model.views;
		this.sells = model.sells;
	}
};
