const { validationResult } = require("express-validator");

const questionnaireService = require("../service/questionnaire-service");

const ApiError = require("../exceptions/api-error");

class QuestionnaireController {
	async createQuestionnaireItem(req, res, next) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Ошибка при валидации.", errors.array()));
			}

			const { name, surname, email, age, lifeStyle, skinType, location } = req.body;

			const questionnaireFilled = await questionnaireService.createQuestionnaireItem({
				name,
				surname,
				email,
				age,
				lifeStyle,
				skinType,
				location,
			});

			return res.json(questionnaireFilled);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new QuestionnaireController();
