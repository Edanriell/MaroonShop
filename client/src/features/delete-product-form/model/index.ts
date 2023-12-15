import { FormState, FormInput } from "./types";

export const checkInputLength = (value: string, minLength: number): boolean =>
	value.length >= minLength;

export const checkInputPattern = (value: string, pattern: RegExp): boolean => pattern.test(value);

const isInputValid = (input: FormInput): boolean =>
	Boolean(input.validLength) && Boolean(input.validPattern);

export const isFormValid = (formState: FormState): boolean => {
	const { productNameInput } = formState;

	return isInputValid(productNameInput);
};
