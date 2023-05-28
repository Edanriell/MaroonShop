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
		validLength: boolean;
		validPattern: boolean;
	};
	surnameInput: {
		value: "" | string;
		validLength: boolean;
		validPattern: boolean;
	};
	emailInput: {
		value: "" | string;
		validLength: boolean;
		validPattern: boolean;
	};
	ageInput: {
		value: "" | string;
		validRange: boolean;
	};
	lifeStyleSelect: {
		value: "" | string;
		validOption: boolean;
	};
	skinTypeSelect: {
		value: "" | string;
		validOption: boolean;
	};
	locationSelect: {
		value: "" | string;
		validOption: boolean;
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
