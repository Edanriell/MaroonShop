const QuestionnaireModel = require("../models/questionnaire-item-model");

const QuestionnaireItemDto = require("../dtos/questionnaire-item-dto");

class QuestionnaireService {
	async createQuestionnaireItem({ name, surname, email, age, lifeStyle, skinType, location }) {
		const newQuestionnaireItem = await QuestionnaireModel.create({
			name,
			surname,
			email,
			age,
			lifeStyle,
			skinType,
			location,
		});

		const questionnaireItemDto = new QuestionnaireItemDto(newQuestionnaireItem);

		return {
			questionnaireItem: questionnaireItemDto,
		};
	}
}

module.exports = new QuestionnaireService();
