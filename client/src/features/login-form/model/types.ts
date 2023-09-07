import { changingEmailAction, changingPasswordAction } from "./actions";

export type FormInput = {
	value: "" | string;
	validLength: null | boolean;
	validPattern: null | boolean;
};

export type FormPasswordInput = {
	value: "" | string;
	validLength: null | boolean;
};

export type FormState = {
	emailInput: FormInput;
	passwordInput: FormPasswordInput;
};

export type FormActions =
	| ReturnType<typeof changingEmailAction>
	| ReturnType<typeof changingPasswordAction>;

export type IsFormValidParameters = {
	emailValidLength: null | boolean;
	emailValidPattern: null | boolean;
	passwordValidLength: null | boolean;
};
