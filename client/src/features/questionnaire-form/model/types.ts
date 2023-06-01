import {
	changingNameAction,
	changingSurnameAction,
	changingEmailAction,
	changingAgeAction,
	selectingLifestyleAction,
	selectingSkintypeAction,
	selectingLocationAction,
} from "./actions";

export type FormState = {
	nameInput: {
		value: "" | string;
		validLength: null | boolean;
		validPattern: null | boolean;
	};
	surnameInput: {
		value: "" | string;
		validLength: null | boolean;
		validPattern: null | boolean;
	};
	emailInput: {
		value: "" | string;
		validLength: null | boolean;
		validPattern: null | boolean;
	};
	ageInput: {
		value: "" | string;
		validRange: null | boolean;
	};
	lifeStyleSelect: {
		value: "" | string;
		validOption: null | boolean;
	};
	skinTypeSelect: {
		value: "" | string;
		validOption: null | boolean;
	};
	locationSelect: {
		value: "" | string;
		validOption: null | boolean;
	};
};

export type FormActions =
	| ReturnType<typeof changingNameAction>
	| ReturnType<typeof changingSurnameAction>
	| ReturnType<typeof changingEmailAction>
	| ReturnType<typeof changingAgeAction>
	| ReturnType<typeof selectingLifestyleAction>
	| ReturnType<typeof selectingSkintypeAction>
	| ReturnType<typeof selectingLocationAction>;

export type IsFormValidParameters = {
	nameValidLength: null | boolean;
	nameValidPattern: null | boolean;
	surnameValidLength: null | boolean;
	surnameValidPattern: null | boolean;
	emailValidLength: null | boolean;
	emailValidPattern: null | boolean;
	ageValidRange: null | boolean;
	lifeStyleValidOption: null | boolean;
	skinTypeValidOption: null | boolean;
	locationValidOption: null | boolean;
};
