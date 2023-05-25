import { useReducer } from "react";
import { FormState } from "./types";

const initialFormState: FormState = {
	nameInput: {
		value: null,
		validLength: false,
		validPattern: false,
	},
	surnameInput: {
		value: null,
		validLength: false,
		validPattern: false,
	},
	emailInput: {
		value: null,
		validLength: false,
		validPattern: false,
	},
	ageInput: {
		value: null,
		validRange: false,
	},
	lifeStyleSelect: {
		value: null,
		validOption: false,
	},
	skinTypeSelect: {
		value: null,
		validOption: false,
	},
	locationSelect: {
		value: null,
		validOption: false,
	},
};

export const reducer = (state: FormState, action) => {
	switch (action.type) {
		case "CHANGED_NAME":
			break;
		case "CHANGED_SURNAME":
			break;
		case "CHANGED_EMAIL":
			break;
		case "CHANGED_AGE":
			break;
		case "SELECTED_LIFESTYLE":
			break;
		case "SELECTED_SKINTYPE":
			break;
		case "SELECTED_LOCATION":
			break;
		default:
			return state;
	}
};
