import { changingEmailAction, changingPasswordAction } from "./actions";

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
	emailInput: FormInput;
	passwordInput: FormInputSimplified;
};

export type FormActions =
	| ReturnType<typeof changingEmailAction>
	| ReturnType<typeof changingPasswordAction>;
