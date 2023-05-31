import type { AxiosPromise } from "axios";

import { apiInstance } from "./base";
import type { QuestionnaireItem } from "./model";

const BASE_URL = "/questionnaire";

export const postQuestionnaireItem = (
	item: QuestionnaireItem,
): AxiosPromise<QuestionnaireItem[]> => {
	return apiInstance.post(BASE_URL, item);
};
