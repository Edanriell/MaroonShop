import { CHANGEDEMAIL, CHANGEDPASSWORD } from "./actions";

import { FormState, FormActions } from "./types";

import { checkInputLength, checkInputPattern } from "./index";

export const initialFormState: FormState = {
	emailInput: {
		value: "",
		validLength: null,
		validPattern: null,
	},
	passwordInput: {
		value: "",
		validLength: null,
	},
};

export const reducer = (state: FormState, action: FormActions) => {
	switch (action.type) {
		case CHANGEDEMAIL:
			return {
				...state,
				emailInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 6),
					validPattern: checkInputPattern(
						action.value,
						// eslint-disable-next-line max-len
						/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
					),
				},
			};
		case CHANGEDPASSWORD:
			return {
				...state,
				passwordInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 3),
				},
			};
		default:
			return state;
	}
};
