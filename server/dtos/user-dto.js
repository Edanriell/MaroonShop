module.exports = class UserDto {
	role;
	name;
	surname;
	address;
	email;
	id;
	isActivated;
	recentlyWatchedProducts;

	constructor(model) {
		this.role = model.role;
		this.name = model.name;
		this.surname = model.surname;
		this.address = model.address;
		this.email = model.email;
		this.id = model._id;
		this.isActivated = model.isActivated;
		this.recentlyWatchedProducts = model.recentlyWatchedProducts;
	}
};
