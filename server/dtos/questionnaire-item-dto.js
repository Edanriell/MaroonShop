module.exports = class QuestionnaireItemDto {
	name;
	surname;
	email;
	age;
	lifeStyle;
	skinType;
	location;

	constructor(model) {
		this.name = model.name;
		this.surname = model.surname;
		this.email = model.email;
		this.age = model.age;
		this.lifeStyle = model.lifeStyle;
		this.skinType = model.skinType;
		this.location = model.location;
	}
};
