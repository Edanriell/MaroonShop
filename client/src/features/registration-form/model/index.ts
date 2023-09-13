import { FormState, FormInput, FormInputSimplified } from "./types";

export const checkInputLength = (value: string, minLength: number): boolean =>
	value.length >= minLength;

export const checkInputPattern = (value: string, pattern: RegExp): boolean => pattern.test(value);

const isInputValid = (input: FormInput): boolean =>
	Boolean(input.validLength) && Boolean(input.validPattern);

const isInputLengthValid = (input: FormInputSimplified): boolean => Boolean(input.validLength);

export const isFormValid = (formState: FormState): boolean => {
	const { nameInput, surnameInput, addressInput, emailInput, passwordInput } = formState;

	return (
		isInputValid(nameInput) &&
		isInputValid(surnameInput) &&
		isInputLengthValid(addressInput) &&
		isInputValid(emailInput) &&
		isInputLengthValid(passwordInput)
	);
};
