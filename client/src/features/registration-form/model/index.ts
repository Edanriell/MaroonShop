import { FormState, FormInput, FormPasswordInput } from "./types";

export const checkInputLength = (value: string, minLength: number): boolean =>
	value.length >= minLength;

export const checkInputPattern = (value: string, pattern: RegExp): boolean => pattern.test(value);

const isInputValid = (input: FormInput): boolean =>
	Boolean(input.validLength) && Boolean(input.validPattern);

const isPasswordInputValid = (input: FormPasswordInput): boolean => Boolean(input.validLength);

export const isFormValid = (formState: FormState): boolean => {
	const { emailInput, passwordInput } = formState;

	return isInputValid(emailInput) && isPasswordInputValid(passwordInput);
};
