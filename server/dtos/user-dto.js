module.exports = class UserDto {
	name;
	surname;
	address;
	email;
	id;
	isActivated;
	recentlyWatchedProducts;

	constructor(model) {
		this.name = model.name;
		this.surname = model.surname;
		this.address = model.address;
		this.email = model.email;
		this.id = model._id;
		this.isActivated = model.isActivated;
		this.recentlyWatchedProducts = model.recentlyWatchedProducts;
	}
};
