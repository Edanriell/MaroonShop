import { changingProductNameAction } from "./actions";

export type FormInput = {
	value: "" | string;
	validLength: null | boolean;
	validPattern: null | boolean;
};

export type FormState = {
	productNameInput: FormInput;
};

export type FormActions = ReturnType<typeof changingProductNameAction>;
