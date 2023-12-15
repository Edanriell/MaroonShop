import { CHANGEDNAME, CHANGEDSURNAME, CHANGEDADDRESS, CHANGEDEMAIL } from "./actions";

import { FormState, FormActions } from "./types";

import { checkInputLength, checkInputPattern } from "./index";

export const initialFormState: FormState = {
	nameInput: {
		value: "",
		validLength: null,
		validPattern: null,
	},
	surnameInput: {
		value: "",
		validLength: null,
		validPattern: null,
	},
	addressInput: {
		value: "",
		validLength: null,
	},
	emailInput: {
		value: "",
		validLength: null,
		validPattern: null,
	},
};

export const reducer = (state: FormState, action: FormActions) => {
	switch (action.type) {
		case CHANGEDNAME:
			return {
				...state,
				nameInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 2),
					validPattern: checkInputPattern(action.value, /^[a-zа-яё\s]+$/iu),
				},
			};
		case CHANGEDSURNAME:
			return {
				...state,
				surnameInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 2),
					validPattern: checkInputPattern(action.value, /^[a-zа-яё\s]+$/iu),
				},
			};
		case CHANGEDADDRESS:
			return {
				...state,
				addressInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 12),
				},
			};
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
		default:
			return state;
	}
};
