import {
	changingNameAction,
	changingSurnameAction,
	changingEmailAction,
	changingAgeAction,
	selectingLifestyleAction,
	selectingSkintypeAction,
	selectingLocationAction,
} from "./actions";

export type FormInput = {
	value: "" | string;
	validLength: null | boolean;
	validPattern: null | boolean;
};

export type FormAgeInput = {
	value: "" | string;
	validRange: null | boolean;
};

export type FormSelect = {
	value: "" | string;
	validOption: null | boolean;
};

export type FormState = {
	nameInput: FormInput;
	surnameInput: FormInput;
	emailInput: FormInput;
	ageInput: FormAgeInput;
	lifeStyleSelect: FormSelect;
	skinTypeSelect: FormSelect;
	locationSelect: FormSelect;
};

export type FormActions =
	| ReturnType<typeof changingNameAction>
	| ReturnType<typeof changingSurnameAction>
	| ReturnType<typeof changingEmailAction>
	| ReturnType<typeof changingAgeAction>
	| ReturnType<typeof selectingLifestyleAction>
	| ReturnType<typeof selectingSkintypeAction>
	| ReturnType<typeof selectingLocationAction>;
