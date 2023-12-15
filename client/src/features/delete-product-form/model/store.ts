import { CHANGEDPRODUCTNAME } from "./actions";

import { FormState, FormActions } from "./types";

import { checkInputLength, checkInputPattern } from "./index";

export const initialFormState: FormState = {
	productNameInput: {
		value: "",
		validLength: null,
		validPattern: null,
	},
};

export const reducer = (state: FormState, action: FormActions) => {
	switch (action.type) {
		case CHANGEDPRODUCTNAME:
			return {
				...state,
				productNameInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 4),
					validPattern: checkInputPattern(action.value, /^[a-zа-яё\s]+$/iu),
				},
			};
		default:
			return state;
	}
};
