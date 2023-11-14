import type { AxiosPromise } from "axios";

import { apiInstance } from "./base";
import type { QuestionnaireItem } from "./model";

const BASE_URL = "api/questionnaire/send";

export const postQuestionnaireItem = (
	questionnaire: QuestionnaireItem,
): AxiosPromise<QuestionnaireItem[]> => {
	return apiInstance.post(BASE_URL, {
		name: questionnaire.name,
		surname: questionnaire.surname,
		email: questionnaire.email,
		age: questionnaire.age,
		lifeStyle: questionnaire.lifeStyle,
		skinType: questionnaire.skinType,
		location: questionnaire.location,
	});
};
