import {
	changingNameAction,
	changingSurnameAction,
	changingAddressAction,
	changingEmailAction,
	changingPasswordAction,
} from "./actions";

export type FormInput = {
	value: "" | string;
	validLength: null | boolean;
	validPattern: null | boolean;
};

export type FormInputSimplified = {
	value: "" | string;
	validLength: null | boolean;
};

export type FormState = {
	nameInput: FormInput;
	surnameInput: FormInput;
	addressInput: FormInputSimplified;
	emailInput: FormInput;
	passwordInput: FormInputSimplified;
};

export type FormActions =
	| ReturnType<typeof changingNameAction>
	| ReturnType<typeof changingSurnameAction>
	| ReturnType<typeof changingAddressAction>
	| ReturnType<typeof changingEmailAction>
	| ReturnType<typeof changingPasswordAction>;
