import {
	CHANGEDNAME,
	CHANGEDSURNAME,
	CHANGEDEMAIL,
	CHANGEDAGE,
	SELECTEDLIFESTYLE,
	SELECTEDSKINTYPE,
	SELECTEDLOCATION,
} from "./actions";

import { FormState, FormActions } from "./types";

import { checkInputLength, checkInputPattern, checkInputRange, checkSelectOption } from "./index";

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
	emailInput: {
		value: "",
		validLength: null,
		validPattern: null,
	},
	ageInput: {
		value: "",
		validRange: null,
	},
	lifeStyleSelect: {
		value: "",
		validOption: null,
	},
	skinTypeSelect: {
		value: "",
		validOption: null,
	},
	locationSelect: {
		value: "",
		validOption: null,
	},
};

export const reducer = (state: FormState, action: FormActions) => {
	switch (action.type) {
		case CHANGEDNAME:
			return {
				...state,
				nameInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 3),
					validPattern: checkInputPattern(action.value, /^[a-zа-яё\s]+$/iu),
				},
			};
		case CHANGEDSURNAME:
			return {
				...state,
				surnameInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 3),
					validPattern: checkInputPattern(action.value, /^[a-zа-яё\s]+$/iu),
				},
			};
		case CHANGEDEMAIL:
			return {
				...state,
				emailInput: {
					value: action.value,
					validLength: checkInputLength(action.value, 8),
					validPattern: checkInputPattern(
						action.value,
						// eslint-disable-next-line max-len
						/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
					),
				},
			};
		case CHANGEDAGE:
			return {
				...state,
				ageInput: {
					value: action.value,
					validRange: checkInputRange(action.value, [4, 120]),
				},
			};
		case SELECTEDLIFESTYLE:
			return {
				...state,
				lifeStyleSelect: {
					value: action.value,
					validOption: checkSelectOption(action.value),
				},
			};
		case SELECTEDSKINTYPE:
			return {
				...state,
				skinTypeSelect: {
					value: action.value,
					validOption: checkSelectOption(action.value),
				},
			};
		case SELECTEDLOCATION:
			return {
				...state,
				locationSelect: {
					value: action.value,
					validOption: checkSelectOption(action.value),
				},
			};
		default:
			return state;
	}
};
